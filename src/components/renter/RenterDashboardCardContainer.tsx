'use server'
import { DashboardCard } from "../dashboardCard"
import { AiOutlineMessage } from "react-icons/ai"
import { HiOutlineHome } from "react-icons/hi2"
import { LuClipboardList } from "react-icons/lu"
import { MdOutlinePayments, MdOutlineReviews } from "react-icons/md"
import { getRenterDashboardStats } from "@/actions/getRenterDashboardStats"
import { Suspense } from "react"

const RenterDashboardContent = async () => {
    const renterStats = await getRenterDashboardStats();

    if (!renterStats) {
        return (
            <div className="grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-4">
                <DashboardCard heading="Please Login" value={0}>
                    <Icons color="bg-gray-300"><LuClipboardList size={25}/></Icons>
                </DashboardCard>
                <DashboardCard heading="No Data Available" value={0}>
                    <Icons color="bg-gray-300"><AiOutlineMessage size={25}/></Icons>
                </DashboardCard>
                <DashboardCard heading="Login Required" value={0}>
                    <Icons color="bg-gray-300"><HiOutlineHome size={25} /></Icons>
                </DashboardCard>
            </div>
        );
    }

    const formatCurrency = (amount: number) => {
        if (amount >= 100000) {
            return `₹${(amount / 100000).toFixed(1)}L`;
        } else if (amount >= 1000) {
            return `₹${(amount / 1000).toFixed(1)}K`;
        }
        return `₹${amount}`;
    };

    return (
        <div className="grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-4">
            <DashboardCard heading="Active Bookings" value={renterStats.activeBookings}>
                <Icons color="bg-blue-300"><HiOutlineHome size={25}/></Icons>
            </DashboardCard>
            
            <DashboardCard heading="Completed Stays" value={renterStats.completedBookings}>
                <Icons color="bg-green-300"><LuClipboardList size={25}/></Icons>
            </DashboardCard>
            
            <DashboardCard heading="Reviews Given" value={renterStats.reviewsGiven}>
                <Icons color="bg-purple-300"><MdOutlineReviews size={25} /></Icons>
            </DashboardCard>

            {renterStats.totalSpent > 0 && (
                <DashboardCard heading="Total Spent" value={formatCurrency(renterStats.totalSpent/100)}>
                    <Icons color="bg-emerald-300"><MdOutlinePayments size={25}/></Icons>
                </DashboardCard>
            )}

            {renterStats.pendingPayments > 0 && (
                <DashboardCard heading="Pending Payments" value={renterStats.pendingPayments}>
                    <Icons color="bg-red-300"><MdOutlinePayments size={25}/></Icons>
                </DashboardCard>
            )}
        </div>
    );
};

const RenterDashboardLoadingSkeleton = async () => {
    return (
        <div className="grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-4">
            {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-xl shadow-md border p-2 dark:bg-slate-800 animate-pulse">
                    <div className="flex items-center gap-2 p-2">
                        <div className="h-10 w-10 bg-gray-300 rounded-full"></div>
                        <div className="h-6 bg-gray-300 rounded w-32"></div>
                    </div>
                    <div className="ml-2 flex items-center justify-between">
                        <div className="h-10 bg-gray-300 rounded w-16"></div>
                        <div className="h-12 bg-gray-300 rounded w-8 mr-2"></div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export const RenterDashboardCardContainer = async () => {
    return (
        <Suspense fallback={<RenterDashboardLoadingSkeleton />}>
            <RenterDashboardContent />
        </Suspense>
    );
};

export const Icons = async ({ children, color }: {children: React.ReactNode, color: string}) => {
    return (
        <div className={`${color} p-2 h-10 w-10 rounded-full flex items-center justify-center`}>
            {children}
        </div>
    )
}
