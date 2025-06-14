'use client'
import { ChangeEvent, useState } from "react";

export const Searchbar = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    }

    return (
        <div className="md:flex hidden w-1/3 items-center text-black">
            <label htmlFor="search" className="sr-only">Search</label>
            <div className="relative text-black dark:text-white inset left-10 flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                    <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" clipRule="evenodd" />
                </svg>

            </div>
            <input
                className="h-full w-full rounded-lg text-lg p-1.5 pl-12 bg-gray-200 dark:bg-gray-800 text-black dark:text-white"
                onChange={handleChange}
                type="text"
                value={searchQuery}
                id="search"
                placeholder="Search for properties"
            />
        </div>
    )
}