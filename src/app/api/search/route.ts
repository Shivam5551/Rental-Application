import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/prismaClient";

interface IResult {
    id: string;
    title: string;
}

export async function GET(request: NextRequest) {
    const url = request.nextUrl;
    const searchQuery = url.searchParams.get("query");

    try {
    if(!searchQuery) {
        const result: IResult[] = await prisma.property.findMany({
            take: 5
        });
        return NextResponse.json({
            result,
            message: "Fetched"
        }, {
            status: 200
        })
    }
        const result: IResult[] = await prisma.property.findMany({
            where: {
                OR: [{
                    location: {
                        contains: searchQuery,
                        mode: 'insensitive' 
                    }
                },
                {
                    title: {
                        contains: searchQuery,
                        mode: 'insensitive' 
                    }
                }
                ]
            },
            take: 5
        })
        return NextResponse.json({
            result,
            message: "fetched"
        }, {
            status: 200
        })
    } catch (error) {
        return NextResponse.json({
            message: "Unable to retrieve Data"
        }, {
            status: 500
        })
    }
}