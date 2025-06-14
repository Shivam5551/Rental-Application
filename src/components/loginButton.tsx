'use client'
import { useRouter } from "next/navigation"

export const LoginButton = ()=> {
    const router = useRouter();
    return <button onClick={()=> router.push('/signin')} className="flex bg-blue-500 cursor-pointer hover:bg-blue-700 text-white justify-center items-center font-semibold transform transition-all duration-200 hover:rounded-2xl rounded-md sm:px-4.5 p-1.5">Login</button>
}