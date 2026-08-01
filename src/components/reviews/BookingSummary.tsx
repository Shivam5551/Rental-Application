"use client";

import { FaCalendarAlt, FaUsers, FaReceipt, FaClock } from "react-icons/fa";

interface BookingSummaryProps {
    booking: {
        id: string;
        startDate: Date;
        endDate: Date;
        totalPrice: number;
        createdAt: Date;
        payment: {
            status: "PENDING" | "CAPTURED" | "FAILED" | "REFUNDED";
        }[];
    };
    guests?: number;
}

export default function BookingSummary({ booking, guests }: BookingSummaryProps) {
    const formatDate = (date: Date) => {
        return new Date(date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    const calculateNights = () => {
        const diffTime = Math.abs(
            new Date(booking.endDate).getTime() - new Date(booking.startDate).getTime()
        );
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    };

    const getPaymentStatus = () => {
        if (booking.payment && booking.payment.length > 0) {
            return booking.payment[0].status;
        }
        return "PENDING";
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case "COMPLETED":
                return "bg-green-100 text-green-800 border-green-200";
            case "PENDING":
                return "bg-yellow-100 text-yellow-800 border-yellow-200";
            case "FAILED":
                return "bg-red-100 text-red-800 border-red-200";
            case "REFUNDED":
                return "bg-blue-100 text-blue-800 border-blue-200";
            default:
                return "bg-gray-100 text-gray-800 border-gray-200";
        }
    };

    const isCompleted = new Date(booking.endDate) < new Date();

    return (
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-gray-200 dark:border-slate-700 p-6">
            <div className="flex items-center gap-3 mb-4">
                <FaReceipt className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Booking Details
                </h3>
            </div>

            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-300">Booking ID:</span>
                    <span className="text-sm font-mono text-gray-900 dark:text-white">
                        {booking.id.slice(0, 8)}...
                    </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                            <FaCalendarAlt className="w-4 h-4" />
                            Check-in
                        </div>
                        <p className="font-semibold text-gray-900 dark:text-white">
                            {formatDate(booking.startDate)}
                        </p>
                    </div>

                    <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                            <FaCalendarAlt className="w-4 h-4" />
                            Check-out
                        </div>
                        <p className="font-semibold text-gray-900 dark:text-white">
                            {formatDate(booking.endDate)}
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                            <FaClock className="w-4 h-4" />
                            Duration
                        </div>
                        <p className="font-semibold text-gray-900 dark:text-white">
                            {calculateNights()} {calculateNights() === 1 ? "night" : "nights"}
                        </p>
                    </div>

                    {guests && (
                        <div className="space-y-1">
                            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                                <FaUsers className="w-4 h-4" />
                                Guests
                            </div>
                            <p className="font-semibold text-gray-900 dark:text-white">
                                {guests} {guests === 1 ? "guest" : "guests"}
                            </p>
                        </div>
                    )}
                </div>

                <div className="border-t border-gray-200 dark:border-gray-600 pt-4">
                    <div className="flex justify-between items-center">
                        <span className="text-lg font-semibold text-gray-900 dark:text-white">
                            Total Paid:
                        </span>
                        <span className="text-xl font-bold text-orange-600 dark:text-orange-400">
                            ₹{(booking.totalPrice / 100).toLocaleString("en-IN")}
                        </span>
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                        Payment Status:
                    </span>
                    <span
                        className={`px-3 py-1 text-xs font-semibold rounded-full border ${getStatusColor(getPaymentStatus())}`}
                    >
                        {getPaymentStatus()}
                    </span>
                </div>

                <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-300">Booked on:</span>
                    <span className="text-gray-900 dark:text-white">
                        {formatDate(booking.createdAt)}
                    </span>
                </div>

                {isCompleted && (
                    <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3">
                        <p className="text-sm text-green-800 dark:text-green-300 font-medium">
                            ✅ Stay completed - Perfect time to share your experience!
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
