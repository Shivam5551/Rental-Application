import { authOptions } from '@/utils/authOptions';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import prisma from '@/utils/prismaClient';

const razorpay = new Razorpay({
    key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
    key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user.id) {
            return NextResponse.json({
                success: false,
                message: "Unauthorized"
            }, { status: 401 });
        }

        const { amount, propertyId, checkIn, checkOut } = await request.json();

        if (!amount || isNaN(parseFloat(amount)) || !propertyId || !checkIn || !checkOut) {
            return NextResponse.json({
                success: false,
                message: "Unable to process payment"
            }, { status: 400 });
        }

        const amountInPaise = Math.round(parseFloat(amount) * 100);

        const options = {
            amount: amountInPaise,
            currency: 'INR',
            receipt: `rcpt-${Date.now()}`,
        };

        const order = await razorpay.orders.create(options);
        console.log('Razorpay order created:', order.id);
        const res = await prisma.$transaction(async (txn) => {

            const booking = await txn.booking.create({
                data: {
                    userId: session.user.id,
                    propertyId: propertyId,
                    startDate: new Date(checkIn),
                    orderId: order.id,
                    endDate: new Date(checkOut),
                    totalPrice: Math.round(parseFloat(amount) * 100),
                }
            });
            const payment = await txn.payment.create({
                data: {
                    razorpayOrderId: order.id,
                    amount: amount*100,
                    userId: session.user.id,
                    status: "PENDING",
                    bookingId: booking.id,
                }
            });
            return { booking, payment }
        })

        return NextResponse.json({
            success: true,
            orderId: order.id,
            amount: order.amount,
            currency: order.currency,
            bookingId: res.booking.id
        }, { status: 200 });

    } catch (error) {
        console.error('Error creating Razorpay order:', error);
        return NextResponse.json({
            success: false,
            message: "Failed to create payment order"
        }, { status: 500 });
    }
}
