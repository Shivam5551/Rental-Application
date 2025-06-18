import { authOptions } from "@/utils/authOptions";
import prisma from "@/utils/prismaClient";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

// Custom SVG Icons
const CheckCircleIcon = ({ className }: { className: string }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
    </svg>
);

const CalendarIcon = ({ className }: { className: string }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M12.75 12.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM7.5 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM8.25 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM9.75 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM10.5 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM12.75 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM14.25 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM15 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM16.5 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM15 12.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM16.5 13.5a.75.75 0 100-1.5.75.75 0 000 1.5z" />
        <path fillRule="evenodd" d="M6.75 2.25A.75.75 0 017.5 3v1.5h9V3A.75.75 0 0118 3v1.5h.75a3 3 0 013 3v11.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V7.5a3 3 0 013-3H6V3a.75.75 0 01.75-.75zm13.5 9a1.5 1.5 0 00-1.5-1.5H5.25a1.5 1.5 0 00-1.5 1.5v7.5a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5v-7.5z" clipRule="evenodd" />
    </svg>
);

const MapPinIcon = ({ className }: { className: string }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
    </svg>
);

const UserIcon = ({ className }: { className: string }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
    </svg>
);

const CreditCardIcon = ({ className }: { className: string }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M4.5 3.75a3 3 0 00-3 3v.75h21v-.75a3 3 0 00-3-3h-15z" />
        <path fillRule="evenodd" d="M22.5 9.75h-21v7.5a3 3 0 003 3h15a3 3 0 003-3v-7.5zm-18 3.75a.75.75 0 01.75-.75h6a.75.75 0 010 1.5h-6a.75.75 0 01-.75-.75zm.75 2.25a.75.75 0 000 1.5h3a.75.75 0 000-1.5h-3z" clipRule="evenodd" />
    </svg>
);

