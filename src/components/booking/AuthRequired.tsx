import { LoginButton } from "@/components/buttons/loginButton";

export function AuthRequired() {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-slate-950 flex items-center justify-center px-4">
            <div className="bg-white dark:bg-slate-800 rounded-lg p-8 max-w-md w-full text-center shadow-lg">
                <div className="mb-6">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-16 w-16 mx-auto text-orange-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        />
                    </svg>
                </div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                    Authentication Required
                </h1>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                    You need to be logged in to make a booking. Please sign in to continue.
                </p>
                <div className="flex items-center justify-center">
                    <LoginButton />
                </div>
            </div>
        </div>
    );
}
