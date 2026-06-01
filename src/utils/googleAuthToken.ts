import { JWT } from "next-auth/jwt";

export const googleAuthToken = async (token: JWT, account: any) => {

    const provider = account?.provider || token.provider;

    if (provider.toLowerCase() === "google") {
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
    } else {
        return null;
    }
};
