import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(request: NextRequest) {

    // raw body
    try {
        const body = await request.text();
        const razorpaySignature = request.headers.get("x-razorpay-signature");
        if (!razorpaySignature) {
            return NextResponse.json(
                { success: false },
                { status: 400 }
            );
        }
        const expectedSignature = crypto
            .createHmac(
                "sha256",
                process.env.RAZORPAY_WEBHOOK_SECRET!
            ).update(body).digest("hex");
        if (expectedSignature !== razorpaySignature) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Invalid webhook signature"
                },
                {
                    status: 400
                }
            );
        }
        const event = JSON.parse(body);
        console.log("Webhook evenet:", event.event);
        switch (event.event) {
            case "payment.captured": {
                const paymentEntity = event.payload.payment.entity;
                const orderId = paymentEntity.order_id;
                const paymentId = paymentEntity.id;
                await prisma?.$transaction(async (txn) => {
                    const payment = await txn.payment.findUnique({
                        where: {
                            razorpayOrderId: orderId
                        }
                    });

                    if (!payment) {
                        throw new Error(
                            "Payment not found"
                        );
                    }
                    if (
                        payment.status ===
                        "COMPLETED"
                    ) {
                        return;
                    }
                    await txn.payment.update({
                        where: {
                            razorpayOrderId:
                                orderId
                        },
                        data: {
                            status: "COMPLETED",
                            razorpayPaymentId:
                                paymentId
                        }
                    });
                    await txn.booking.update({
                        where: {
                            id:
                                payment.bookingId
                        },
                        data: {
                            status: "CONFIRMED"
                        }
                    });
                })
                break;
            }
            case "payemnt.failed": {
                const paymentEntity = event.payload.payment.entity;
                const orderId = paymentEntity.order_id;
                await prisma?.$transaction(async (txn) => {
                    const payemnt = await txn.payment.findUnique({
                        where: {
                            razorpayOrderId: orderId
                        }
                    });
                    if (!payemnt) {
                        return;
                    }
                    await txn.payment.update({
                        where: {
                            razorpayOrderId: orderId
                        },
                        data: {
                            status: "FAILED"
                        }
                    });

                    await txn.booking.update({
                        where: {
                            id: payemnt.bookingId
                        },
                        data: {
                            status: "EXPIRED"
                        }
                    });
                })
                break;
            }
            default:
                console.log(
                    "Unhandled Event:",
                    event.event
                );

        }
        return NextResponse.json({
            success: true
        });

    } catch (error) {
        console.error("Webhook Error:",error);

        return NextResponse.json({ 
            success: false 
        }, { status: 500 });
    }
}
