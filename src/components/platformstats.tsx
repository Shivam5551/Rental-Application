import prisma from "@/utils/prismaClient";

export const PlatformStats = async () => {

    const stats = await Promise.all([
        prisma.property.count(),
        prisma.user.count(),
        prisma.booking.count(),
        prisma.review.count()
    ]);

    const [totalProperties, totalUsers, totalBookings, totalReviews] = stats;
    return (
        <section className="py-16 bg-gray-50 dark:bg-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
                        Platform Statistics
                    </h2>
                </div>
                <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                    <div className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-md">
                        <div className="flex items-center justify-center h-12 w-12 rounded-full bg-orange-500 text-white mx-auto mb-4">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M3 10h4v11H3zM17 10h4v11h-4zM10 3h4v4h-4z"
                                />
                            </svg>
                        </div>
                        <div className="text-3xl font-bold text-center text-gray-900 dark:text-white">
                            {totalProperties}
                        </div>
                        <div className="text-sm text-center text-gray-500 dark:text-gray-400">
                            Total Properties
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-md">
                        <div className="flex items-center justify-center h-12 w-12 rounded-full bg-orange-500 text-white mx-auto mb-4">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M3 10h4v11H3zM17 10h4v11h-4zM10 3h4v4h-4z"
                                />
                            </svg>
                        </div>
                        <div className="text-3xl font-bold text-center text-gray-900 dark:text-white">
                            {totalUsers}
                        </div>
                        <div className="text-sm text-center text-gray-500 dark:text-gray-400">
                            Total Users
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-md">
                        <div className="flex items-center justify-center h-12 w-12 rounded-full bg-orange-500 text-white mx-auto mb-4">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M3 10h4v11H3zM17 10h4v11h-4zM10 3h4v4h-4z"
                                />
                            </svg>
                        </div>
                        <div className="text-3xl font-bold text-center text-gray-900 dark:text-white">
                            {totalBookings}
                        </div>
                        <div className="text-sm text-center text-gray-500 dark:text-gray-400">
                            Total Bookings
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-md">
                        <div className="flex items-center justify-center h-12 w-12 rounded-full bg-orange-500 text-white mx-auto mb-4">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M3 10h4v11H3zM17 10h4v11h-4zM10 3h4v4h-4z"
                                />
                            </svg>
                        </div>
                        <div className="text-3xl font-bold text-center text-gray-900 dark:text-white">
                            {totalReviews}
                        </div>
                        <div className="text-sm text-center text-gray-500 dark:text-gray-400">
                            Total Reviews
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}