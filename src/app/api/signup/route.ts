import { hash } from "bcrypt-ts";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/prismaClient";

interface ISignupRequest {
    name: string;
    email: string;
    password: string;
}

export async function POST(request: NextRequest) {
    const body = await request.json();
    const {  name, email, password }: ISignupRequest = body;
    if(!name || !email || !password) {
        return NextResponse.json({
            success: false,
            message: "All inputs are required"
        }, {
            status: 400
        })
    }
    try{
        const isExists = await prisma?.user.findFirst({
            where: {
                email
            }
        });
        if(isExists) {
            return NextResponse.json({
            success: false,
            message: "User Exists"
            }, {
            status: 201
            });
        }
        const hashedPassword = await hash(password, 10);
        const user = await prisma?.user.create({
            data: {
                email,
                password: hashedPassword,
                name,
                provider: "Email"
            },
            select: {
                id: true,
                email: true
            }
        });
        if(!user) {
            throw new Error("Unable to create User with email");
        }
        return NextResponse.json({
                success: true,
                message: "User created Successfully"
            }, {
                status: 200
            })
        
    }
    catch(e) {
        console.log("Signup Error:", e);
        return NextResponse.json({
            success: false,
            message: "Unable to create User"
        }, {
            status: 500
        })
        
    }
}