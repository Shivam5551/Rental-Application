"use client";

import { checkPropertyExists } from "@/actions/propertyidVerifyAction";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

export default function CheckoutComponent() {
    const { data: session, status } = useSession();
    const searchParams = useSearchParams();
    const router = useRouter();
    const idRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const [loading1, setLoading1] = useState(true);
    const [propertyExists, setPropertyExists] = useState<boolean | null>(null);

    const amount = searchParams.get("amount");
    const propertyId = searchParams.get("propertyId");
    const checkIn = searchParams.get("checkIn");
    const checkOut = searchParams.get("checkOut");
    const guests = searchParams.get("guests");
    const nights = searchParams.get("nights");

    useEffect(() => {
        if (propertyId) {
            const verifyProperty = async () => {
                const exists = await checkPropertyExists(propertyId);
                setPropertyExists(exists);
            };
            verifyProperty();
        }
    }, [propertyId]);

    useEffect(() => {
        if (propertyExists && amount && session?.user?.id) {
            const createOrderId = async () => {
                try {
                    const response = await axios.post("/api/payment/order", {
                        amount: amount,
                        propertyId,
                        checkIn,
                        checkOut,
                    });

                    if (!response.data.success) {
                        throw new Error(
                            "Someone has already booked this property for the selected dates. Please choose different dates."
                        );
                    }

                    const orderId = response.data.orderId;
                    idRef.current = orderId;
                    setLoading1(false);
                } catch (error) {
                    console.error("Error creating payment order:", error);
                    toast.error(
                        "Someone has already booked this property for the selected dates. Please choose different dates."
                    );
                    setLoading1(false);
                    router.push(`/booking-failed/${propertyId}`);
                }
            };

            createOrderId();
        }
    }, [propertyExists, amount, session?.user?.id, checkIn, checkOut, propertyId, router]);

    const processPayment = useCallback(async () => {
        setLoading(true);
        const orderId = idRef.current;

        if (!orderId) {
            toast.error("Payment order not created. Please try again.");
            setLoading(false);
            return;
        }

        if (!window.Razorpay) {
            toast.error("Payment gateway not available. Please refresh and try again.");
            setLoading(false);
            return;
        }

        try {
            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                amount: parseFloat(amount!) * 100,
                currency: "INR",
                name: "BookIT",
                description: `Booking for ${nights} nights`,
                order_id: orderId,

                handler: async function (response: any) {
                    const data = {
                        orderCreationId: orderId,
                        razorpayPaymentId: response.razorpay_payment_id,
                        razorpayOrderId: response.razorpay_order_id,
                        razorpaySignature: response.razorpay_signature,
                        totalAmount: amount,
                    };

                    try {
                        const result = await axios.post("/api/payment/verify", data);
                        if (result.data.success) {
                            const bookingId = result.data.bookingId;
                            toast.success("Payment successful! Redirecting...");
                            router.push(`/booking-success/${bookingId}`);
                        } else {
                            toast.error(result.data.message || "Payment verification failed");
                        }
                    } catch (error) {
                        console.error("Payment verification error:", error);
                        toast.error("Payment verification failed. Please contact support.");
                    }
                },
                prefill: {
                    name: session?.user?.name || "",
                    email: session?.user?.email || "",
                },
                theme: {
                    color: "#3399cc",
                },
                modal: {
                    confirm_close: false,
                    ondismiss: () => {
                        setLoading(false);
                        console.log("Checkout closed");
                        toast.error("Payment was not completed.");
                        router.push(`/booking-failed/${orderId}`);
                    },
                },
            };

            const paymentObject = new window.Razorpay(options);

            paymentObject.on("payment.failed", function (response: any) {
                setLoading(false);
                console.log("Payment failed:", response.error);
                toast.error("Payment failed: " + response.error.description);
                router.push(`/booking-failed/${orderId}`);
            });

            paymentObject.on("payment.cancelled", function (response: any) {
                setLoading(false);
                console.log("Payment cancelled", response.error);
                toast.error("Payment failed: " + response.error.description);
                router.push(`/booking-failed/${orderId}`);
            });

            setLoading(false);
            paymentObject.open();
        } catch (error) {
            console.error("Payment processing error:", error);
            toast.error("Failed to process payment");
            setLoading(false);
        }
    }, [amount, nights, router, session]);

    useEffect(() => {
        console.log(
            "Reached process payment useEffect",
            loading1,
            idRef.current,
            propertyExists,
            session?.user.id
        );

        if (!loading1 && idRef.current && propertyExists && session?.user?.id) {
            console.log("will process payment");

            processPayment();
        }
    }, [loading1, propertyExists, session?.user?.id, processPayment]);

    if (status === "loading") {
        return (
            <div className="container h-screen flex min-w-screen justify-center items-center">
                <div className="animate-spin rounded-full border-b-2 border-blue-500 h-20 w-20" />
            </div>
        );
    }

    if (status === "unauthenticated" || !session || !session.user.id) {
        return (
            <div className="container h-screen flex justify-center items-center">
                <div className="text-center">
                    <h2 className="text-xl font-semibold mb-2">Authentication Required</h2>
                    <p className="text-gray-600">Please sign in to access this page.</p>
                </div>
            </div>
        );
    }

    if (!amount || !propertyId || !checkIn || !checkOut || !guests) {
        return (
            <div className="container h-screen flex justify-center items-center">
                <div className="text-center">
                    <h2 className="text-xl font-semibold mb-2">Invalid Booking Data</h2>
                    <p className="text-gray-600">Required booking information is missing.</p>
                </div>
            </div>
        );
    }

    if (propertyExists === null) {
        return (
            <div className="container h-screen min-w-screen flex justify-center items-center">
                <div className="animate-spin rounded-full border-b-2 border-blue-500 h-20 w-20" />
            </div>
        );
    }

    if (!propertyExists) {
        return (
            <div className="container h-screen flex justify-center items-center">
                <div className="text-center">
                    <h2 className="text-xl font-semibold mb-2">Property Not Found</h2>
                    <p className="text-gray-600">
                        The property you&apos;re trying to book does not exist.
                    </p>
                </div>
            </div>
        );
    }

    // Loading states
    if (loading1) {
        return (
            <div className="container h-screen min-w-screen flex justify-center items-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full border-b-2 border-blue-500 h-20 w-20 mx-auto mb-4" />
                    <h2 className="text-xl font-semibold mb-2">Preparing Payment</h2>
                    <p className="text-gray-600">Please wait while we set up your payment...</p>
                </div>
            </div>
        );
    }

    // Show payment preparation screen
    if (!window.Razorpay) {
        return (
            <div className="container h-screen min-w-screen flex justify-center items-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full border-b-2 border-blue-500 h-20 w-20 mx-auto mb-4" />
                    <h2 className="text-xl font-semibold mb-2">Loading Payment Gateway</h2>
                    <p className="text-gray-600">Initializing secure payment system...</p>
                </div>
            </div>
        );
    }

    return (
        <div>
            {loading && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 flex items-center space-x-3">
                        <div className="animate-spin rounded-full border-2 border-blue-500 border-t-transparent h-6 w-6"></div>
                        <span className="text-gray-700">Processing payment...</span>
                    </div>
                </div>
            )}
        </div>
    );
}
