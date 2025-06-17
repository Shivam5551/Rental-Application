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
            propertyId,
            checkIn,
            checkOut,
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
            const booking = await tx.booking.create({
                data: {
                    userId: session.user.id,
                    propertyId: propertyId,
                    startDate: new Date(checkIn),
                    endDate: new Date(checkOut),
                    totalPrice: Math.round(parseFloat(totalAmount) * 100),
                }
            });

            const payment = await tx.payment.create({
                data: {
                    amount: Math.round(parseFloat(totalAmount) * 100),
                    currency: 'INR',
                    status: 'COMPLETED',
                    razorpayOrderId: orderCreationId,
                    razorpayPaymentId: razorpayPaymentId,
                    razorpaySignature: razorpaySignature,
                    userId: session.user.id,
                    bookingId: booking.id
                }
            });

            return { booking, payment };
        });

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