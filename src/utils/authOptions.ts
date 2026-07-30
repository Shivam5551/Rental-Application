import { Account, NextAuthOptions, Profile, SessionStrategy, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import prisma from "./prismaClient";
import { compareSync } from "bcrypt-ts";
import { googleAuthToken } from "./googleAuthToken";
import { validateStoredToken } from "./validateStoredToken";
import { JWT } from "next-auth/jwt";
import { AdapterUser } from "next-auth/adapters";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Email & Password",
            credentials: {
                email: {
                    label: "Email",
                    type: "email",
                    placeholder: "you@example.com",
                },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials.password) return null;

                try {
                    const user = await prisma.user.findUnique({
                        where: { email: credentials.email },
                        select: {
                            id: true,
                            name: true,
                            email: true,
                            image: true,
                            password: true,
                        },
                    });
                    if (!user?.password) return null;

                    if (!compareSync(credentials.password, user.password)) return null;

                    return {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        image: user.image,
                        refreshToken: "Token",
                    };
                } catch (err) {
                    console.error("CredentialsAuthorizeErrortoLowercase", err);
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
                    access_type: "offline", // ensures refresh_token
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
                id: token.user.id as string,
                name: token.user.name as string,
                email: token.user.email as string,
                image: token.user.image as string,
            };
            session.accessToken = token.accessToken as string;
            console.log("Session: ", session, "\nToken", token);

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
            profile?: Profile | undefined;
            trigger?: "signIn" | "signUp" | "update" | undefined;
            isNewUser?: boolean | undefined;
            session?: any;
        }): Promise<JWT> {
            if (user && account) {
                const provider = account.provider.toLowerCase();
                const now = Date.now();
                let refresh_token = null;
                let access_token = null;
                if (account.provider === "google") {
                    refresh_token = account.refresh_token;
                    access_token = account.access_token;
                } else if (account.provider === "credentials") {
                    refresh_token = user.refreshToken;
                    access_token = "hello"; // generate an access token
                }
                try {
                    console.log("Token", token);
                    console.log("Account", account);
                    console.log("User", user);

                    await prisma.token.upsert({
                        where: { userId: user.id },
                        create: {
                            userId: user.id,
                            refreshToken: refresh_token!,
                            expiresAt: new Date(now + 30 * 24 * 60 * 60 * 1000),
                        },
                        update: {
                            refreshToken: refresh_token!,
                            expiresAt: new Date(now + 30 * 24 * 60 * 60 * 1000),
                        },
                    });
                } catch (e) {
                    console.error("TokenUpsertError", e);
                    throw new Error("Failed to save refresh token");
                }

                return {
                    user: {
                        id: user.id,
                        name: user.name!,
                        email: user.email!,
                        image: user.image!,
                    },
                    provider,
                    accessToken: access_token!,
                    refreshToken: refresh_token!,
                    expiresAt: now + 15 * 60 * 1000,
                };
            }

            const isExpired = Date.now() > (token.expiresAt as number);
            if (isExpired) {
                if (token.provider === "google") {
                    const refreshed = await googleAuthToken(token, account);
                    if (refreshed && refreshed.error) {
                        console.error("GoogleRefreshError", refreshed.error);
                        return { ...token, error: "RefreshError" };
                    }
                    try {
                        console.log("Token:", token);
                        await prisma.token.upsert({
                            where: { userId: token.user.id as string },
                            create: {
                                userId: token.user.id as string,
                                refreshToken: refreshed?.refreshToken as string,
                                expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
                            },
                            update: {
                                refreshToken: refreshed?.refreshToken as string,
                                expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
                            },
                        });
                    } catch (e) {
                        console.error("TokenRenewUpsertError", e);
                    }
                    return {
                        ...token,
                        accessToken: refreshed?.accessToken as string,
                        refreshToken: refreshed?.refreshToken as string,
                        expiresAt: refreshed?.accessTokenExpires as number,
                    };
                } else {
                    const { valid } = await validateStoredToken(
                        token.uid as string,
                        token.refreshToken as string
                    );
                    if (!valid) {
                        console.warn("CredentialsRefreshInvalid");
                        return { ...token, error: "RefreshError" };
                    }
                    // generate new refresh and access token
                }
            }
            return token;
        },

        async signIn({ account, profile, user }) {
            if (account?.provider === "credentials") {
                const found = await prisma.user.findUnique({
                    where: { email: user.email! },
                });
                return !!found;
            }

            if (account?.provider === "google" && profile?.email) {
                const existing = await prisma.user.findUnique({
                    where: { email: profile.email! },
                });
                if (!existing) {
                    const created = await prisma.user.create({
                        data: {
                            email: profile.email!,
                            name: profile.name!,
                            image: profile?.image,
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
