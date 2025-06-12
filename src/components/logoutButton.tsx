'use client'

import { signOut } from "next-auth/react"

export const LogoutButton = ()=> {
    return (
        <button onClick={() => signOut()} className="hover:bg-red-500 text-white rounded-lg font-semibold bg-red-700 md:px-4 items-center p-1 justify-center w-full flex cursor-pointer">Logout</button>
    )
}