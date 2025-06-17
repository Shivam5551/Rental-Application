import { authOptions } from '@/utils/authOptions';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import Razorpay from 'razorpay';

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

        const { amount } = await request.json();
        
        if (!amount || isNaN(parseFloat(amount))) {
            return NextResponse.json({
                success: false,
                message: "Invalid amount"
            }, { status: 400 });
        }

        // Convert amount to paise (Razorpay requires amount in smallest currency unit)
        const amountInPaise = Math.round(parseFloat(amount) * 100);

        const options = {
            amount: amountInPaise,
            currency: 'INR',
            receipt: `receipt1`,
        };

        const order = await razorpay.orders.create(options);
        console.log('Razorpay order created:', order.id);

        return NextResponse.json({ 
            success: true,
            orderId: order.id,
            amount: order.amount,
            currency: order.currency
        }, { status: 200 });

    } catch (error) {
        console.error('Error creating Razorpay order:', error);
        return NextResponse.json({
            success: false,
            message: "Failed to create payment order"
        }, { status: 500 });
    }
}
