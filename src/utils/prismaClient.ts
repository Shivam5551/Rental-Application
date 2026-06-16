import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../../prisma/generated/prisma-client-js";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });

declare global {
     
    var prisma: PrismaClient | undefined;
}

const prisma: PrismaClient = global.prisma ?? new PrismaClient({ adapter });

export default prisma;

if (process.env.NODE_ENV != 'production') global.prisma = prisma;
