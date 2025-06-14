import { getRatings } from "@/actions/getRatings";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ pid: string }> }
) {
    try {
        const { pid } = await params;
        if(!pid) {
            return NextResponse.json({
                message: "No Property Id provided"
            }, {
                status: 400
            })
        }
        const { rating } = await getRatings(pid);
        return NextResponse.json({
            rating,
            message: "Rating retrieved"
        }, {
            status: 200
        })
    } catch (error) {
        console.log("Rating Retrieval Error:", error);
        return NextResponse.json({
            message: "An error Occured"
        }, {
            status: 500
        })
    }    
}