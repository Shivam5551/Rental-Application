'use client'
import { SessionProvider } from "next-auth/react";
import { ToastContainer,  } from 'react-toastify';

export const NextAuthProvider = ({ children }: Readonly<{
  children: React.ReactNode;
}>) => {
    return (
        <SessionProvider refetchInterval={5*60}>
            {children}
            <ToastContainer />
        </SessionProvider>
    )
}