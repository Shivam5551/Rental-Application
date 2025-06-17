'use server';

import CheckoutComponent from "@/components/checkoutComponent";
import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";
import Script from "next/script";

export default async function Checkout() {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
        return (
            <div className="min-h-screen flex items-center justify-center text-center min-w-screen dark:bg-slate-800 dark:text-white">
                <span className="text-lg sm:text-2xl">Please Login first</span>
            </div>
        )
    }
    return (
        <>
            <Script
                id="razorpay-checkout-js"
                src="https://checkout.razorpay.com/v1/checkout.js"
                strategy="afterInteractive"
            />

            <CheckoutComponent />
        </>
    )
}