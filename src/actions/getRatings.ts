import prisma from "@/utils/prismaClient";

export const getRatings = async (propertyId: string) => {
    const rating = await prisma?.review.aggregate({
        where: {
            propertyId: propertyId
        },
        _avg: {
            rating: true
        }
    });
    return rating._avg;
}