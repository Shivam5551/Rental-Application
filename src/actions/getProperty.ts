'use server'

import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";
import prisma from "@/utils/prismaClient";

export const getProperty = async (id: string) => {
    const session = await getServerSession(authOptions);
    if (!session || !id) return null;

    const property = await prisma?.property.findFirst({
        where: {
            id: id,
            userId: session.user.id
        },
        select: {
            id: true,
            title: true,
            petfriendly: true,
            discount: true,
            price: true,
            area: true,
            beds: true,
            location: true,
            description: true,
            showcaseimage: true,
            baths: true,
            images: {
                select: {
                    url: true,
                }
            }
        }
    });
    if (!property) {
        return null;
    }
    const images = property.images.map(p => p.url);
    return {
        property: {
            title: property.title,
            description: property.description,
            price: Math.floor(property.price/100),
            beds: property.beds,
            baths: property.baths,
            discount: Math.floor(property.discount/100),
            area: property.area,
            location: property.location,
            petfriendly: property.petfriendly,
        },
        images: {
            showcase: property.showcaseimage,
            image1: images[0] ?? "",
            image2: images[1] ?? "",
        }
    }
}