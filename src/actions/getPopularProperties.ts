'use server';
import { authOptions } from "@/utils/authOptions";
import prisma from "@/utils/prismaClient";
import { getServerSession } from "next-auth";
import { Property } from "./getProperties";


export const getPopularProperties= async (): Promise<Property[]>  => {
    const session = await getServerSession(authOptions);
    if (!session) {
        return [];
    }
    const propretyId = await prisma.booking.groupBy({
        by: ['propertyId'],
        _count: {
            propertyId: true
        },
        orderBy: {
            _count: {
                propertyId: "desc"
            }
        },
        take: 10
    });
    const pIds = propretyId.map((p) => p.propertyId);

    const properties = await prisma.property.findMany({
        where: {
            id: {
                in: pIds
            }
        },
        select: {
            id: true,
            title: true,
            description: true,
            price: true,
            discount: true,
            location: true,
            verified: true,
            booked: true,
            petfriendly: true,
            area: true,
            beds: true,
            baths: true,
            firesafety: true,
            showcaseimage: true,
            createdAt: true,
            user: {
                select: {
                    id: true,
                    name: true,
                    image: true,
                }
            },
            _count: {
                select: {
                    reviews: true,
                },
            },
        }
    });

    return properties;
}