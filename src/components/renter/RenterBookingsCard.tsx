"use client";
import { IBookedProperties } from "@/utils/interfaces";
import Image from "next/image";
import { redirect } from "next/navigation";
import { MdCalendarToday, MdLocationOn, MdPerson, MdPayment, MdHome } from "react-icons/md";

export const RenterBookingsCard = ({ bookings }: { bookings: IBookedProperties[] }) => {
    const formatDate = (date: Date) => {
        return new Date(date).toLocaleDateString("en-IN", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case "CAPTURED":
                return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
            case "PENDING":
                return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
            case "FAILED":
                return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
            default:
                return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
        }
    };

    const getBookingStatus = (startDate: Date, endDate: Date) => {
        const now = new Date();
        const start = new Date(startDate);
        const end = new Date(endDate);

        if (now < start)
            return {
                status: "Upcoming",
                color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
            };
        if (now >= start && now <= end)
            return {
                status: "Active",
                color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
            };
        return {
            status: "Completed",
            color: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300",
        };
    };

    return (
        <div className="bg-neutral-100 min-h-243 max-h-243 overflow-y-auto rounded-xl shadow-md  dark:bg-slate-800 p-4">
            <div className="flex items-center gap-2 mb-4">
                <MdHome className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-semibold dark:text-white">My Bookings</h3>
                <span className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 px-2 py-1 rounded-full text-xs">
                    {bookings.length}
                </span>
            </div>

            {bookings.length === 0 ? (
                <div className="text-center py-8">
                    <MdHome className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500 dark:text-gray-400 mb-4">No bookings yet</p>
                    <a
                        href="/properties"
                        className="inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition text-sm"
                    >
                        Browse Properties
                    </a>
                </div>
            ) : (
                <div className="space-y-4 w-full overflow-y-auto">
                    {bookings.map((booking) => {
                        const bookingStatus = getBookingStatus(booking.startDate, booking.endDate);

                        return (
                            <div
                                key={booking.id}
                                className="rounded-lg p-4 hover:shadow-xl cursor-pointer transition-all bg-white dark:bg-gray-700"
                            >
                                <div className="flex gap-4">
                                    <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0">
                                        <Image
                                            src={booking.property.showcaseimage}
                                            alt={booking.property.title}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-start justify-between mb-2">
                                            <h4 className="font-medium text-gray-900 dark:text-white truncate pr-2">
                                                {booking.property.title}
                                            </h4>
                                            <div className="flex gap-2 shrink-0">
                                                <span
                                                    className={`px-2 py-1 rounded-full text-xs ${bookingStatus.color}`}
                                                >
                                                    {bookingStatus.status}
                                                </span>
                                                <span
                                                    className={`px-2 py-1 rounded-full text-xs ${getStatusColor(booking.payment.status)}`}
                                                >
                                                    {booking.payment.status}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                                            <div className="flex items-center gap-1">
                                                <MdLocationOn className="w-3 h-3" />
                                                <span className="truncate">
                                                    {booking.property.address},{" "}
                                                    {booking.property.city},{" "}
                                                    {booking.property.state}{" "}
                                                    {booking.property.postalCode},{" "}
                                                    {booking.property.country}
                                                </span>
                                            </div>

                                            <div className="flex items-center gap-1">
                                                <MdCalendarToday className="w-3 h-3" />
                                                <span>
                                                    {formatDate(booking.startDate)} -{" "}
                                                    {formatDate(booking.endDate)}
                                                </span>
                                            </div>

                                            <div className="flex items-center gap-1">
                                                <MdPerson className="w-3 h-3" />
                                                <span>Host: {booking.property.user.name}</span>
                                            </div>

                                            <div className="flex items-center gap-1">
                                                <MdPayment className="w-3 h-3" />
                                                <span className="font-medium">
                                                    {Number(
                                                        booking.totalPrice / 100
                                                    ).toLocaleString("en-IN")}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                    <button
                        className="flex w-full items-center justify-center text-white bg-blue-500 rounded-xl cursor-pointer duration-200 transform transition-all hover:rounded-4xl hover:bg-blue-600 text-xl font-medium p-2"
                        onClick={() => redirect("/bookings")}
                    >
                        Go Bookings Page
                    </button>
                </div>
            )}
        </div>
    );
};
