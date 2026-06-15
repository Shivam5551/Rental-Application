'use client'

import DashboardImage from '../../assets/dashboard.png';
import { useSession } from "next-auth/react";
import { useState } from "react";
import Image from "next/image";
import Heading from '../utils/heading';
import { DashboardChart } from '../dashboard/dashboardChart';

export interface IRenterWelcomeCard {
    username: string,
    totalBookings: number,
    activeBookings: number,
    completedBookings: number,
    totalSpent: number,
    pendingPayments: number
}

export const RenterWelcomeCard = ({ 
    username, 
    totalBookings, 
    activeBookings, 
    completedBookings, 
    totalSpent,
    pendingPayments 
}: IRenterWelcomeCard) => {
    const { status } = useSession();
    const [data] = useState([
        { name: 'Active', value: activeBookings, color: "#03a9f4" },
        { name: 'Completed Payment', value: completedBookings, color: "#228B22" },
        { name: 'Pending Payment', value: pendingPayments, color: "#FF0800" },
    ]);

    if (status === "unauthenticated") {
        return <div className="w-full h-100 text-4xl">
            Login Required
        </div>
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
        <div className="w-full justify-between h-fit bg-green-100 text-green-900 dark:text-green-100 dark:bg-slate-800 rounded-xl shadow-md p-4 flex">
            <div className="lg:w-[60%] p-2">
                <Heading className="dark:text-orange-200 text-left" title={"Welcome Back, " + username} />
                <span className="dark:text-white text-black text-base sm:text-xl font-light">This is your booking report</span>
                <div className="text-black dark:text-green-200 mt-3 font-semibold text-2xl">
                    Total Bookings: {totalBookings}
                </div>
                <div className="text-black dark:text-green-200 mt-1 font-medium text-lg">
                    Total Spent: {formatCurrency(totalSpent)}
                </div>
                <div className="w-full items-center flex justify-evenly mt-4">
                    <DashboardChart data={data} />
                    <ul className="text-black border-l w-fit flex flex-col h-full dark:text-white px-5">
                        {data.map((entry, index) => {
                            return (
                                <li key={index} className="flex text-nowrap w-fit gap-2 items-center justify-start mb-2">
                                    <ColorLabel color={entry.color} />
                                    {entry.name}: {entry.value}
                                </li>
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
