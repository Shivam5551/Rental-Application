import Link from "next/link";

export default function Custom404() {
    return (
        <main className="flex min-h-screen items-center justify-center bg-gray-50 px-6">
            <div className="max-w-lg text-center">
                <h1 className="text-6xl font-bold text-gray-900">404</h1>
                <h2 className="mt-4 text-2xl font-semibold text-gray-800">Listing not found</h2>
                <p className="mt-3 text-gray-600">
                    We couldn&apos;t find the page you were looking for in our rental application.
                </p>

                <div className="mt-6 flex justify-center gap-4">
                    <Link
                        href="/"
                        className="rounded-lg bg-black px-5 py-3 text-white hover:bg-gray-800"
                    >
                        Go Home
                    </Link>
                    <Link
                        href="/properties"
                        className="rounded-lg border border-gray-300 px-5 py-3 text-gray-700 hover:bg-gray-100"
                    >
                        View Rentals
                    </Link>
                </div>
            </div>
        </main>
    );
}
