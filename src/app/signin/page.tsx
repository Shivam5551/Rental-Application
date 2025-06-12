'use client'

import { GoogleContinueButton } from "@/components/googleContinueButton";
import Heading from "@/components/heading";
import { LabelledInputBox } from "@/components/labelledInputBox";
import { ORDIV } from "@/components/orDiv";
import { PasswordInputBox } from "@/components/passwordInputbox";
import { SubHeading } from "@/components/subHeading";
import { SubmitButton } from "@/components/submitButton";
import WarnHeading from "@/components/warnheading";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Signin() {
    const router = useRouter();

    const signin = async (formData: FormData) => {
        const email = formData.get("Email")
        const password = formData.get("Password");
        // await new Promise(res => setTimeout(res, 5000));
        if (email && password && String(password).length > 8) {
            const res = await signIn("credentials", {
                email,
                password,
                redirect: false
            });
            if (res?.ok) {
                router.push('/')
            }
            else {
                router.push('/signin?error=invalid');
            }
        }
    }
    return (
        <div className="bg-black flex justify-center items-center min-h-screen text-white p-2 sm:p-0">
            <div className="flex flex-col shadow-2xl rounded-3xl bg-white w-full max-w-lg p-4 sm:px-8 overflow-auto">
                <Heading title="Login" />
                <SubHeading className="text-center" title="Welcome, Please Signin to Continue" />
                <form action={signin} className="flex flex-col bg-white w-full max-w-md mx-auto gap-1 ">
                    <LabelledInputBox label="Email" type="Email" placeholder="Enter your Email" />
                    <PasswordInputBox label="Password" type="Password" placeholder="Enter your Password" />
                    <SubmitButton label="Login with Email" />
                </form>
                <ORDIV/>
                <GoogleContinueButton onClickHandler={async () => await signIn("google", { callbackUrl: "/"})}/>
                <WarnHeading actionText="Signup Now" message="Don't have account?" onAction={() => { router.push('/signup') }} />
            </div>
        </div>
    )
}