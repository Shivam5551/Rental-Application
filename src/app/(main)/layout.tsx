import { Appbar } from "@/components/appbar";
import '../globals.css';
import { NextAuthProvider } from "../NextAuthProvider";


export default async function RootLayout({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <NextAuthProvider>
            <div className="h-16"><Appbar /></div>
            {children}
        </NextAuthProvider>
    )
}