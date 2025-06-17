'use client'
import axios from "axios";
import { redirect } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";

interface IResult {
    id: string;
    title: string;
}

export const Searchbar = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [result, setResults] = useState<IResult[]>([]);

    useEffect(()=> {
        const element = document.getElementById("searchArea")
        const handleClickOutside = (e: Event) => {
            if(element && !element.contains(e.target as Node)) {
                setResults([]);
            }
        }
        document.addEventListener("click", handleClickOutside);

        return () => document.removeEventListener("click", handleClickOutside);

    }, []);
    
    useEffect(() => {
        async function callApi() {
            try {
                if (searchQuery) {
                    const res = await axios.get(`/api/search?query=${searchQuery}`);
                    if(res.data.result) {
                        setResults(res.data.result);
                    }
                }
            } catch (error) {
                toast.error("Search Api Not responding!")
            }
        }
        const timeout = setTimeout(() => {
            callApi();
        }, 200);

        return () => clearTimeout(timeout);
    }, [searchQuery])

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    }


    return (
        <div id="searchArea" className="md:flex relative hidden w-1/3 items-center text-black">
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
            {result && result.length > 0 ? 
            <div className="absolute top-11 ml-3 flex-col overflow-hidden p-2 rounded-2xl bg-gray-100 z-40 shadow-2xl text-black dark:bg-slate-800/85 dark:text-gray-100 flex space-y-1 w-full">
                {result.map((r) => {
                    return (
                        <div key={r.id} className="w-full dark:hover:text-black rounded-lg hover:bg-gray-200 text-balance border-b border-b-black cursor-pointer px-2 p-1 dark:border-b-white">
                            <button onClick={() => {
                                setResults([])
                                redirect(`/property/details/${r.id}`)
                            }}>
                                {r.title.toUpperCase()}
                            </button>
                        </div>
                    )
                })}
            </div>
            :
            ""    
        }   
        </div>
    )
}