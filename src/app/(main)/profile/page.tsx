import { DashboardCardContainer } from "@/components/dashboardCardContainer";
import { RevenueOverview } from "@/components/RevenueOverview";
import { UpdateProfile } from "@/components/UpdateProfile";
import { WelcomeCard } from "@/components/welcomecard";

export default function Profile(){
    return(
        <div className="min-h-screen flex flex-col lg:flex-row  dark:bg-black bg-white overflow-auto">
            <div className="h-full p-5 w-full lg:w-[60%]">
                <WelcomeCard />
                <DashboardCardContainer />
                <RevenueOverview />
            </div>
            <div className="h-full w-full bg-black lg:w-[40%]">
                <UpdateProfile />
            </div>
        </div>
    )
}