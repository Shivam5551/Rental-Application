'use client'

import Heading from "./heading"
import DashboardImage from '../assets/dashboard.png';
import { DashboardChart } from "./dashboardChart";
import { useSession } from "next-auth/react";
import { useState } from "react";
import Image from "next/image";

export interface IWelcomeCard {
    username: string,
    unverified: number,
    vacant: number,
    totalProperty: number,
    booked: number,
    verified: number
}

export const WelcomeCard = ({ username, unverified, vacant, totalProperty, booked, verified }: IWelcomeCard) => {
    const { status } = useSession();
    const [data] = useState(
        [
            { name: 'Vacant', value: vacant, color: "#ba68c8" },
            { name: 'Occupied', value: booked, color: "#03a9f4" },
            { name: 'Unverified', value: unverified, color: "#FF0800" },
            { name: 'Verified', value: verified, color: "#228B22" }
        ]
    )
    // console.log(session)
    if (status === "unauthenticated") {
        return <div className="w-full h-100 text-4xl">
            Login Required
        </div>
    }
    

    return (
        <div className="w-full justify-between h-fit bg-red-100 text-blue-900 dark:text-blue-100 dark:bg-slate-800 rounded-xl shadow-md p-4 flex">
            <div className="lg:w-[60%] p-2">
                <Heading className="dark:text-orange-200 text-left" title={"Welcome Back, " + (username)} />
                <span className="dark:text-white text-black text-base sm:text-xl font-light">This is your property report</span>
                <div className="text-black dark:text-blue-200 mt-3 font-semibold text-2xl">Total Property Listed: {totalProperty}</div>
                <div className=" w-full items-center flex justify-evenly">
                    <DashboardChart data={data} />
                    <ul className="text-black border-l h-full dark:text-white px-5">
                        {data.map((entry, index) => {
                            return (
                                <li key={index} className="flex gap-2 items-center justify-start"><ColorLabel color={entry.color} />{entry.name}</li>
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
                    src={DashboardImage.src}
                    alt="dashboard Image"
                />
            </div>
        </div>
    )
}


const ColorLabel = ({ color }: { color: string }) => {
    return (
        <div className="w-3 h-3"
            style={{ backgroundColor: color }}
            aria-label={`Color label for ${color}`}
        >
        </div>
    )
}