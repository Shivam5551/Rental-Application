import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials"
import Google from "next-auth/providers/google";
import prisma from "./prismaClient";
import { compareSync } from "bcrypt-ts";

const isTokenExpired = (expiresAt: Date) => {
    return new Date() > expiresAt;
};

const validateStoredToken = async (userId: string) => {
    const tokenRecord = await prisma.token.findFirst({
        where: { userId },
        select: {
            refreshToken: true,
            expiresAt: true,
            id: true
        }
    });

    if (!tokenRecord) {
        return { valid: false, expired: true };
    }

    const expired = isTokenExpired(tokenRecord.expiresAt);
    return {
        valid: !expired,
        expired,
        token: tokenRecord
    };
};


const refreshAccessToken = async (token: JWT) => {
    try {
        const url = `https://oauth2.googleapis.com/token?` +
            new URLSearchParams({
                client_id: process.env.GOOGLE_CLIENT_ID || '',
                client_secret: process.env.GOOGLE_CLIENT_SECRET || '',
                grant_type: "refresh_token",
                refresh_token: token.refreshToken ? String(token.refreshToken) : '',
            }).toString();

        const response = await fetch(url, {
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            method: "POST",
        });

        const refreshedTokens = await response.json();

        if (!response.ok) {
            throw refreshedTokens;
        }

        return {
            ...token,
            accessToken: refreshedTokens.access_token,
            accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
            refreshToken: refreshedTokens.refresh_token ?? token.refreshToken,
        };
    } catch (error) {
        console.log(error);
        return {
            ...token,
            error: "RefreshAccessTokenError",
        };
    }
};


