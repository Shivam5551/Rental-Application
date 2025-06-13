import { PrismaClient } from "@/prisma/generated/prisma-client-js/client";

const prismaClientSingleton = (): PrismaClient => {
    return new PrismaClient({
        datasourceUrl: process.env.DATABASE_URL
    });
};


declare global {
    // eslint-disable-next-line no-var
    var prisma: ReturnType<typeof prismaClientSingleton> | undefined;
}

const prisma: PrismaClient = global.prisma ?? prismaClientSingleton();

export default prisma;

if(process.env.NODE_ENV != 'production') global.prisma = prisma;
