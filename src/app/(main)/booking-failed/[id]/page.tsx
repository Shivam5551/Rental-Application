"use server";

import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Failed({
    params,
}: {
    params: Promise<{
        id: string;
    }>;
}) {
    const session = await getServerSession(authOptions);
    if (!session || !session.user.id) {
        redirect("/");
    }
    const resolvedParams = await params;
    const id = resolvedParams.id;

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 text-center">
                <div className="mb-6">
                    <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                        <svg
                            className="w-8 h-8 text-red-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Payment Failed</h1>
                    <p className="text-gray-600">
                        Unfortunately, your payment could not be processed.
                    </p>
                    <p className="text-gray-600">
                        Try booking the property in other dates or contact support if the issue
                        persists.
                    </p>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                    <p className="text-sm text-gray-500 mb-1">Order ID</p>
                    <p className="font-mono text-sm text-gray-900">{id}</p>
                </div>
                <div className="w-full">
                    <Link
                        className="p-2 w-full flex items-center justify-center font-semibold text-white bg-orange-500 hover:bg-orange-600 rounded-xl cursor-pointer"
                        href="/properties"
                    >
                        Search More Properties
                    </Link>
                </div>
            </div>
        </div>
    );
}
