import { authOptions } from "@/utils/authOptions";
import prisma from "@/utils/prismaClient";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { z as zod } from "zod";


const requestSchema = zod.object({
    accountNumber: zod.string()
        .min(8, "Account number must be at least 8 digits")
        .max(18, "Account number must not exceed 18 digits"),
    ifscNumber: zod.string()
        .length(11, "IFSC code must be exactly 11 characters")
        .transform(val => val.toUpperCase())
}).strict();

export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user.id) {
            return NextResponse.json({
                message: "Unauthenticated request"
            }, {
                status: 401
            });
        }

        const body = await request.json();
        const requestParsed = requestSchema.safeParse(body);

        if (!requestParsed.success) {
            return NextResponse.json({
                message: "Invalid request data",
                errors: requestParsed.error.flatten().fieldErrors
            }, {
                status: 400
            });
        }

        const { accountNumber, ifscNumber } = requestParsed.data;

        const user = await prisma.user.findFirst({
            where: {
                id: session.user.id
            }
        });

        if (!user) {
            return NextResponse.json({
                message: "User not found"
            }, {
                status: 404
            });
        }

        const updatedUser = await prisma.user.update({
            where: {
                id: session.user.id
            },
            data: {
                bankaccountnumber: accountNumber,
                bankifscnumber: ifscNumber
            }
        });

        if (!updatedUser) {
            return NextResponse.json({
                message: "Unable to update bank details"
            }, {
                status: 400
            });
        }

        return NextResponse.json({
            success: true,
            message: "Bank details updated successfully",
            bankDetails: {
                accountNumber: updatedUser.bankaccountnumber,
                ifscNumber: updatedUser.bankifscnumber
            }
        }, {
            status: 200
        });

    } catch (error) {
        console.error("Update Bank Details Error:", error);
        return NextResponse.json({
            message: "Server Error"
        }, {
            status: 500
        });
    }
}
