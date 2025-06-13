
import { PrismaClient } from "./generated/prisma-client-js/client.js";
import { hashSync } from "bcrypt-ts";

const prisma = new PrismaClient()

async function main() {
    await prisma.user.upsert({
        where: { email: "alice@gmail.com" },
        update: {},
        create: {
            email: "alice@gmail.com",
            password: hashSync("Alice12345", 10),
            name: "Alice",
            provider: "Email",
        }
    })
}

main()
    .then(async () => {
        console.log("Data Seeded Successfully");
        
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
    })