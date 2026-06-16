import prisma from '@/utils/prismaClient';

export const isTokenExpired = (expiresAt: Date) => {
    return (new Date() > expiresAt)
}
export const validateStoredToken = async (userID: string, refreshToken: string) => {
    const tokenRecord = await prisma?.token.findFirst({
        where: {
            id: userID
        },
        select: {
            refreshToken: true,
            expiresAt: true,
            id: true
        }
    });
    if(!tokenRecord) {
        return { valid: false, expired: true }
    }
    else if(isTokenExpired(tokenRecord.expiresAt)) {
        return { valid: false, expired: true }
    }
    return { valid: tokenRecord.refreshToken === refreshToken, expired: false };
}