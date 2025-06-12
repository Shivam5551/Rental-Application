'use server'

import { ReactNode } from "react";
import { DarkModeToggle } from "./darkmodetoggle";
import { Searchbar } from "./searchbar";
import { MenubarToggle } from "./menubartoggle";
import { LoginButton } from "./loginButton";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";
import { LogoutButton } from "./logoutButton";

export const Appbar = async () => {
    const session = await getServerSession(authOptions)
    // console.log(session);
    
    return (
        <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-sm z-50 border-b dark:border-b-neutral-200  dark:bg-black/80 p-3 shadow-md ">
            <div className=" flex px-2 justify-between items-center">
                <div className="text-red-950 dark:text-white font-sans text-2xl font-bold">
                    BookIT
                </div>
                <Searchbar />
                <div className="flex items-center transform duration-500 transition-colors ease-in-out">
                    <div id="menu-toggle" className="md:hidden flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-800 text-black dark:text-white hover:cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-700">
                    <MenubarToggle/>

                    </div>
                    <div id="menubar" className="hidden md:flex flex-col space-y-2 sm:space-y-0 md:flex-row space-x-2 lg:space-x-4 items-center">
                        <NavLink href="/" title="Home" symbol={
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                            </svg>
                        } />
                        <NavLink href="/properties" title="Properties" symbol={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
</svg>

                        } />
                        <NavLink href="/about" title="About" symbol={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
</svg>

                        } />
                        { (session && session.user && session?.user?.id) ? 
                        <div className="flex flex-col md:flex-row space-y-1 md:space-y-0 space-x-2 items-center">
                            <NavLink href="/profile" title="Profile" symbol={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                        </svg>
                        } />
                            <LogoutButton/>
                        </div> : <LoginButton />}
                        
                    </div>
                <DarkModeToggle />
                </div>
            </div>
        </nav>
    );
};

const NavLink = ({ href, title, symbol }: { href: string, title: string, symbol: ReactNode}) => {
    return (
        <a href={href} className="text-black w-full hover:cursor-pointer dark:text-white hover:text-gray-700 dark:hover:text-gray-300">
            <span className="flex items-center md:justify-center">
                {symbol}
                <span className="text-base pl-1 ">{title}</span>
            </span>
        </a>
    );
};
