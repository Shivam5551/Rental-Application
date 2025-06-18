import { getBookedProperties } from "@/actions/getBookedProperties";
import { getRenterWelcomeCardData } from "@/actions/getRenterDashboardStats";
import { PropertiesContainer } from "@/components/PropertiesContainer";
import { PopularProperties } from "@/components/renter/PopularProperties";
import { RenterBookingsCard } from "@/components/renter/RenterBookingsCard";
import { RenterDashboardCardContainer } from "@/components/renter/RenterDashboardCardContainer";
import { RenterWelcomeCard } from "@/components/renter/RenterWelcomeCard";
import { UpdateProfile } from "@/components/UpdateProfile";
import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { FaAngleDoubleRight } from "react-icons/fa";

export default async function RenterProfile(){
    const session = await getServerSession(authOptions);
    if(!session || !session.user.id) {
        return (
            <div>
                Sign in required
            </div>
        )
    }
    const data = await getRenterWelcomeCardData();
    if(!data) {
        return (
            <div>
                No data Found
            </div>
        )
    }
    const bookings = await getBookedProperties();

    return (
        <div className="flex dark:bg-black flex-col lg:flex-row flex-1">
            <div className="h-full p-5 w-full lg:w-[60%]">
                <div className="flex w-full p-2 mb-2 shadow-xl font-semibold bg-red-600 text-white hover:bg-red-500 rounded-xl">
                    <Link className="flex w-full items-center gap-2" href={'/profile/landlord'}>
                        Go to Landlord Dashboard
                        <FaAngleDoubleRight />
                    </Link>
                </div>
                 <RenterWelcomeCard
                username={data?.username || "User"}
                totalBookings={data?.totalBookings || 0}
                activeBookings={data?.activeBookings || 0}
                completedBookings={data?.completedBookings || 0}
                totalSpent={data?.totalSpent/100 || 0}
                pendingPayments={data?.pendingPayments || 0}
            />  
            <RenterDashboardCardContainer />
            <PopularProperties />
            </div>
            <div className="h-full p-5 space-y-4 w-full lg:w-[40%]">
                <UpdateProfile />
                <RenterBookingsCard bookings={bookings} />
            </div>
        </div>
    )
}