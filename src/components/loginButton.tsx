'use client'
import { useRouter } from "next/navigation"

export const LoginButton = ()=> {
    const router = useRouter();
    return <button onClick={()=> router.push('/signin')} className="flex bg-blue-500 hover:bg-blue-700 text-white justify-center items-center rounded-md sm:px-4 p-1">Login</button>
}