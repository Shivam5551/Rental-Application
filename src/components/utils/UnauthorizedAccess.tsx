"use client";

import Link from "next/link";
import { FaLock, FaSignInAlt, FaUserPlus, FaShieldAlt } from "react-icons/fa";

export const UnauthorizedAccess = () => {
    return (
        <div className="min-h-[80vh] flex items-center justify-center">
            <div className="text-center max-w-lg mx-auto px-4">
                <div className="relative w-32 h-32 mx-auto mb-8">
                    <div className="w-full h-full bg-linear-to-br from-orange-100 to-red-100 dark:from-orange-700/20 dark:to-red-800/20 rounded-full flex items-center justify-center animate-pulse">
                        <div className="w-20 h-20 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center shadow-lg">
                            <FaLock className="w-8 h-8 text-orange-600 dark:text-orange-400" />
                        </div>
                    </div>
                    <div className="absolute -top-2 -right-2 w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
                        <FaShieldAlt className="w-5 h-5 text-white" />
                    </div>
                </div>

                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                    Authentication Required
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                    Please sign in to access your booking history and manage your reservations
                    securely.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                    <Link href="/api/auth/signin">
                        <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700 transition-all duration-200 transform hover:scale-105 shadow-lg">
                            <FaSignInAlt className="w-4 h-4" />
                            Sign In
                        </button>
                    </Link>

                    <Link href="/signup">
                        <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-white dark:bg-slate-800 text-gray-900 dark:text-white border-2 border-gray-300 dark:border-slate-600 font-semibold rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-all duration-200 shadow-lg">
                            <FaUserPlus className="w-4 h-4" />
                            Create Account
                        </button>
                    </Link>
                </div>

                <div className="bg-linear-to-r from-gray-50 to-blue-50 dark:from-slate-800 dark:to-slate-700 rounded-xl p-6 border border-gray-200 dark:border-slate-600 mb-6">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center justify-center gap-2">
                        <FaShieldAlt className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        Why create an account?
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-600 dark:text-gray-300">
                        <div className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-green-500 rounded-full shrink-0"></div>
                            <span>Track booking history</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-green-500 rounded-full shrink-0"></div>
                            <span>Manage reservations</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-green-500 rounded-full shrink-0"></div>
                            <span>Faster checkout</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-green-500 rounded-full shrink-0"></div>
                            <span>Save favorites</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-green-500 rounded-full shrink-0"></div>
                            <span>Exclusive offers</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-green-500 rounded-full shrink-0"></div>
                            <span>24/7 support</span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-center gap-4">
                    <Link
                        href="/"
                        className="text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 font-medium transition-colors"
                    >
                        ← Back to Home
                    </Link>
                    <span className="text-gray-400">|</span>
                    <Link
                        href="/properties"
                        className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors"
                    >
                        Browse Properties →
                    </Link>
                </div>
            </div>
        </div>
    );
};
