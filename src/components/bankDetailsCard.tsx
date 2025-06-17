'use client';

import { useSession } from "next-auth/react"
import { useCallback, useEffect, useState } from "react";
import { LabelledInputBox } from "./labelledInputBox";
import { SubmitButton } from "./submitButton";
import { toast } from "react-toastify";

export const BankDetailsCard = () => {
    const { data: session, status } = useSession();
    const [updating, setUpdating] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        if(submitting) {
            
        }
    }, [submitting])

    const submitForm = useCallback((formData: FormData) => {
        if(!updating) {
            return;
        }
        const accoutNumber = formData.get("Account Number");
        const ifscNumber = formData.get("IFSC number");
        if(!accoutNumber || !ifscNumber) {
            toast.error("Please enter both Account Number and IFSC Number");
            return;
        }
        setSubmitting(true);
    }, [updating])

    if(status === "loading") {
        return (
            <div className="min-w-screen bg-white dark:bg-slate-700 min-h-screen flex justify-center items-center flex-col">
                <div className="h-20 w-20 rounded-full border-b-2 border-blue-600 animate-spin"/>
                <div className="text-gray-700 dark:text-gray-100 text-balance sm:text-2xl ">Authenticating...</div>
            </div>
        )
    }
    if(status === "unauthenticated") {
        return null;
    }
    return (
        <div className="rounded-2xl flex items-center justify-center w-full h-fit p-5 flex-col">
            {!!!updating ? <button onClick={() => setUpdating(true)} className="text-xl p-2 hover:underline cursor-pointer">Update Bank Details</button>
                :
                <form action={submitForm} className="p-2">
                    <LabelledInputBox placeholder="Enter your account number" type="text" label="Account Number"/>
                    <LabelledInputBox placeholder="Enter your IFSC number" type="text" label="IFSC number" />
                    <SubmitButton label="Update Bank Details"/>
                </form>
            }
        </div>
    )
}