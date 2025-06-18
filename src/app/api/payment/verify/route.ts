import { authOptions } from "@/utils/authOptions";
import prisma from "@/utils/prismaClient";
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
            totalAmount
        } = await request.json();

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

        const result = await prisma.$transaction(async (tx) => {
            
            const booking = await tx.booking.findUnique({
                where: {
                    userId: session.user.id,
                    orderId: orderCreationId
                }
            })
            if(!booking) {
                return;
            }

            const payment = await tx.payment.update({
                where: {
                    razorpayOrderId: orderCreationId,
                },
                data: {
                    amount: Math.round(parseFloat(totalAmount) * 100),
                    currency: 'INR',
                    status: 'COMPLETED',
                    razorpayPaymentId: razorpayPaymentId,
                    razorpaySignature: razorpaySignature,
                    userId: session.user.id
                }
            });

            return { booking, payment };
        });

        if(!result) {
            return NextResponse.json({
                success: false,
                message: "Unable to process Payment",
            }, {
                status: 201
            })
        }
        return NextResponse.json({
            success: true,
            message: 'Payment verified and booking created successfully',
            paymentId: razorpayPaymentId,
            bookingId: result.booking.id
        }, { status: 200 });

    } catch (error) {
        console.error('Payment verification error:', error);
        return NextResponse.json({
            success: false,
            message: 'Payment verification failed'
        }, { status: 500 });
    }
}