'use client'

import { useState } from "react"
import { InputBox } from "./labelledInputBox"
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa";

export const PasswordInputBox = ({ label, type, placeholder }: InputBox)=> {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div id="passwordInputBox" className="flex relative flex-col w-full mb-3">
            <label className="text-black font-semibold text-xl md:text-2xl mb-0.5" htmlFor={label}>{label}</label>
            <input required type={!showPassword ? type : 'text'} className="focus:rounded-2xl  text-gray-600 text-base sm:text-xl font-medium p-2 focus:outline-0 focus:border-2 border rounded-md w-full" aria-label={label} id={label} name={label} placeholder={placeholder}/>
            <button onClick={() => setShowPassword(!showPassword)} aria-label="show password button" type="button" className="text-black items-center justify-center mb-0.5 right-2 text-3xl absolute flex sm:h-10 h-7 w-7 bottom-1 sm:bottom-0.5 sm:w-10">{!!!showPassword ? <FaRegEye/> : <FaRegEyeSlash/> }</button>
        </div>
    )
}