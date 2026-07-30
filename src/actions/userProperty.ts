import { authOptions } from "@/utils/authOptions";
import prisma from "@/utils/prismaClient";
import { getServerSession } from "next-auth";

export const userProperty = async () => {
    const session = await getServerSession(authOptions);
    // console.log("Session user ID:", session?.user?.id);

    if (!session || !session.user.id) {
        console.log("Authorization failed - session:", session?.user?.id);
        return null;
    }

    const properties = await prisma.user.findMany({
        where: {
            id: session.user.id,
        },
        select: {
            properties: {
                select: {
                    id: true,
                    showcaseimage: true,
                    discount: true,
                    price: true,
                    title: true,
                    address: true,
                    city: true,
                    state: true,
                    country: true,
                    postalCode: true,
                    petfriendly: true,
                    beds: true,
                    baths: true,
                    area: true,
                    firesafety: true,
                    description: true,
                },
            },
        },
    });
    return Array.isArray(properties) ? properties.flatMap((item) => item ?? []) : [];
};
