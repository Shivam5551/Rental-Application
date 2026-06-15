'use client';

import { useSession } from "next-auth/react"
import { useCallback, useEffect, useState } from "react";
import { LabelledInputBox } from "./labelledInputBox";
import { SubmitButton } from "../buttons/submitButton";
import { toast } from "react-toastify";
import axios, { isAxiosError } from "axios";

interface IFormData {
    accountNumber: string | null;
    ifscNumber: string | null;
}


export const BankDetailsCard = () => {
    const { status } = useSession();
    const [updating, setUpdating] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [formData, setFormData] = useState<IFormData>({
        accountNumber: '',
        ifscNumber: '',
    })

    useEffect(() => {
        async function submitRequest() {
            if(formData.accountNumber && formData.ifscNumber) {
                try {
                    const res = await axios.post('/api/update/bank',
                        formData
                    );
                    if(res.data.success) {
                        toast("Bank Details updated successfully");
                        return;
                    }
                } catch (error) {
                    if(isAxiosError(error)){
                        toast.error("Unable to update bank details try again later!");
                    }
                } finally {
                    setFormData({
                        accountNumber: '',
                        ifscNumber: ''
                    });
                    setSubmitting(false);
                    setUpdating(false);
                }
            }
        }
        if(submitting) {
            submitRequest();
        }
    }, [submitting, formData])

    const submitForm = useCallback((formData: FormData) => {
        if(!updating) {
            return;
        }
        const accountNumber = formData.get("Account Number") as string;
        const ifscNumber = formData.get("IFSC number") as string;
        if(!accountNumber || !ifscNumber) {
            toast.error("Please enter both Account Number and IFSC Number");
            return;
        }
        if(accountNumber.length > 18 || accountNumber.length < 8) {
            toast.error("Please Verify account number!");
            return;
        }
        setFormData(c => ({
            ...c,
            accountNumber,
            ifscNumber
        }))
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
        <div className="rounded-2xl flex bg-neutral-100 shadow-lg dark:bg-slate-800 items-center justify-center w-full h-fit p-5 flex-col">
            {!!!updating ? <button onClick={() => setUpdating(true)} className="text-xl p-2 hover:underline hover:text-blue-500 dark:text-white  cursor-pointer">Update Bank Details</button>
                :
                <div className="w-full">
                    <form action={submitForm} className="p-2 w-full space-y-2">
                        <LabelledInputBox labelClassName="dark:text-white text-black" className="dark:text-black text-white dark:bg-white bg-black" placeholder="Enter your account number" type="text" label="Account Number"/>
                        <LabelledInputBox labelClassName="dark:text-white text-black" className="dark:text-black text-white dark:bg-white bg-black" placeholder="Enter your IFSC number" type="text" label="IFSC number" />
                        <SubmitButton label="Update Bank Details"/>
                    </form>
                    <div className="px-2 w-full">
                        <button onClick={() => setUpdating(false)} className="text-white bg-red-600 transform duration-200 transition-all rounded-xl text-lg font-semibold hover:rounded-2xl  hover:bg-red-400 w-full p-2 flex justify-center items-center cursor-pointer">Cancel</button>
                
                    </div>
                </div>
            }
        </div>
    )
}