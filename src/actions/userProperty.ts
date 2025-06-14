import { authOptions } from "@/utils/authOptions";
import prisma from "@/utils/prismaClient"
import { getServerSession } from "next-auth";

export const userProperty = async () => {
    
    const session = await getServerSession(authOptions);
    // console.log("Session user ID:", session?.user?.id);

    if(!session || !session.user.id) {
        console.log("Authorization failed - session:", session?.user?.id);
        return null
    }
    
    const properties = await prisma.user.findFirst({
        where: {
            id: session.user.id
        },
        select: {
            properties: {
                select: {
                    id: true,
                    showcaseimage: true,
                    booked: true,
                    discount: true,
                    price: true,
                    title: true,
                    location: true,
                    petfriendly: true,
                }
            }
        }
    });
    return properties;
}