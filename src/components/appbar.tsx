'use server'

import { ReactNode } from "react";
import { DarkModeToggle } from "./darkmodetoggle";
import { Searchbar } from "./searchbar";
import { MenubarToggle } from "./menubartoggle";
import { LoginButton } from "./loginButton";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";
import { LogoutButton } from "./logoutButton";
import { LuNotebookTabs } from "react-icons/lu";
import { IoHomeOutline } from "react-icons/io5";
import { MdOutlineRateReview } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { GoInfo } from "react-icons/go";
import { CiGlobe } from "react-icons/ci";

export const Appbar = async () => {
    const session = await getServerSession(authOptions);
    // console.log(session);

    return (
        <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-sm z-50 border-b dark:border-b-neutral-200  dark:bg-black/80 p-3 shadow-md ">
            <div className=" flex px-2 justify-between items-center">
                <div className="text-red-950 hover:cursor-pointer transition-all transform duration-200 hover:text-red-800 dark:hover:text-neutral-200 dark:text-white font-sans text-2xl font-bold">
                    BookIT
                </div>
                <Searchbar />
                <div className="flex items-center transform duration-500 transition-colors ease-in-out">
                    <div id="menu-toggle" className="xl:hidden flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-800 text-black dark:text-white hover:cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-700">
                        <MenubarToggle />

                    </div>
                    <div id="menubar" className="hidden xl:flex flex-col space-y-2 sm:space-y-0 xl:flex-row items-center">
                        <NavLink href="/" title="Home" symbol={<IoHomeOutline  size={22}/>} />
                        <NavLink href="/properties" title="Properties" symbol={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>

                        } />
                        <NavLink title="Rent" href="/property/rent" symbol={<CiGlobe size={22}/>}
                        />
                        <NavLink href="/about" title="About" symbol={<GoInfo size={22} />} />
                        {
                            !!session && !!session.user && !!session.user.id &&
                            <NavLink href="/bookings" title="My Bookings" symbol={<LuNotebookTabs className="font-extralight" size={22}/>} />
                        }
                        {(session && session.user && session?.user?.id) ?
                            
                            <div className="flex flex-col xl:flex-row xl:space-x-1 space-y-1 xl:space-y-0  items-center">
                                <NavLink href="/reviews/user" title="My Reviews" symbol={<MdOutlineRateReview size={22}/>} />
                                <NavLink href="/profile" title="Profile" symbol={<CgProfile size={22}/>} />
                                
                                <LogoutButton />
                            </div> : <LoginButton />}

                    </div>
                    <DarkModeToggle />
                </div>
            </div>
        </nav>
    );
};

const NavLink = ({ href, title, symbol }: { href: string, title: string, symbol: ReactNode }) => {
    return (
        <a href={href} className="text-black hover:outline w-full p-2 rounded-2xl hover:cursor-pointer dark:text-white hover:text-gray-700 dark:hover:text-gray-300">
            <span className="flex items-center xl:justify-center">
                {symbol}
                <span className="text-base pl-1 inline-block text-nowrap">{title}</span>
            </span>
        </a>
    );
};
