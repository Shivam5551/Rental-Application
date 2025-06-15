import { getBookedProperties } from "@/actions/getBookedProperties";
import { BookedPropertiesCard } from "@/components/bookedPropertiesCard";
import { EmptyBookingsState } from "@/components/EmptyBookingsState";
import { UnauthorizedAccess } from "@/components/UnauthorizedAccess";
import { authOptions } from "@/utils/authOptions";
import { IBookedProperties } from "@/utils/interfaces";
import { getServerSession } from "next-auth";
import { FaCalendarCheck, FaClock, FaCheckCircle, FaHourglass } from 'react-icons/fa';

export default async function Booked(){
    const session = await getServerSession(authOptions);
    
    // Check if user is authenticated
    if(!session || !session.user) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-slate-950">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <UnauthorizedAccess />
                </div>
            </div>
        );
    }

    // Fetch user's bookings
    const bookedProperties: IBookedProperties[] | null = await getBookedProperties();
    
    // Show empty state if no bookings
    if(!bookedProperties || bookedProperties.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-slate-950">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                            My Bookings
                        </h1>
                        <p className="text-gray-600 dark:text-gray-300">
                            View and manage your property reservations
                        </p>
                    </div>
                    <EmptyBookingsState />
                </div>
            </div>
        );
    }

    // Calculate booking statistics
    const currentDate = new Date();
    const upcomingBookings = bookedProperties.filter(booking => new Date(booking.startDate) > currentDate);
    const ongoingBookings = bookedProperties.filter(booking => 
        new Date(booking.startDate) <= currentDate && new Date(booking.endDate) >= currentDate
    );
    const completedBookings = bookedProperties.filter(booking => new Date(booking.endDate) < currentDate);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-slate-950">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                        My Bookings
                    </h1>
                    <p className="text-gray-600 dark:text-gray-300">
                        View and manage your property reservations
                    </p>
                </div>

                {/* Statistics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-gray-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Total Bookings</h3>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">{bookedProperties.length}</p>
                            </div>
                            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                                <FaCalendarCheck className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                            </div>
                        </div>
                    </div>
                    
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-gray-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Upcoming</h3>
                                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{upcomingBookings.length}</p>
                            </div>
                            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                                <FaClock className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                            </div>
                        </div>
                    </div>
                    
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-gray-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Ongoing</h3>
                                <p className="text-2xl font-bold text-green-600 dark:text-green-400">{ongoingBookings.length}</p>
                            </div>
                            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                                <FaHourglass className="w-6 h-6 text-green-600 dark:text-green-400" />
                            </div>
                        </div>
                    </div>
                    
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-gray-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Completed</h3>
                                <p className="text-2xl font-bold text-gray-600 dark:text-gray-400">{completedBookings.length}</p>
                            </div>
                            <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                                <FaCheckCircle className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bookings List */}
                <div className="space-y-6">
                    {/* Ongoing Bookings */}
                    {ongoingBookings.length > 0 && (
                        <div>
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                <FaHourglass className="w-5 h-5 text-green-600 dark:text-green-400" />
                                Current Stays ({ongoingBookings.length})
                            </h2>
                            <div className="space-y-4">
                                {ongoingBookings.map((booking) => (
                                    <BookedPropertiesCard key={booking.id} bookedProperties={booking} />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Upcoming Bookings */}
                    {upcomingBookings.length > 0 && (
                        <div>
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                <FaClock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                Upcoming Trips ({upcomingBookings.length})
                            </h2>
                            <div className="space-y-4">
                                {upcomingBookings.map((booking) => (
                                    <BookedPropertiesCard key={booking.id} bookedProperties={booking} />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Completed Bookings */}
                    {completedBookings.length > 0 && (
                        <div>
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                <FaCheckCircle className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                                Past Stays ({completedBookings.length})
                            </h2>
                            <div className="space-y-4">
                                {completedBookings.map((booking) => (
                                    <BookedPropertiesCard key={booking.id} bookedProperties={booking} />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>    
    );
} 