export const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "Email", placeholder: "Enter your email" },
                password: { label: "Password", type: "password", placeholder: "Enter your password" }
            },
            async authorize(credentials) {
                try {
                    if (credentials?.email && credentials.password) {
                        // console.log("Attempting login for:", credentials.email);

                        const user = await prisma.user.findFirst({
                            where: {
                                email: credentials.email
                            },
                            select: {
                                token: {
                                    select: { refreshToken: true },
                                },
                                password: true,
                                image: true,
                                email: true,
                                id: true,
                                name: true
                            }
                        });

                        if (!user) {
                            // console.log("User not found");
                            return null;
                        }

                        // console.log("User found:", user.email);

                        // Check if password exists
                        if (!user.password) {
                            // console.log("User has no password");
                            return null;
                        }

                        // Compare passwords with detailed logging
                        const passwordMatch = compareSync(credentials.password, user.password);
                        // console.log("Password match:", passwordMatch);

                        if (!passwordMatch) {
                            return null;
                        }

                        // Create refresh token with fallback
                        const refreshToken = user.token?.[0]?.refreshToken ||
                            `${Date.now() + 1000 * 60 * 60 * 24 * 30}`;

                        // console.log("Auth successful, returning user");

                        return {
                            id: user.id,
                            name: user.name || "",
                            email: user.email,
                            image: user.image || undefined,
                            refreshToken: refreshToken,
                        };
                    }
                    return null;
                } catch (error) {
                    console.error("Auth error:", error);
                    return null;
                }
            },
        }),
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code"
                }
            }
        })
    ],
    secret: process.env.NEXTAUTH_SECRET || 'secret',

    callbacks: {
        session: async ({ session, token }: any) => {
            if (token) {
                if (token.error) {
                    // console.log("Token error detected:", token.error);
                    session.error = token.error;
                }

                session.user = token.user;
                session.accessToken = token.accessToken;

                if (token.uid) {
                    const tokenValidation = await validateStoredToken(token.uid);
                    session.tokenValid = tokenValidation.valid;
                    session.tokenExpired = tokenValidation.expired;
                }
            }
            return session;
        },
        jwt: async ({ user, token, account }: any) => {
            async function createOrUpdateToken(userId: string, refreshToken: string, accessToken?: string) {
                const expiresTime = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30); // 30 days

                const existingToken = await prisma.token.findFirst({
                    where: { userId: userId }
                });

                if (existingToken) {
                    const tokenValidation = await validateStoredToken(userId);

                    if (tokenValidation.expired) {
                        console.log("Existing token expired, updating.....");
                        await prisma.token.update({
                            where: { id: existingToken.id },
                            data: {
                                refreshToken: refreshToken,
                                expiresAt: expiresTime,
                            }
                        });
                    }

                    // console.log("Token updated successfully");
                } else {
                    await prisma.token.create({
                        data: {
                            userId: userId,
                            refreshToken: refreshToken,
                            expiresAt: expiresTime
                        }
                    });
                    // console.log("New token created successfully");
                }

                return {
                    ...token,
                    accessToken: accessToken || "credentials-access-token",
                    accessTokenExpires: account?.expires_in ? Date.now() + account.expires_in * 1000 : Date.now() + 1000 * 60 * 60,
                    refreshToken: refreshToken,
                    user,
                    uid: userId
                };
            }

            if (account && user) {
                if (account?.provider === "credentials" && user) {
                    // console.log("Credentials login - creating/updating token");

                    const tokenValidation = await validateStoredToken(user.id);
                    if (tokenValidation.valid && !tokenValidation.expired) {
                        console.log("Valid token exists");
                        return {
                            ...token,
                            accessToken: "credentials-access-token",
                            accessTokenExpires: Date.now() + 1000 * 60 * 60,
                            refreshToken: tokenValidation.token?.refreshToken,
                            user,
                            uid: user.id
                        };
                    }

                    const result = await createOrUpdateToken(user.id, user.refreshToken);
                    return result;
                }

                if (account?.provider === "google" && user) {

                    const tokenValidation = await validateStoredToken(user.id);
                    if (tokenValidation.valid && !tokenValidation.expired && account.access_token) {
                        return {
                            ...token,
                            accessToken: account.access_token,
                            accessTokenExpires: Date.now() + (account.expires_in || 3600) * 1000,
                            refreshToken: tokenValidation.token?.refreshToken,
                            user,
                            uid: user.id
                        };
                    }

                    const refreshToken = account.refresh_token || `google_${Date.now()}_${user.id}`;
                    const result = await createOrUpdateToken(user.id, refreshToken, account.access_token);
                    return result;
                }
            }

            // Check if current token is expired and needs refresh
            if (token.accessTokenExpires && Date.now() >= token.accessTokenExpires) {
                // console.log("Access token expired, attempting refresh");

                // Validate stored token before refresh
                if (token.uid) {
                    const tokenValidation = await validateStoredToken(token.uid);
                    if (tokenValidation.expired) {
                        // console.log("Stored refresh token also expired, user needs to re-authenticate");
                        return { ...token, error: "RefreshAccessTokenError" };
                    }
                }

                return refreshAccessToken(token);
            }

            // Return current token if still valid
            return token;
        },
        signIn: async ({ account, profile, user }: any) => {
            async function findUserByEmail(email: string) {
                const isExists = await prisma.user.findFirst({
                    where: { email: email },
                    select: {
                        id: true,
                        email: true,
                        name: true,
                        provider: true,
                    }
                });
                return isExists;
            }

            if (account.provider === "credentials") {
                const isExists = await findUserByEmail(user.email);
                return isExists ? true : false;
            }

            if (account.provider === "google" && profile?.email_verified) {
                // console.log(`Provider: ${account.provider}`);

                const existingUser = await findUserByEmail(profile.email);

                if (!existingUser) {
                    console.log("Creating new Google user");
                    try {
                        const newUser = await prisma.user.create({
                            data: {
                                id: profile.id,
                                email: profile.email,
                                name: profile.name || "",
                                provider: "Google",
                                image: profile.picture || null,
                            },
                            select: {
                                id: true,
                                email: true,
                                name: true,
                            }
                        });
                        console.log("User created successfully:", newUser.email);
                        user.id = newUser.id;
                        return true;
                    } catch (error) {
                        console.error("Error creating user:", error);
                        return false;
                    }
                } else {
                    user.id = existingUser.id;
                    console.log("Google user already exists:", existingUser.email);
                    return true;
                }
            }

            return false;
        }
    },
    pages: {
        signIn: '/signin'
    }
}

