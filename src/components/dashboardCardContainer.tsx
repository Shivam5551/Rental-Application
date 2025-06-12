import { DashboardCard } from "./dashboardCard"
import { AiOutlineMessage } from "react-icons/ai"
import { HiOutlineWrenchScrewdriver } from "react-icons/hi2"
import { LuClipboardList } from "react-icons/lu"

export const DashboardCardContainer = ()=> {
    return (
        <div className="grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-4">
            <DashboardCard heading="New Applicants" value={13}><Icons color="bg-green-300"><LuClipboardList size={25}/></Icons></DashboardCard>
            <DashboardCard heading="Enquiry Messages" value={100}><Icons color="bg-blue-300"><AiOutlineMessage size={35}/></Icons></DashboardCard>
            <DashboardCard heading="Maintenance Request" value={20}><Icons color="bg-yellow-200"><HiOutlineWrenchScrewdriver size={35} /></Icons></DashboardCard>
        </div>
    )
}

export const Icons = ({ children, color }: {children: React.ReactNode, color: string}) => {
    return (
        <div className={`${color} p-2 h-10 w-10 rounded-full flex items-center justify-center`}>
            {children}
        </div>
    )
}