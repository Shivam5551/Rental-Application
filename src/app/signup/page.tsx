'use client'

import { GoogleContinueButton } from "@/components/googleContinueButton";
import Heading from "@/components/heading";
import { LabelledInputBox } from "@/components/labelledInputBox"
import { ORDIV } from "@/components/orDiv";
import { PasswordInputBox } from "@/components/passwordInputbox"
import { SubmitButton } from "@/components/submitButton";
import WarnHeading from "@/components/warnheading";
import axios from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react"
import { toast } from "react-toastify";

export default function Signup() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formDataState, setFormDataState] = useState({
        email: '',
        password: '',
        name: '',
    })
    const router = useRouter();

    useEffect(()=> {
        async function sendSignupRequest() {
            try {
                const res = await axios.post("/api/signup", formDataState);
                if(res.data.success) {
                    const response = await signIn("credentials", {
                        email: formDataState.email,
                        password: formDataState.password,
                        redirect: false
                    });
                    if(response?.ok) {
                        toast.success("Signup Successful", {
                            autoClose: 4000,
                            draggable: true,
                            pauseOnHover: true,
                            theme: "colored"
                        });
                        router.push('/profile');
                    }
                    else {
                        toast.error("Unable to provide token login required!");
                    }
                }else {
                    toast.error("User already exists!");
                }
            } catch (error) {
                console.log(error);
                toast.error("User already exists!");
            }finally {
                setIsSubmitting(false);
                setFormDataState({
                    email: '',
                    password: '',
                    name: '',
                })
            }
        }
        if(isSubmitting) {
            sendSignupRequest();
        }
    }, [isSubmitting, formDataState]);

    const handleSubmit = useCallback(async (formData: FormData)=> {
        const email = formData.get("Email") as string;
        const password = formData.get("Password") as string;
        const confirmPassword = formData.get("Confirm Password") as string;
        const name = formData.get("Full Name") as string;
        if(password != confirmPassword) {
            toast.error("Password and confirm password must be same!", {
                autoClose: 4000,
                draggable: true,
                pauseOnHover: true,
                theme: "colored"
            })
            return;
        }
        if(email && name && password && confirmPassword) {
            setIsSubmitting(true);
            setFormDataState({
                email,
                password,
                name
            })
        }
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