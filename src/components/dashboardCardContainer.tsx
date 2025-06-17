import { DashboardCard } from "./dashboardCard"
import { AiOutlineMessage } from "react-icons/ai"
import { HiOutlineWrenchScrewdriver } from "react-icons/hi2"
import { LuClipboardList } from "react-icons/lu"
import { MdOutlinePayments} from "react-icons/md"
import { getDashboardStats, getPropertyOwnerStats } from "@/actions/getDashboardStats"
import { Suspense } from "react"

const DashboardContent = async () => {
    const [dashboardStats, propertyStats] = await Promise.all([
        getDashboardStats(),
        getPropertyOwnerStats()
    ]);

    if (!dashboardStats || !propertyStats) {
        return (
            <div className="grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-4">
                <DashboardCard heading="Please Login" value={0}>
                    <Icons color="bg-gray-300"><LuClipboardList size={25}/></Icons>
                </DashboardCard>
                <DashboardCard heading="No Data Available" value={0}>
                    <Icons color="bg-gray-300"><AiOutlineMessage size={25}/></Icons>
                </DashboardCard>
                <DashboardCard heading="Login Required" value={0}>
                    <Icons color="bg-gray-300"><HiOutlineWrenchScrewdriver size={25} /></Icons>
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
            <DashboardCard heading="Unverified Props" value={dashboardStats.unverifiedProperties}>
                <Icons color="bg-orange-300"><LuClipboardList size={25}/></Icons>
            </DashboardCard>
            
            <DashboardCard heading="Enquiry Messages" value={dashboardStats.enquiryMessages}>
                <Icons color="bg-blue-300"><AiOutlineMessage size={25}/></Icons>
            </DashboardCard>
            
            <DashboardCard heading="Booked Properties" value={dashboardStats.bookedProperties}>
                <Icons color="bg-green-300"><HiOutlineWrenchScrewdriver size={25} /></Icons>
            </DashboardCard>


            {dashboardStats.totalRevenue > 0 && (
                <DashboardCard heading="Total Revenue" value={formatCurrency(dashboardStats.totalRevenue)}>
                    <Icons color="bg-emerald-300"><MdOutlinePayments size={25}/></Icons>
                </DashboardCard>
            )}

            {dashboardStats.pendingPayments > 0 && (
                <DashboardCard heading="Pending Payments" value={dashboardStats.pendingPayments}>
                    <Icons color="bg-yellow-300"><MdOutlinePayments size={25}/></Icons>
                </DashboardCard>
            )}

        </div>
    );
};

const DashboardLoadingSkeleton = () => {
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

export const DashboardCardContainer = () => {
    return (
        <Suspense fallback={<DashboardLoadingSkeleton />}>
            <DashboardContent />
        </Suspense>
    );
};

export const Icons = ({ children, color }: {children: React.ReactNode, color: string}) => {
    return (
        <div className={`${color} p-2 h-10 w-10 rounded-full flex items-center justify-center`}>
            {children}
        </div>
    )
}