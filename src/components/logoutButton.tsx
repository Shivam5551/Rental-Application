'use client'

import { signOut } from "next-auth/react"

export const LogoutButton = ()=> {
    return (
        <button onClick={() => signOut({ redirect: true, callbackUrl: "/signin"})} className="hover:bg-red-500 mt-2 sm:mt-0 text-white rounded-lg font-semibold bg-red-700 md:px-4 items-center p-1 justify-center w-full transform transition-all hover:rounded-2xl flex cursor-pointer">Logout</button>
    )
}