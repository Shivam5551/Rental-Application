import { Prisma, Provider } from "@/prisma/generated/prisma-client-js";
import { authOptions } from "@/utils/authOptions";
import prisma from "@/utils/prismaClient";
import { compare, hash } from "bcrypt-ts";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { z as zod } from "zod";

const requestSchema = zod.object({
    email: zod.string().email().optional(),
    name: zod.string().optional(),
    image: zod.string().url().optional(),
    newPassword: zod.string().optional(),
    oldPassword: zod.string().optional(),
}).strict();

export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user.id) {
            return NextResponse.json({
                message: "Unauthenticated request"
            }, {
                status: 401
            })
        }
        const body = await request.json();
        const requestParsed = requestSchema.safeParse(body);

        if (!requestParsed.success) {
            return NextResponse.json({
                message: "Invalid request data"
            }, {
                status: 400
            });
        }

        const { name, email, oldPassword, newPassword, image } = requestParsed.data;

        if (!name && !email && !oldPassword && !newPassword && !image) {
            return NextResponse.json({
                message: "Missing Fields"
            }, {
                status: 400
            })
        }

        const user = await prisma?.user.findFirst({
                where: {
                    id: session.user.id
                }
            });
            if (!user) {
                return NextResponse.json({
                    message: "User Not found"
                }, {
                    status: 404
                });
            }
            

        const updateFields: Prisma.UserUpdateInput = {};
        if (newPassword) {
            const hashedPassword = await hash(newPassword, 10);
            if (!user.password && !oldPassword && user.provider === Provider.Google) {
                updateFields.password = hashedPassword;
            }
            if (user.password && oldPassword) {
                const isCorrectPassword = await compare(oldPassword, user?.password);
                if (!isCorrectPassword) {
                    return NextResponse.json({
                        message: "Wrong Password"
                    }, {
                        status: 400
                    })
                }
                updateFields.password = hashedPassword;
            }
        }
        if (name) updateFields.name = name;
        if (image) updateFields.image = image;
        if (email) {
            const isExists = await prisma.user.findFirst({
                where: {
                    email,
                    NOT: {
                        id: session.user.id
                    }
                }
            })
            if(isExists) {
                return NextResponse.json({
                    message: "Email is already in use"
                }, {
                    status: 409
                })
            }
            updateFields.email = email;
        }
        

        const updateUser = await prisma?.user.update({
            where: {
                id: session.user.id
            },
            data: {
                ...updateFields
            }
        });
        if (!updateUser) {
            return NextResponse.json({
                message: "Unable to update user"
            }, {
                status: 400
            })
        }
        return NextResponse.json({
            success: true,
            message: "User Update Successfully",
             user: {
                id: updateUser.id,
                name: updateUser.name,
                email: updateUser.email,
                image: updateUser.image,
            },
        }, {
            status: 200
        })
    } catch (error) {
        console.log("Update Profile Error:", error);
        return NextResponse.json({
            message: "Server Error"
        }, {
            status: 500
        })

    }
}