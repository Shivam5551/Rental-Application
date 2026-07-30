import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";
import prisma from "@/utils/prismaClient";

export interface DashboardStats {
    unverifiedProperties: number;
    enquiryMessages: number;
    bookedProperties: number;
    totalRevenue: number;
    pendingPayments: number;
}

export async function getDashboardStats(): Promise<DashboardStats | null> {
    try {
        const session = await getServerSession(authOptions);

        if (!session || !session.user.id) {
            return null;
        }

        const userId = session.user.id;

        const [
            unverifiedProperties,
            enquiryMessages,
            bookedProperties,
            totalRevenue,
            pendingPayments,
        ] = await Promise.all([
            prisma.property.count({
                where: {
                    userId: userId,
                    verified: false,
                },
            }),

            prisma.inquiry.count({
                where: {
                    property: {
                        userId: userId,
                    },
                },
            }),

            prisma.booking.count({
                where: {
                    property: {
                        userId: userId,
                    },
                },
            }),

            prisma.payment.aggregate({
                where: {
                    booking: {
                        property: {
                            userId: userId,
                        },
                    },
                    status: "COMPLETED",
                },
                _sum: {
                    amount: true,
                },
            }),

            prisma.payment.count({
                where: {
                    booking: {
                        property: {
                            userId: userId,
                        },
                    },
                    status: "PENDING",
                },
            }),
        ]);

        return {
            unverifiedProperties,
            enquiryMessages,
            bookedProperties,
            totalRevenue: totalRevenue._sum.amount || 0,
            pendingPayments,
        };
    } catch (error) {
        console.error("Error fetching dashboard stats:", error);
        return null;
    }
}

export async function getPropertyOwnerStats(): Promise<{
    totalProperties: number;
    verifiedProperties: number;
} | null> {
    try {
        const session = await getServerSession(authOptions);

        if (!session || !session.user.id) {
            return null;
        }

        const userId = session.user.id;

        const [totalProperties, verifiedProperties] = await Promise.all([
            prisma.property.count({
                where: {
                    userId: userId,
                },
            }),

            prisma.property.count({
                where: {
                    userId: userId,
                    verified: true,
                },
            }),
        ]);

        return {
            totalProperties,
            verifiedProperties,
        };
    } catch (error) {
        console.error("Error fetching property owner stats:", error);
        return null;
    }
}
