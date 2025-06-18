import { getUserDetails } from "@/actions/getUserDeatails";
import { BankDetailsCard } from "@/components/bankDetailsCard";
import { DashboardCardContainer } from "@/components/dashboardCardContainer";
import { RevenueOverview } from "@/components/RevenueOverview";
import { UpdateProfile } from "@/components/UpdateProfile";
import { UserPropertiesCard } from "@/components/UserPropertiesCard";
import { IWelcomeCard, WelcomeCard } from "@/components/welcomecard";
import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { FaAngleDoubleRight } from "react-icons/fa";

export default async function LandlordProfile() {
    const session = await getServerSession(authOptions);
    if (!session) {
        return <div>
            Signin First
        </div>
    }
    const userDetails: IWelcomeCard | null = await getUserDetails();
    if (!userDetails) {
        return (
            <div>
                No user Details found
            </div>
        )
    }

    return (

        <div className="flex dark:bg-black flex-col lg:flex-row flex-1">
            <div className="h-full p-5 w-full lg:w-[60%]">
                <div className="flex w-full p-2 mb-2 shadow-xl font-semibold bg-red-600 text-white hover:bg-red-500 rounded-xl">
                    <Link className="flex w-full items-center gap-2" href={'/profile/renter'}>
                        Go to Renter Dashboard
                        <FaAngleDoubleRight />
                    </Link>
                </div>
                <WelcomeCard username={userDetails.username} verified={userDetails.verified} vacant={userDetails.vacant} totalProperty={userDetails.totalProperty} booked={userDetails.booked} unverified={userDetails.unverified} />
                <DashboardCardContainer />
                <RevenueOverview />
            </div>
            <div className="h-full p-5 space-y-4 w-full lg:w-[40%]">
                <UpdateProfile />
                <BankDetailsCard />
                <UserPropertiesCard />
            </div>
        </div>
    )
}