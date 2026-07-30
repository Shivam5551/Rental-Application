"use server";
import { RentPropertyForm } from "@/components/rent/RentPropertyForm";
import { UnauthorizedAccess } from "@/components/utils/UnauthorizedAccess";
import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";

export default async function RentPropertyPage() {
    const session = await getServerSession(authOptions);
    if (!session) {
        return (
            <div className="py-10 dark:bg-black bg-white">
                <UnauthorizedAccess />
            </div>
        );
    }
    return (
        <div className="min-h-screen bg-linear-to-b from-gray-50 to-gray-100 dark:from-[#1e1f22] dark:to-[#131416]">
            <div className="bg-white dark:bg-[#2b2d31] rounded-2xl shadow-xl ring-1 ring-black/5 dark:ring-white/5 overflow-hidden">
                <RentPropertyForm />
            </div>
        </div>
    );
}
