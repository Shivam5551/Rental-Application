import { Account, NextAuthOptions, Profile, SessionStrategy, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import prisma from "./prismaClient";
import { compareSync } from "bcrypt-ts";
import { googleAuthToken } from "./googleAuthToken";
import { validateStoredToken } from "./validateStoredToken";
import { generateAccessToken, generateRefreshToken, hashToken } from "./tokenUtils";
import { withRefreshLock } from "./refreshLock";
import { JWT } from "next-auth/jwt";
import { AdapterUser } from "next-auth/adapters";

const REFRESH_TOKEN_TTL_MS = 30 * 24 * 60 * 60 * 1000; // 30 days
const ACCESS_TOKEN_TTL_MS = 15 * 60 * 1000; // 15 min

async function upsertToken(userId: string, refreshToken: string) {
    const refreshTokenHash = hashToken(refreshToken);
    await prisma.token.upsert({
        where: { userId },
        create: {
            userId,
            refreshTokenHash,
            expiresAt: new Date(Date.now() + REFRESH_TOKEN_TTL_MS),
        },
        update: {
            refreshTokenHash,
            expiresAt: new Date(Date.now() + REFRESH_TOKEN_TTL_MS),
        },
    });
}

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Email & Password",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "you@example.com" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials.password) return null;

                try {
                    const user = await prisma.user.findUnique({
                        where: { email: credentials.email },
                        select: { id: true, name: true, email: true, image: true, password: true },
                    });
                    if (!user?.password) return null;
                    if (!compareSync(credentials.password, user.password)) return null;

                    return {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        image: user.image,
                    };
                } catch (err) {
                    console.error("CredentialsAuthorizeError", err);
                    return null;
                }
            },
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code",
                },
            },
        }),
    ],

    session: { strategy: "jwt" as SessionStrategy, maxAge: 24 * 60 * 60 },
    jwt: { secret: process.env.NEXTAUTH_SECRET! },

    pages: {
        signIn: "/signin",
        error: "/signin",
    },

    callbacks: {
        async session({ session, token }) {
            session.user = {
                id: token.user.id,
                name: token.user.name,
                email: token.user.email,
                image: token.user.image,
            };
            session.accessToken = token.accessToken;
            session.error = token.error;

            // Extra transparency for the client, driven off your existing type fields
            session.tokenExpired = Date.now() > (token.accessTokenExpires ?? 0);
            session.tokenValid = !token.error;

            return session;
        },

        async jwt({
            token,
            user,
            account,
        }: {
            token: JWT;
            user: User | AdapterUser;
            account: Account | null;
        }): Promise<JWT> {
            // ---------- INITIAL SIGN IN ----------
            if (user && account) {
                const provider = account.provider.toLowerCase();
                let refreshToken: string;
                let accessToken: string;

                if (provider === "google") {
                    refreshToken = account.refresh_token!;
                    accessToken = account.access_token!;
                } else {
                    refreshToken = generateRefreshToken();
                    accessToken = generateAccessToken(user.id);
                }

                try {
                    await upsertToken(user.id, refreshToken);
                } catch (e) {
                    console.error("TokenUpsertError", e);
                    throw new Error("Failed to save refresh token");
                }

                return {
                    user: {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        image: user.image,
                    },
                    provider,
                    accessToken,
                    refreshToken,
                    accessTokenExpires: Date.now() + ACCESS_TOKEN_TTL_MS,
                };
            }

            // ---------- SUBSEQUENT REQUESTS ----------
            const isExpired = Date.now() > (token.accessTokenExpires ?? 0);
            if (!isExpired) return token;

            return withRefreshLock(token.user.id, async () => {
                if (token.provider === "google") {
                    const refreshed = await googleAuthToken(token);

                    if (!refreshed || refreshed.error) {
                        console.error("GoogleRefreshError", refreshed?.error);
                        return { ...token, error: "RefreshError" };
                    }

                    try {
                        await upsertToken(token.user.id, refreshed.refreshToken);
                    } catch (e) {
                        console.error("TokenRenewUpsertError", e);
                        return { ...token, error: "RefreshError" };
                    }

                    return {
                        ...token,
                        accessToken: refreshed.accessToken,
                        refreshToken: refreshed.refreshToken,
                        accessTokenExpires: refreshed.accessTokenExpires,
                        error: undefined,
                    };
                } else {
                    const { valid } = await validateStoredToken(
                        token.user.id,
                        token.refreshToken as string
                    );

                    if (!valid) {
                        console.warn("CredentialsRefreshInvalid");
                        return { ...token, error: "RefreshError" };
                    }

                    const newAccessToken = generateAccessToken(token.user.id);
                    const newRefreshToken = generateRefreshToken();

                    try {
                        await upsertToken(token.user.id, newRefreshToken);
                    } catch (e) {
                        console.error("CredentialsTokenRotateError", e);
                        return { ...token, error: "RefreshError" };
                    }

                    return {
                        ...token,
                        accessToken: newAccessToken,
                        refreshToken: newRefreshToken,
                        accessTokenExpires: Date.now() + ACCESS_TOKEN_TTL_MS,
                        error: undefined,
                    };
                }
            });
        },

        async signIn({ account, profile, user }) {
            if (account?.provider === "credentials") {
                const found = await prisma.user.findUnique({ where: { email: user.email! } });
                return !!found;
            }

            if (account?.provider === "google" && profile?.email) {
                const existing = await prisma.user.findUnique({ where: { email: profile.email! } });
                if (!existing) {
                    const created = await prisma.user.create({
                        data: {
                            email: profile.email!,
                            name: profile.name!,
                            image: (profile as any)?.image,
                            provider: "Google",
                        },
                    });
                    user.id = created.id;
                } else {
                    user.id = existing.id;
                }
                return true;
            }

            return false;
        },
    },
};
