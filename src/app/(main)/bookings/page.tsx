import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";
import { getBookedProperties } from "@/actions/getBookedProperties";
import { EmptyBookingsState } from "@/components/booking/EmptyBookingsState";
import { UnauthorizedAccess } from "@/components/utils/UnauthorizedAccess";
import { BookedPropertiesCard } from "@/components/booked/bookedPropertiesCard";

export default async function BookingsPage() {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.id) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-slate-950">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <UnauthorizedAccess />
                </div>
            </div>
        );
    }

    const bookings = await getBookedProperties();

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-slate-950">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                        My Bookings
                    </h1>
                    <p className="text-gray-600 dark:text-gray-300">
                        View and manage your property reservations
                    </p>
                </div>

                {bookings.length === 0 ? (
                    <EmptyBookingsState />
                ) : (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                            <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-gray-200 dark:border-slate-700">
                                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                    Total Bookings
                                </h3>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                    {bookings.length}
                                </p>
                            </div>

                            <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-gray-200 dark:border-slate-700">
                                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                    Confirmed
                                </h3>
                                <p className="text-2xl font-bold text-green-600">
                                    {
                                        bookings.filter((b) => b.payment.status === "COMPLETED")
                                            .length
                                    }
                                </p>
                            </div>

                            <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-gray-200 dark:border-slate-700">
                                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                    Pending
                                </h3>
                                <p className="text-2xl font-bold text-yellow-600">
                                    {bookings.filter((b) => b.payment.status === "PENDING").length}
                                </p>
                            </div>

                            <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-gray-200 dark:border-slate-700">
                                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                    Completed
                                </h3>
                                <p className="text-2xl font-bold text-blue-600">
                                    {bookings.filter((b) => b.payment.status === "REFUNDED").length}
                                </p>
                            </div>
                        </div>

                        <div className="space-y-6">
                            {bookings.map((booking) => (
                                <BookedPropertiesCard key={booking.id} bookedProperties={booking} />
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
