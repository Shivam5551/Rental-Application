"use server";

import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";
import prisma from "@/utils/prismaClient";

export const getProperty = async (id: string) => {
    const session = await getServerSession(authOptions);
    if (!session || !id) return null;

    const property = await prisma?.property.findFirst({
        where: {
            id: id,
            userId: session.user.id,
        },
        select: {
            id: true,
            title: true,
            petfriendly: true,
            discount: true,
            price: true,
            area: true,
            beds: true,
            description: true,
            showcaseimage: true,
            baths: true,
            firesafety: true,
            address: true,
            city: true,
            state: true,
            country: true,
            postalCode: true,
            latitude: true,
            longitude: true,
            images: {
                select: {
                    url: true,
                },
            },
        },
    });
    if (!property) {
        return null;
    }
    const images = property.images.map((p) => p.url);
    return {
        property: {
            title: property.title,
            description: property.description,
            price: Math.floor(property.price / 100),
            beds: property.beds,
            baths: property.baths,
            discount: Math.floor(property.discount / 100),
            area: property.area,
            petfriendly: property.petfriendly,
            firesafety: property.firesafety || false,
            address: property.address,
            city: property.city,
            state: property.state,
            country: property.country,
            postalCode: property.postalCode,
            latitude: property.latitude,
            longitude: property.longitude,
        },
        images: {
            showcase: property.showcaseimage,
            image1: images[0] ?? "",
            image2: images[1] ?? "",
        },
    };
};
