'use client'

import { GoogleContinueButton } from "@/components/googleContinueButton";
import Heading from "@/components/heading";
import { LabelledInputBox } from "@/components/labelledInputBox"
import { ORDIV } from "@/components/orDiv";
import { PasswordInputBox } from "@/components/passwordInputbox"
import { SubmitButton } from "@/components/submitButton";
import WarnHeading from "@/components/warnheading";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useCallback } from "react"

export default function Signup() {
    // const [isSubmitting]
    const router = useRouter();
    const handleSubmit = useCallback(async (formData: FormData)=> {
        console.log(formData);
        
        await new Promise(res => setTimeout(res, 4000));
    }, []);

    return (
        <div className="bg-white flex items-center w-full min-h-screen justify-center dark:bg-black text-black dark:text-white">
            <div className="flex flex-col p-4 sm:p-8 max-w-lg w-full bg-white shadow-md dark:bg-gray-800 rounded-2xl">
                <Heading title="Signup" className="dark:text-white text-black"/>
                <form action={handleSubmit}>
                <LabelledInputBox label="Full Name" placeholder="Enter your full name" type="text"/>
                <LabelledInputBox label="Email" placeholder="Enter your email" type="email"/>
                <PasswordInputBox label="Password" placeholder="Enter a password" type="password"/>
                <PasswordInputBox label="Confirm Password" placeholder="Confirm you password" type="password" />
                <SubmitButton label="Signup"/>
                </form>
                <ORDIV/>
                <GoogleContinueButton onClickHandler={async () => await signIn("google", { callbackUrl: "/"})}/>
                <WarnHeading actionText="Signin" message="Already have an account" onAction={() => { router.push('/signin') }} />
            </div>
        </div>
    )
}