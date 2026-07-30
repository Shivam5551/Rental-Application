"use client";

export const BookingsLoading = () => {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-slate-950">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8">
                    <div className="h-8 w-48 bg-gray-200 dark:bg-slate-700 rounded-lg animate-pulse mb-2"></div>
                    <div className="h-4 w-64 bg-gray-200 dark:bg-slate-700 rounded animate-pulse"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    {[...Array(4)].map((_, i) => (
                        <div
                            key={i}
                            className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-gray-200 dark:border-slate-700 animate-pulse"
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="h-4 w-20 bg-gray-200 dark:bg-slate-700 rounded mb-2"></div>
                                    <div className="h-8 w-12 bg-gray-200 dark:bg-slate-700 rounded"></div>
                                </div>
                                <div className="w-12 h-12 bg-gray-200 dark:bg-slate-700 rounded-lg"></div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="space-y-6">
                    {[...Array(3)].map((_, i) => (
                        <div
                            key={i}
                            className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-gray-200 dark:border-slate-700 animate-pulse"
                        >
                            <div className="md:flex">
                                <div className="md:w-1/3">
                                    <div className="w-full h-48 md:h-full bg-gray-200 dark:bg-slate-700"></div>
                                </div>

                                <div className="md:w-2/3 p-6">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="flex-1">
                                            <div className="h-6 w-3/4 bg-gray-200 dark:bg-slate-700 rounded mb-2"></div>
                                            <div className="h-4 w-1/2 bg-gray-200 dark:bg-slate-700 rounded mb-3"></div>
                                        </div>
                                        <div className="text-right ml-4">
                                            <div className="h-8 w-24 bg-gray-200 dark:bg-slate-700 rounded mb-1"></div>
                                            <div className="h-4 w-20 bg-gray-200 dark:bg-slate-700 rounded"></div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-6 mb-4">
                                        {[...Array(3)].map((_, j) => (
                                            <div
                                                key={j}
                                                className="h-4 w-16 bg-gray-200 dark:bg-slate-700 rounded"
                                            ></div>
                                        ))}
                                    </div>

                                    <div className="bg-gray-50 dark:bg-slate-700 rounded-lg p-4 mb-4">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {[...Array(2)].map((_, j) => (
                                                <div key={j} className="flex items-center gap-3">
                                                    <div className="w-10 h-10 bg-gray-200 dark:bg-slate-600 rounded-lg"></div>
                                                    <div>
                                                        <div className="h-3 w-16 bg-gray-200 dark:bg-slate-600 rounded mb-1"></div>
                                                        <div className="h-4 w-20 bg-gray-200 dark:bg-slate-600 rounded"></div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-gray-200 dark:bg-slate-700 rounded-full"></div>
                                            <div>
                                                <div className="h-4 w-20 bg-gray-200 dark:bg-slate-700 rounded mb-1"></div>
                                                <div className="h-3 w-12 bg-gray-200 dark:bg-slate-700 rounded"></div>
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <div className="h-10 w-24 bg-gray-200 dark:bg-slate-700 rounded-lg"></div>
                                            <div className="h-10 w-24 bg-gray-200 dark:bg-slate-700 rounded-lg"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
