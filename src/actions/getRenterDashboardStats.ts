'use server'

import { authOptions } from "@/utils/authOptions"
import { getServerSession } from "next-auth"
import prisma from '@/utils/prismaClient';

export interface IRenterDashboardStats {
    totalBookings: number;
    activeBookings: number;
    completedBookings: number;
    totalSpent: number;
    pendingPayments: number;
    reviewsGiven: number;
}

export const getRenterDashboardStats = async (): Promise<IRenterDashboardStats | null> => {
    try {
        const session = await getServerSession(authOptions);
        
        if (!session || !session.user?.id) {
            return null;
        }

        const userId = session.user.id;

        const bookings = await prisma.booking.findMany({
            where: {
                userId: userId
            },
            include: {
                payment: {
                    select: {
                        status: true
                    }
                }
            }
        });

        const currentDate = new Date();
        const activeBookings = bookings.filter(booking => 
            booking.startDate <= currentDate && booking.endDate >= currentDate
        ).length;

        const completedBookings = bookings.filter(booking => 
            booking.endDate < currentDate
        ).length;

        const totalSpent = bookings.reduce((total, booking) => {
            const hasCompletedPayment = booking.payment.some(payment => 
                payment.status === 'COMPLETED'
            );
            return hasCompletedPayment ? total + booking.totalPrice : total;
        }, 0);

        const pendingPayments = bookings.filter(booking => 
            booking.payment.some(payment => payment.status === 'PENDING')
        ).length;

        
        const reviewsGiven = await prisma.review.count({
            where: {
                userId: userId
            }
        });

        return {
            totalBookings: bookings.length,
            activeBookings,
            completedBookings,
            totalSpent,
            pendingPayments,
            reviewsGiven
        };

    } catch (error) {
        console.error('Error fetching renter dashboard stats:', error);
        return null;
    }
}

export const getRenterWelcomeCardData = async () => {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user?.id) {
        return null;
    }

    const user = await prisma.user.findUnique({
        where: {
            id: session.user.id
        },
        select: {
            name: true
        }
    });

    const stats = await getRenterDashboardStats();
    
    if (!user || !stats) {
        return null;
    }

    return {
        username: user.name,
        totalBookings: stats.totalBookings,
        activeBookings: stats.activeBookings,
        completedBookings: stats.completedBookings,
        totalSpent: stats.totalSpent,
        pendingPayments: stats.pendingPayments
    };
}
