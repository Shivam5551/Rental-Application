"use client";

import { GoogleContinueButton } from "@/components/buttons/googleContinueButton";
import { LabelledInputBox } from "@/components/utils/labelledInputBox";
import { ORDIV } from "@/components/utils/orDiv";
import { PasswordInputBox } from "@/components/utils/passwordInputbox";
import { SubmitButton } from "@/components/buttons/submitButton";
import WarnHeading from "@/components/utils/warnheading";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { FaEnvelope, FaHome } from "react-icons/fa";
import { MdMeetingRoom } from "react-icons/md";
import Link from "next/link";

export default function Signin() {
    const router = useRouter();

    const signin = async (formData: FormData) => {
        const email = formData.get("Email");
        const password = formData.get("Password");
        if (String(password).length < 8) {
            toast.error("Short Password!");
            return;
        }
        if (email && password && String(password).length >= 8) {
            const res = await signIn("credentials", {
                email,
                password,
                redirect: false,
            });
            if (res?.ok) {
                toast("Login Successful!");
                router.push("/");
            } else {
                router.push("/signin?error=invalid");
                toast.error("Invalid Credentials");
            }
        }
    };

    return (
        <div className="min-h-screen bg-linear-to-br from-rose-50 via-white to-orange-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
            <div className="relative w-full max-w-md">
                <div className="text-center h-12 mb-3 flex justify-center items-center gap-2">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-linear-to-br from-rose-500 to-orange-500 rounded-2xl mb-4 shadow-lg">
                        <MdMeetingRoom className="w-6 h-6 text-white" />
                    </div>
                    <Link href="/" className="text-2xl font-bold text-gray-900 dark:text-white">
                        <h1 className="text-2xl font-bold pb-2.5 bg-linear-to-r from-rose-600 to-orange-600 bg-clip-text text-transparent">
                            BookIt
                        </h1>
                    </Link>
                </div>

                <div className="bg-white text-center rounded-3xl shadow-2xl shadow-rose-100/50 p-8 backdrop-blur-lg border border-gray-100">
                    <div className="mb-3">
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome back</h2>
                        <p className="text-gray-600 text-sm">Sign in to continue your journey</p>
                    </div>

                    <form action={signin} className="space-y-5">
                        <LabelledInputBox label="Email" type="Email" placeholder="Enter your email">
                            <FaEnvelope className="w-5 h-5 text-gray-400" />
                        </LabelledInputBox>

                        <PasswordInputBox
                            label="Password"
                            type="Password"
                            placeholder="Enter your password"
                        />

                        <SubmitButton label="Sign In" />
                    </form>

                    <div className="my-6">
                        <ORDIV />
                    </div>

                    <GoogleContinueButton
                        onClickHandler={async () => await signIn("google", { callbackUrl: "/" })}
                    />
                    <div className="mt-6">
                        <WarnHeading
                            actionText="Sign up now"
                            message="Don't have an account?"
                            onAction={() => {
                                router.push("/signup");
                            }}
                        />
                    </div>
                </div>

                <p className="text-center text-sm text-gray-600 mt-6">
                    By continuing, you agree to BookIt&apos;s{" "}
                    <a href="/about" className="text-rose-600 hover:text-rose-700 font-medium">
                        Terms of Service
                    </a>{" "}
                    and{" "}
                    <a href="/about" className="text-rose-600 hover:text-rose-700 font-medium">
                        Privacy Policy
                    </a>
                </p>
            </div>
        </div>
    );
}
