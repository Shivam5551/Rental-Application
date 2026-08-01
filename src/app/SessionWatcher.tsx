"use client";
import { useSession, signOut } from "next-auth/react";
import { useEffect, useRef } from "react";
import { toast } from "react-toastify";

export const SessionWatcher = () => {
    const { data: session, status } = useSession();
    const hasWarnedRef = useRef(false);

    useEffect(() => {
        if (status !== "authenticated") return;

        if (session?.error === "RefreshError" && !hasWarnedRef.current) {
            hasWarnedRef.current = true;
            toast.error("Your session has expired. Please sign in again.");
            signOut({ callbackUrl: "/signin" });
        }
    }, [session, status]);

    return null;
};
