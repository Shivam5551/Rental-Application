import { Appbar } from "@/components/utils/appbar";
import { Footer } from "@/components/utils/footer";
import "../globals.css";
import { NextAuthProvider } from "../NextAuthProvider";

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <NextAuthProvider>
            <div className="min-h-screen flex flex-col">
                <div className="h-16 bg-white dark:bg-black/80">
                    <Appbar />
                </div>
                <main className="flex-1">{children}</main>
                <Footer />
            </div>
        </NextAuthProvider>
    );
}
