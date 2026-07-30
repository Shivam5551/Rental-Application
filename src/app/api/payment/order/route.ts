import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";
import prisma from "@/utils/prismaClient";

const razorpay = new Razorpay({
    key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
    key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user.id) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Unauthorized",
                },
                { status: 401 }
            );
        }

        const { propertyId, checkIn, checkOut } = await request.json();

        if (!propertyId || !checkIn || !checkOut) {
            return NextResponse.json(
                { success: false, message: "Missing required fields" },
                { status: 400 }
            );
        }

        const checkInDate = new Date(checkIn);
        const checkOutDate = new Date(checkOut);

        if (
            isNaN(checkInDate.getTime()) ||
            isNaN(checkOutDate.getTime()) ||
            checkInDate >= checkOutDate
        ) {
            return NextResponse.json({ success: false, message: "Invalid dates" }, { status: 400 });
        }

        const property = await prisma.property.findUnique({
            where: { id: propertyId },
            select: { price: true, discount: true }, // adjust to your schema
        });

        if (!property) {
            return NextResponse.json(
                { success: false, message: "Property not found" },
                { status: 404 }
            );
        }
        const nights = Math.ceil(
            (checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24)
        );

        if (nights <= 0) {
            return NextResponse.json(
                { success: false, message: "Invalid date range" },
                { status: 400 }
            );
        }

        const discountedPrice: number =
            property.discount > 0
                ? (property.price / 100) * (1 - property.discount / 10000)
                : property.price / 100;
        const amountInPaise = Math.round(discountedPrice * nights * 100);

        const options = {
            amount: amountInPaise,
            currency: "INR",
            receipt: `rcpt-${Date.now()}`,
        };

        const order = await razorpay.orders.create(options);

        console.log("Razorpay order created:", order.id);

        const res = await prisma.$transaction(async (txn) => {
            await txn.$executeRaw`SELECT pg_advisory_xact_lock(hashtext(${propertyId}))`;
            const conflictingBooking = await txn.booking.findFirst({
                where: {
                    propertyId,
                    status: {
                        in: ["PENDING", "CONFIRMED"],
                    },
                    startDate: {
                        lt: new Date(checkOut),
                    },
                    endDate: {
                        gt: new Date(checkIn),
                    },
                },
            });
            if (conflictingBooking) {
                return null;
            }

            const booking = await txn.booking.create({
                data: {
                    userId: session.user.id,
                    propertyId: propertyId,
                    startDate: new Date(checkIn),
                    orderId: order.id,
                    endDate: new Date(checkOut),
                    totalPrice: Math.round(parseFloat(amountInPaise.toString()) * 100),
                },
            });
            const payment = await txn.payment.create({
                data: {
                    razorpayOrderId: order.id,
                    amount: amountInPaise * 100,
                    userId: session.user.id,
                    status: "PENDING",
                    bookingId: booking.id,
                },
            });
            return { booking, payment, order };
        });
        if (!res) {
            return NextResponse.json(
                {
                    success: false,
                    message: "These dates are already reserved or booked.",
                },
                { status: 409 }
            );
        }
        return NextResponse.json(
            {
                success: true,
                orderId: order.id,
                amount: order.amount,
                currency: order.currency,
                bookingId: res?.booking.id,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error creating Razorpay order:", error);
        return NextResponse.json(
            {
                success: false,
                message: "Failed to create payment order",
            },
            { status: 500 }
        );
    }
}
