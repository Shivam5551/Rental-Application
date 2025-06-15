'use server'

import { authOptions } from "@/utils/authOptions"
import { getServerSession } from "next-auth"
import prisma from '@/utils/prismaClient';
import { IBookedProperties } from "@/utils/interfaces";

export const getBookedProperties = async (): Promise<IBookedProperties[]> => {
    try {
        const session = await getServerSession(authOptions);
        
        if (!session || !session.user?.id) {
            return [];
        }

        const bookings = await prisma.booking.findMany({
            where: {
                userId: session.user.id
            },
            include: {
                property: {
                    include: {
                        user: {
                            select: {
                                id: true,
                                name: true,
                                image: true
                            }
                        }
                    }
                },
                payment: {
                    select: {
                        status: true
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        return bookings.map((booking) => ({
            id: booking.id,
            createdAt: booking.createdAt,
            userId: booking.userId,
            startDate: booking.startDate,
            endDate: booking.endDate,
            totalPrice: booking.totalPrice,
            propertyId: booking.propertyId,
            property: {
                id: booking.property.id,
                title: booking.property.title,
                location: booking.property.location,
                showcaseimage: booking.property.showcaseimage,
                price: booking.property.price,
                discount: Math.floor(booking.property.discount/100),
                beds: booking.property.beds,
                baths: booking.property.baths,
                area: booking.property.area,
                user: booking.property.user
            },
            payment: {
                status: booking.payment[0]?.status
            }
        }));
    } catch (error) {
        console.error('Error fetching booked properties:', error);
        return [];
    }
}