import { getServerSession } from "next-auth"
import Heading from "./heading"
import { authOptions } from "@/utils/authOptions";
import DashboardImage from '../assets/dashboard.png';
import Image from "next/image";
import { DashboardChart } from "./dashboardChart";

const data = [
    { name: 'Vaccant', value: 10, color: "#ba68c8" },
    { name: 'Occupied', value: 5, color: "#03a9f4" },
    { name: 'Unverified', value: 20, color: "#FF0800" },
    { name: 'Verified', value: 15, color: "#228B22" }
];

export const WelcomeCard = async () => {
    const session = await getServerSession(authOptions);
    // console.log(session)
    if (!session) {
        return <div className="w-full h-100 text-4xl">
            Login Required
        </div>
    }

    let totalProperties: number = 0;

    data.forEach((e) => totalProperties += e.value);

    return (
        <div className="w-full justify-between h-fit bg-red-100 text-blue-900 dark:text-blue-100 dark:bg-slate-800 rounded-xl shadow-md p-4 flex">
            <div className="lg:w-[60%] p-2">
                <Heading className="dark:text-orange-200 text-left" title={"Welcome Back, " + (session.user.name ? session.user.name : "Undefined")} />
                <span className="dark:text-white text-black text-base sm:text-xl font-light">This is your property report</span>
                <div className="text-black dark:text-blue-200 mt-3 font-semibold text-2xl">Total Property Listed: {totalProperties}</div>
                <div className=" w-full items-center flex justify-evenly">
                    <DashboardChart data={data} />
                    <ul className="text-black border-l h-full dark:text-white px-5">
                        {data.map((entry, index) => {
                            return (
                                <li key={index} className="flex gap-2 items-center justify-start"><ColorLable color={entry.color} />{entry.name}</li>
                            )
                        })}
                    </ul>
                </div>
            </div>
            <div className="md:flex hidden justify-center items-baseline-last">
                <Image
                    priority
                    className="h-50 md:h-70 w-90 lg:w-100"
                    width={100}
                    height={100}
                    src={DashboardImage}
                    alt="dashboard Image"
                />
            </div>
        </div>
    )
}


const ColorLable = ({ color }: { color: string }) => {
    return (
        <div className="w-3 h-3"
            style={{ backgroundColor: color }}
            aria-label={`Color label for ${color}`}
        >
        </div>
    )
}