interface BookingSuccessProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function BookingSuccess({ params }: BookingSuccessProps) {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-slate-900">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Access Denied</h1>
                    <p className="text-gray-600 dark:text-gray-300">Please sign in to view this page.</p>
                </div>
            </div>
        );
    }

    const resolvedParams = await params;
    const bookingId = resolvedParams.id;

    // Fetch booking details with related data
    const booking = await prisma.booking.findUnique({
        where: {
            id: bookingId,
            userId: session.user.id // Ensure user can only see their own bookings
        },
        include: {
            property: {
                select: {
                    id: true,
                    title: true,
                    location: true,
                    showcaseimage: true,
                    price: true,
                    user: {
                        select: {
                            name: true,
                            email: true,
                            image: true
                        }
                    }
                }
            },
            payment: {
                select: {
                    id: true,
                    amount: true,
                    currency: true,
                    status: true,
                    razorpayPaymentId: true,
                    createdAt: true
                }
            }
        }
    });

    if (!booking) {
        notFound();
    }

    // Calculate booking details
    const startDate = new Date(booking.startDate);
    const endDate = new Date(booking.endDate);
    const nights = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    const totalAmount = booking.totalPrice / 100; // Convert from paise to rupees

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-slate-900 py-8">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-8">
                    <CheckCircleIcon className="h-16 w-16 text-green-500 mx-auto mb-4" />
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                        Booking Confirmed!
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-300">
                        Your booking has been successfully confirmed. Check your email for details.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md overflow-hidden">
                            <div className="p-6">
                                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                                    Booking Details
                                </h2>

                                <div className="flex items-start space-x-4 mb-6">
                                    {booking.property.showcaseimage && (
                                        <Image
                                            height={100}
                                            width={100}
                                            src={booking.property.showcaseimage}
                                            alt={booking.property.title}
                                            className="w-20 h-20 object-cover rounded-lg"
                                        />
                                    )}
                                    <div>
                                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                                            {booking.property.title}
                                        </h3>
                                        <div className="flex items-center text-gray-600 dark:text-gray-300 mt-1">
                                            <MapPinIcon className="h-4 w-4 mr-1" />
                                            <span className="text-sm">{booking.property.location}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                        <div className="flex items-start space-x-3">
                                            <CalendarIcon className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                                            <div className="min-w-0">
                                                <p className="text-sm text-gray-600 dark:text-gray-400">Check-in</p>
                                                <p className="font-medium text-gray-900 dark:text-white text-sm sm:text-base">
                                                    {startDate.toLocaleDateString('en-IN', {
                                                        weekday: 'short',
                                                        year: 'numeric',
                                                        month: 'short',
                                                        day: 'numeric'
                                                    })}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-start space-x-3">
                                            <CalendarIcon className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0" />
                                            <div className="min-w-0">
                                                <p className="text-sm text-gray-600 dark:text-gray-400">Check-out</p>
                                                <p className="font-medium text-gray-900 dark:text-white text-sm sm:text-base">
                                                    {endDate.toLocaleDateString('en-IN', {
                                                        weekday: 'short',
                                                        year: 'numeric',
                                                        month: 'short',
                                                        day: 'numeric'
                                                    })}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="flex items-start space-x-3">
                                            <UserIcon className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                                            <div className="min-w-0">
                                                <p className="text-sm text-gray-600 dark:text-gray-400">Booking ID</p>
                                                <p className="font-medium text-gray-900 dark:text-white font-mono text-sm">
                                                    {booking.id.substring(0, 8).toUpperCase()}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-start space-x-3">
                                            <div className="h-5 w-5 bg-purple-500 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                                                <span className="text-white text-xs font-bold">{nights}</span>
                                            </div>
                                            <div className="min-w-0">
                                                <p className="text-sm text-gray-600 dark:text-gray-400">Duration</p>
                                                <p className="font-medium text-gray-900 dark:text-white">
                                                    {nights} {nights === 1 ? 'night' : 'nights'}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-1">
                        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                Payment Summary
                            </h3>

                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-gray-600 dark:text-gray-400">Rate per night</span>
                                    <span className="text-gray-900 dark:text-white">
                                        ₹{(booking.property.price).toLocaleString()}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600 dark:text-gray-400">
                                        {nights} {nights === 1 ? 'night' : 'nights'}
                                    </span>
                                    <span className="text-gray-900 dark:text-white">
                                        ₹{totalAmount.toLocaleString()}
                                    </span>
                                </div>
                                <div className="border-t border-gray-200 dark:border-gray-600 pt-3">
                                    <div className="flex justify-between">
                                        <span className="text-lg font-semibold text-gray-900 dark:text-white">Total Paid</span>
                                        <span className="text-lg font-semibold text-green-600">
                                            ₹{totalAmount.toLocaleString()}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {booking.payment?.[0] && (
                                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-600">
                                    <div className="flex items-center space-x-2 mb-3">
                                        <CreditCardIcon className="h-5 w-5 text-green-500" />
                                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                                            Payment Confirmed
                                        </span>
                                    </div>
                                    <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
                                        <p>Payment ID: {booking.payment[0].razorpayPaymentId}</p>
                                        <p>Paid on: {new Date(booking.payment[0].createdAt).toLocaleDateString('en-IN')}</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 mt-6">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                Host Contact
                            </h3>
                            <div className="flex items-center space-x-3">
                                {booking.property.user.image && (
                                    <Image 
                                        height={100}
                                        width={100}
                                        src={booking.property.user.image}
                                        alt={booking.property.user.name || 'Host'}
                                        className="w-12 h-12 rounded-full object-cover"
                                    />
                                )}
                                <div>
                                    <p className="font-medium text-gray-900 dark:text-white">
                                        {booking.property.user.name}
                                    </p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        {booking.property.user.email}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        href="/bookings"
                        className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors text-center"
                    >
                        View All Bookings
                    </Link>
                    <Link
                        href="/"
                        className="bg-gray-600 hover:bg-gray-700 text-white font-medium py-3 px-6 rounded-lg transition-colors text-center"
                    >
                        Back to Home
                    </Link>
                </div>

                <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-3">
                        What&apos;s Next?
                    </h3>
                    <ul className="space-y-2 text-blue-800 dark:text-blue-200">
                        <li className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                            <span>You&apos;ll receive a confirmation email with your booking details</span>
                        </li>
                        <li className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                            <span>The host will contact you with check-in instructions</span>
                        </li>
                        <li className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                            <span>Save the host&apos;s contact information for your trip</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}