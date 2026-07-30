"use client";

import { GoogleContinueButton } from "@/components/buttons/googleContinueButton";
import { LabelledInputBox } from "@/components/utils/labelledInputBox";
import Link from "next/link";
import { ORDIV } from "@/components/utils/orDiv";
import { PasswordInputBox } from "@/components/utils/passwordInputbox";
import { SubmitButton } from "@/components/buttons/submitButton";
import WarnHeading from "@/components/utils/warnheading";
import axios, { isAxiosError } from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { IoPersonOutline, IoShieldCheckmarkOutline } from "react-icons/io5";
import { FaEnvelope } from "react-icons/fa";
import { FaPerson } from "react-icons/fa6";

export default function Signup() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formDataState, setFormDataState] = useState({
        email: "",
        password: "",
        name: "",
    });
    const router = useRouter();

    useEffect(() => {
        async function sendSignupRequest() {
            try {
                const res = await axios.post("/api/signup", formDataState);
                if (res.data.success) {
                    const response = await signIn("credentials", {
                        email: formDataState.email,
                        password: formDataState.password,
                        redirect: false,
                    });
                    if (response?.ok) {
                        toast.success("Signup Successful", {
                            autoClose: 4000,
                            draggable: true,
                            pauseOnHover: true,
                            theme: "colored",
                        });
                        router.push("/profile/renter");
                    } else {
                        toast.error("Unable to provide token login required!");
                    }
                } else {
                    toast.error("User already exists!");
                }
            } catch (error) {
                if (isAxiosError(error)) {
                    toast.error("Server not responding");
                    return;
                }
                toast.error("User already exists!");
            } finally {
                setIsSubmitting(false);
                setFormDataState({
                    email: "",
                    password: "",
                    name: "",
                });
            }
        }
        if (isSubmitting) {
            sendSignupRequest();
        }
    }, [isSubmitting, formDataState, router]);

    const handleSubmit = useCallback(async (formData: FormData) => {
        const email = formData.get("Email") as string;
        const password = formData.get("Password") as string;
        const confirmPassword = formData.get("Confirm Password") as string;
        const name = formData.get("Full Name") as string;
        if (password != confirmPassword) {
            toast.error("Password and confirm password must be same!", {
                autoClose: 4000,
                draggable: true,
                pauseOnHover: true,
                theme: "colored",
            });
            return;
        }
        if (password.length < 8 || confirmPassword.length < 8) {
            toast.error("Password must contain 8 characters!");
            return;
        }
        if (email && name && password && confirmPassword) {
            setIsSubmitting(true);
            setFormDataState({
                email,
                password,
                name,
            });
        }
    }, []);

    return (
        <div className="bg-linear-to-br from-orange-50 via-white to-orange-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 flex items-center w-full min-h-screen justify-center p-4">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-orange-300/20 dark:bg-orange-500/10 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-orange-200/20 dark:bg-orange-600/10 rounded-full blur-3xl"></div>
            </div>

            <div className="relative flex flex-col p-8 sm:p-10 max-w-md w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl shadow-2xl dark:shadow-slate-950/50 rounded-3xl border border-gray-200/50 dark:border-slate-800/50">
                <div className="flex justify-center items-center mb-6 gap-2">
                    <div className="p-4 bg-linear-to-br from-orange-500 to-orange-600 dark:from-orange-600 dark:to-orange-500 rounded-2xl shadow-lg shadow-orange-500/30">
                        <IoPersonOutline className="w-8 h-8 text-white" />
                    </div>
                    <Link href="/" className="text-2xl font-bold text-gray-900 dark:text-white">
                        <h1 className="text-2xl font-bold pb-1.5 bg-linear-to-r from-rose-600 to-orange-600 bg-clip-text text-transparent">
                            BookIt
                        </h1>
                    </Link>
                </div>

                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold bg-linear-to-r from-orange-600 to-orange-500 dark:from-orange-400 dark:to-orange-300 bg-clip-text text-transparent mb-2">
                        Create Account
                    </h1>
                    <p className="text-sm text-gray-600 dark:text-slate-400">
                        Join us and start your journey today
                    </p>
                </div>

                <form action={handleSubmit} className="space-y-5">
                    <div className="space-y-2">
                        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-slate-300 mb-1.5">
                            Full Name <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <LabelledInputBox
                                label="Full Name"
                                placeholder="Enter your full name"
                                type="text"
                            >
                                <FaPerson className="w-5 h-5 text-gray-400" />
                            </LabelledInputBox>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-slate-300 mb-1.5">
                            Email <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <LabelledInputBox
                                label="Email"
                                placeholder="Enter your email"
                                type="email"
                            >
                                <FaEnvelope className="w-5 h-5 text-gray-400" />
                            </LabelledInputBox>
                        </div>
                    </div>

                    {/* Password */}
                    <div className="space-y-2">
                        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-slate-300 mb-1.5">
                            Password <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <PasswordInputBox
                                label="Password"
                                placeholder="Enter a password"
                                type="password"
                            />
                        </div>
                    </div>

                    {/* Confirm Password */}
                    <div className="space-y-2">
                        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-slate-300 mb-1.5">
                            Confirm Password <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <IoShieldCheckmarkOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-slate-500 w-5 h-5" />
                            <PasswordInputBox
                                label="Confirm Password"
                                placeholder="Confirm your password"
                                type="password"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-2 px-4 py-2.5 bg-orange-50 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-900/50 rounded-lg">
                        <IoShieldCheckmarkOutline className="w-4 h-4 text-orange-600 dark:text-orange-400 shrink-0" />
                        <p className="text-xs text-orange-700 dark:text-orange-300">
                            Password must contain at least 8 characters
                        </p>
                    </div>

                    <div className="pt-2">
                        <SubmitButton
                            label={isSubmitting ? "Creating Account..." : "Create Account"}
                        />
                    </div>
                </form>

                <div className="my-6">
                    <ORDIV />
                </div>
                <GoogleContinueButton
                    onClickHandler={async () => await signIn("google", { callbackUrl: "/" })}
                />

                <div className="mt-6">
                    <WarnHeading
                        actionText="Sign in"
                        message="Already have an account?"
                        onAction={() => {
                            router.push("/signin");
                        }}
                    />
                </div>

                <p className="text-xs text-center text-gray-500 dark:text-slate-500 mt-6">
                    By signing up, you agree to our{" "}
                    <a
                        href="/about"
                        className="text-orange-600 dark:text-orange-400 hover:underline"
                    >
                        Terms of Service
                    </a>{" "}
                    and{" "}
                    <a
                        href="/about"
                        className="text-orange-600 dark:text-orange-400 hover:underline"
                    >
                        Privacy Policy
                    </a>
                </p>
            </div>
        </div>
    );
}
