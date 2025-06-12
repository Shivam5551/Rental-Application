'use client'
import { SessionProvider } from "next-auth/react"

export const NextAuthProvider = ({ children }: Readonly<{
  children: React.ReactNode;
}>) => {
    return (
        <SessionProvider>
            {children}
        </SessionProvider>
    )
}