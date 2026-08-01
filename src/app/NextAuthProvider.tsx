"use client";
import { SessionProvider } from "next-auth/react";
import { ToastContainer } from "react-toastify";
import { SessionWatcher } from "./SessionWatcher";

export const NextAuthProvider = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <SessionProvider refetchInterval={5 * 60} refetchOnWindowFocus={true}>
            <SessionWatcher />
            {children}
            <ToastContainer />
        </SessionProvider>
    );
};
