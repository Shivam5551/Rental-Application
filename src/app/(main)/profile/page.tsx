import { getUserDetails } from "@/actions/getUserDeatails";
import { DashboardCardContainer } from "@/components/dashboardCardContainer";
import { RevenueOverview } from "@/components/RevenueOverview";
import { UpdateProfile } from "@/components/UpdateProfile";
import { UserPropertiesCard } from "@/components/UserPropertiesCard";
import { IWelcomeCard, WelcomeCard } from "@/components/welcomecard";
import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";

export default async function Profile(){
    const session = await getServerSession(authOptions);
    if(!session) {
        return <div>
            Signin First
        </div> 
    }
    const userDetails : IWelcomeCard | null = await getUserDetails();

    if(!userDetails?.totalProperty) {
        return (
            <div className="flex flex-col min-h-screen items-center justify-center h-96 bg-gray-100 dark:bg-gray-900 border-b dark:border-b-white shadow-md">
                <svg className="w-16 h-16 text-gray-400 mb-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 21m5.25-4l.75 4m-8.25-8.25V7.5a2.25 2.25 0 012.25-2.25h7.5A2.25 2.25 0 0120.25 7.5v5.25m-16.5 0V7.5A4.5 4.5 0 018.25 3h7.5A4.5 4.5 0 0120.25 7.5v5.25m-16.5 0h16.5" />
                </svg>
                <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-2">No Properties Listed</h2>
                <p className="text-gray-500 dark:text-gray-400 mb-4 text-center">
                    You haven&apos;t listed any properties for rent yet.<br />Start by adding your first property!
                </p>
                <a
                    href="/property/rent"
                    className="inline-block px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                >
                    Rent Property
                </a>
            </div>
        )
    }
    return(
        <div className="min-h-screen flex flex-col lg:flex-row  dark:bg-black bg-white overflow-auto">
            <div className="h-full p-5 w-full lg:w-[60%]">
                <WelcomeCard username={userDetails.username} verified={userDetails.verified} vacant={userDetails.vacant} totalProperty={userDetails.totalProperty} booked={userDetails.booked} unverified={userDetails.unverified}/>
                <DashboardCardContainer />
                <RevenueOverview />
            </div>
            <div className="h-full p-5 space-y-4 w-full lg:w-[40%]">
                <UpdateProfile session={session} />
                <UserPropertiesCard />
            </div>
        </div>
    )
}