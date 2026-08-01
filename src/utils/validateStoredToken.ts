// validateStoredToken.ts
import prisma from "@/utils/prismaClient";
import { compareToken } from "@/utils/tokenUtils";

export const isTokenExpired = (expiresAt: Date) => new Date() > expiresAt;

export const validateStoredToken = async (userId: string, refreshToken: string) => {
    const tokenRecord = await prisma.token.findUnique({
        where: { userId },
        select: { refreshTokenHash: true, expiresAt: true },
    });

    if (!tokenRecord) return { valid: false, expired: true };
    if (isTokenExpired(tokenRecord.expiresAt)) return { valid: false, expired: true };

    const valid = compareToken(refreshToken, tokenRecord.refreshTokenHash);
    return { valid, expired: false };
};
