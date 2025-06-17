'use server';

import prisma from "@/utils/prismaClient";

export async function checkPropertyExists(propertyId: string): Promise<boolean> {
    const property = await prisma.property.findUnique({
        where: { id: propertyId },
    });
    return !!property;
}