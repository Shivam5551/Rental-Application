import Link from "next/link";

export default function NotFound() {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-slate-900 flex items-center justify-center">
            <div className="text-center">
                <div className="mb-6">
                    <svg
                        className="h-16 w-16 text-gray-400 mx-auto"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            fillRule="evenodd"
                            d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
                            clipRule="evenodd"
                        />
                    </svg>
                </div>

                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                    Booking Not Found
                </h1>

                <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-md mx-auto">
                    The booking you&apos;re looking for doesn&apos;t exist or you don&apos;t have
                    permission to view it.
                </p>

                <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
                    <Link
                        href="/bookings"
                        className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
                    >
                        View My Bookings
                    </Link>
                    <Link
                        href="/"
                        className="inline-block bg-gray-600 hover:bg-gray-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
                    >
                        Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
}
