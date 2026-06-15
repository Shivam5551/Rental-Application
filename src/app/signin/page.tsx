'use client'

import { GoogleContinueButton } from "@/components/buttons/googleContinueButton";
import Heading from "@/components/utils/heading";
import { LabelledInputBox } from "@/components/utils/labelledInputBox";
import { ORDIV } from "@/components/utils/orDiv";
import { PasswordInputBox } from "@/components/utils/passwordInputbox";
import { SubHeading } from "@/components/utils/subHeading";
import { SubmitButton } from "@/components/buttons/submitButton";
import WarnHeading from "@/components/utils/warnheading";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function Signin() {
    const router = useRouter();

    const signin = async (formData: FormData) => {
        const email = formData.get("Email")
        const password = formData.get("Password");
        if(String(password).length < 8) {
            toast.error("Short Password!");
            return;
        }
        if (email && password && String(password).length >= 8) {
            const res = await signIn("credentials", {
                email,
                password,
                redirect: false
            });
            if (res?.ok) {
                toast("Login Successful!")
                router.push('/');
            }
            else {
                router.push('/signin?error=invalid');
                toast.error("Invalid Credentials")
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