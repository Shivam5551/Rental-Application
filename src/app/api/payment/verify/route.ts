import { authOptions } from "@/utils/authOptions";
// import prisma from "@/utils/prismaClient";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import crypto from 'crypto';

function generateSignature(orderCreationId: string, razorpayPaymentId: string, keySecret: string): string {
    const signature = crypto
        .createHmac('sha256', keySecret)
        .update(orderCreationId + '|' + razorpayPaymentId)
        .digest('hex');
    return signature;
}

export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user.id) {
            return NextResponse.json({
                success: false,
                message: "Unauthorized"
            }, { status: 401 });
        }

        const {
            orderCreationId,
            razorpayPaymentId,
            razorpaySignature,
            // totalAmount
        } = await request.json();

        // console.log("Verify Body: ", orderCreationId, razorpayPaymentId, razorpaySignature)
        
        if (!orderCreationId || !razorpayPaymentId || !razorpaySignature) {
            return NextResponse.json({
                success: false,
                message: "Missing payment verification data"
            }, { status: 400 });
        }

        const keySecret = process.env.RAZORPAY_KEY_SECRET;
        if (!keySecret) {
            return NextResponse.json({
                success: false,
                message: "Payment configuration error"
            }, { status: 500 });
        }

        const generatedSignature = generateSignature(orderCreationId, razorpayPaymentId, keySecret);

        if (generatedSignature !== razorpaySignature) {
            return NextResponse.json({
                success: false,
                message: 'Payment verification failed'
            }, { status: 400 });
        }

        const verify = await prisma?.$transaction(async (txn) => {
            await txn.payment.update({
                where: {
                    razorpayOrderId: orderCreationId
                },
                data: {
                    razorpayPaymentId,
                    razorpaySignature
                }
            })
            const booking = await txn.booking.update({
                where: {
                    orderId: orderCreationId
                }, data: {
                    verified: true
                }
            })
            return { booking }
        })

        return NextResponse.json({
            success: true,
            message: 'Payment verified and booking is processing',
            paymentId: razorpayPaymentId,
            bookingId: verify?.booking.id
        }, { status: 200 });

    } catch (error) {
        console.error('Payment verification error:', error);
        return NextResponse.json({
            success: false,
            message: 'Payment verification failed'
        }, { status: 500 });
    }
}