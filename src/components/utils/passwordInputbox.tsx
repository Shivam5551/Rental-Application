"use client";

import { useState } from "react";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { PiPassword } from "react-icons/pi";

interface PasswordInputBoxProps {
    label: string;
    placeholder: string;
    type: string;
}

export function PasswordInputBox({ label, placeholder }: PasswordInputBoxProps) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="relative">
            <PiPassword className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-slate-500" />
            <input
                name={label}
                type={showPassword ? "text" : "password"}
                placeholder={placeholder}
                required
                className="w-full pl-10 pr-12 py-3 text-sm rounded-xl border border-gray-300 dark:border-slate-700
                   bg-white text-gray-900 
                   placeholder:text-gray-400 dark:placeholder:text-slate-500
                   focus:outline-none focus:ring-2 focus:ring-orange-500 dark:focus:ring-orange-400 
                   focus:border-transparent
                   transition-all duration-200
                   hover:border-gray-400 dark:hover:border-slate-600"
            />
            <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-slate-500 hover:text-gray-600 dark:hover:text-slate-300 transition-colors"
            >
                {showPassword ? (
                    <IoEyeOffOutline className="w-5 h-5" />
                ) : (
                    <IoEyeOutline className="w-5 h-5" />
                )}
            </button>
        </div>
    );
}
