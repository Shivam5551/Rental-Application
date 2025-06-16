import { authOptions } from "@/utils/authOptions"
import { getUploadAuthParams } from "@imagekit/next/server"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server";

export async function GET() {

    const session = await getServerSession(authOptions);
    if(!session || !session.user.id) {
        return NextResponse.json({
            message: "Unauthorized request"
        }, {
            status: 401
        })
    }
    
    const privateKey = process.env.IMAGEKIT_PRIVATE_KEY as string;
    const publicKey =  process.env.NEXT_PUBLIC_PUBLIC_KEY as string;

    if(!privateKey || !publicKey) {
        return NextResponse.json({
            message: "Public or Private key not available"
        }, {
            status: 400
        })
    }

    const { token, expire, signature } = getUploadAuthParams({
        privateKey,
        publicKey,
    })

    return NextResponse.json({ token, expire, signature, publicKey }, { status: 200 })
}