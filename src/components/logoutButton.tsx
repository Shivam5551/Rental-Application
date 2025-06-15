'use client'

import { signOut } from "next-auth/react";
import { IoLogOutOutline } from "react-icons/io5";

export const LogoutButton = ()=> {
    return (
        <button onClick={() => signOut({ redirect: true, callbackUrl: "/signin"})} className="hover:bg-red-500 mt-2 sm:mt-0 text-white rounded-lg font-semibold bg-red-700 md:px-3 items-center p-1 justify-center w-full transform transition-all hover:rounded-2xl flex cursor-pointer"><IoLogOutOutline className="mr-2 -ml-0.5" size={22}/>Logout</button>
    )
}