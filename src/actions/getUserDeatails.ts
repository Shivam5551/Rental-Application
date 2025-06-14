'use server';

import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";
import prisma from "@/utils/prismaClient";

export const getUserDetails = async () => {
    const session = await getServerSession(authOptions);
    if(!session) {
        return null;
    }
    const user = await prisma?.user.findFirst({
        where: {
            id: session.user.id
        },
        select: {
            name: true,
            properties: true
        }
    });
    if(!user?.properties) {
        return null
    }
    const verified = user?.properties.map((p) => {
        if(p.verified) {
            return p;
        }
    });
    const booked = user.properties.map((p) => {
        if(p.booked) {
            return p;
        }
    });
    const totalProperty = user.properties.length;
    const unverified = totalProperty - verified.length;
    const vacant = totalProperty - booked.length;

    return {
        username: user.name,
        unverified,
        vacant,
        totalProperty,
        booked: booked.length,
        verified: verified.length,
    }
}