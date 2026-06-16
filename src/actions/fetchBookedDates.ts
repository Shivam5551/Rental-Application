'use server';
import prisma from "@/utils/prismaClient";

export async function fetchBookedDates(propertyId: string) {
    try {
        const bookedDates = await prisma?.booking.findMany({
            where: {
                propertyId,
                endDate: {
                    gte: new Date()
                }
            },
            select: {
                startDate: true,
                endDate: true
            },
        });
        return bookedDates;
    } catch (error) {
        console.log("Error while fetching booked dates:", error);
        return [];
    }
}