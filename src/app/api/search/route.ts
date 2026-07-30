import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/prismaClient";

interface IResult {
    id: string;
    title: string;
    city: string;
    state: string;
}

const MIN_QUERY_LENGTH = 2;
const RESULT_LIMIT = 8;

export async function GET(request: NextRequest) {
    const url = request.nextUrl;
    const rawQuery = url.searchParams.get("query");
    const searchQuery = rawQuery?.trim();

    try {
        // No query or too short → return trending/recent verified properties
        if (!searchQuery || searchQuery.length < MIN_QUERY_LENGTH) {
            const result: IResult[] = await prisma.property.findMany({
                where: {
                    verified: true,
                    deletedAt: null,
                },
                select: {
                    id: true,
                    title: true,
                    city: true,
                    state: true,
                },
                orderBy: {
                    createdAt: "desc",
                },
                take: RESULT_LIMIT,
            });

            return NextResponse.json(
                {
                    result,
                    message: "Fetched",
                },
                { status: 200 }
            );
        }

        // Only attempt coordinate matching if the query is actually numeric
        const numericQuery = Number(searchQuery);
        const isNumeric = !isNaN(numericQuery) && isFinite(numericQuery);

        const orConditions: Array<Record<string, unknown>> = [
            { title: { contains: searchQuery, mode: "insensitive" } },
            { address: { contains: searchQuery, mode: "insensitive" } },
            { city: { contains: searchQuery, mode: "insensitive" } },
            { state: { contains: searchQuery, mode: "insensitive" } },
            { country: { contains: searchQuery, mode: "insensitive" } },
            { postalCode: { contains: searchQuery, mode: "insensitive" } },
        ];

        // Only add lat/lng filters when query is a valid number
        if (isNumeric) {
            orConditions.push({ latitude: numericQuery }, { longitude: numericQuery });
        }

        const result: IResult[] = await prisma.property.findMany({
            where: {
                verified: true,
                deletedAt: null,
                OR: orConditions,
            },
            select: {
                id: true,
                title: true,
                city: true,
                state: true,
            },
            orderBy: [{ verified: "desc" }, { createdAt: "desc" }],
            take: RESULT_LIMIT,
        });

        return NextResponse.json(
            {
                result,
                message: "Fetched",
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Search error:", error);

        return NextResponse.json(
            {
                message: "Unable to retrieve data",
            },
            { status: 500 }
        );
    }
}
