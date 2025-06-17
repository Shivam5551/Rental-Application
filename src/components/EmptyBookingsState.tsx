'use client';

import Link from 'next/link';
import { FaCalendarAlt, FaSearch, FaHome, FaHeart } from 'react-icons/fa';

export const EmptyBookingsState = () => {
    return (
        <div className="min-h-[60vh] flex items-center justify-center">
            <div className="text-center max-w-md mx-auto px-4">
                <div className="w-32 h-32 mx-auto mb-8 relative">
                    <div className="w-full h-full bg-gradient-to-br from-orange-100 to-orange-200 dark:from-orange-900/20 dark:to-orange-800/20 rounded-full flex items-center justify-center">
                        <div className="w-20 h-20 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center shadow-lg">
                            <FaCalendarAlt className="w-8 h-8 text-orange-600 dark:text-orange-400" />
                        </div>
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                        <FaHome className="w-4 h-4 text-white" />
                    </div>
                    <div className="absolute -bottom-2 -left-2 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                        <FaHeart className="w-4 h-4 text-white" />
                    </div>
                </div>

                <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                    No Bookings Yet
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed text-lg">
                    Your adventure awaits! Discover amazing properties and create unforgettable memories.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                    <Link href="/properties">
                        <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700 transition-all duration-200 transform hover:scale-105 shadow-lg">
                            <FaSearch className="w-4 h-4" />
                            Explore Properties
                        </button>
                    </Link>
                    
                    <Link href="/properties?verified=true">
                        <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 bg-white dark:bg-slate-800 text-gray-900 dark:text-white border-2 border-gray-300 dark:border-slate-600 font-semibold rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-all duration-200 shadow-lg">
                            <FaHome className="w-4 h-4" />
                            Featured Places
                        </button>
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                    <div className="text-center">
                        <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mx-auto mb-2">
                            <FaSearch className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Easy Search</p>
                    </div>
                    
                    <div className="text-center">
                        <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mx-auto mb-2">
                            <FaCalendarAlt className="w-5 h-5 text-green-600 dark:text-green-400" />
                        </div>
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Instant Booking</p>
                    </div>
                    
                    <div className="text-center">
                        <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mx-auto mb-2">
                            <FaHeart className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                        </div>
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Great Experiences</p>
                    </div>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
                    <h4 className="font-semibold text-blue-900 dark:text-blue-300 mb-2">
                        How it works
                    </h4>
                    <div className="flex items-center justify-center space-x-2 text-sm text-blue-800 dark:text-blue-300">
                        <span>Browse</span>
                        <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                        <span>Select dates</span>
                        <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                        <span>Book instantly</span>
                        <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                        <span>Enjoy</span>
                    </div>
                </div>
            </div>
        </div>
    );
};