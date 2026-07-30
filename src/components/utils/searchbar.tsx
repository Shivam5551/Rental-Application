"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState, useRef, KeyboardEvent } from "react";
import { toast } from "react-toastify";
import {
    IoSearchOutline,
    IoCloseCircle,
    IoLocationOutline,
    IoTrendingUpOutline,
} from "react-icons/io5";

interface IResult {
    id: string;
    title: string;
    city?: string;
    state?: string;
}

export const Searchbar = () => {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState("");
    const [result, setResults] = useState<IResult[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState(-1);
    const inputRef = useRef<HTMLInputElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setIsOpen(false);
                setActiveIndex(-1);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        async function callApi() {
            if (!searchQuery.trim()) {
                setResults([]);
                setIsLoading(false);
                setIsOpen(false);
                return;
            }

            try {
                setIsLoading(true);
                const res = await axios.get(`/api/search?query=${encodeURIComponent(searchQuery)}`);
                if (res.data.result) {
                    setResults(res.data.result);
                    setIsOpen(true);
                } else {
                    setResults([]);
                }
            } catch (error) {
                console.error("Search Error:", error);
                toast.error("Search failed. Please try again.");
                setResults([]);
            } finally {
                setIsLoading(false);
            }
        }

        const timeout = setTimeout(() => {
            callApi();
        }, 300);

        return () => clearTimeout(timeout);
    }, [searchQuery]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
        setActiveIndex(-1);
    };

    const handleClear = () => {
        setSearchQuery("");
        setResults([]);
        setIsOpen(false);
        setActiveIndex(-1);
        inputRef.current?.focus();
    };

    const handleSelect = (id: string) => {
        setSearchQuery("");
        setResults([]);
        setIsOpen(false);
        setActiveIndex(-1);
        router.push(`/property/details/${id}`);
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (!isOpen || result.length === 0) return;

        switch (e.key) {
            case "ArrowDown":
                e.preventDefault();
                setActiveIndex((prev) => Math.min(prev + 1, result.length - 1));
                break;
            case "ArrowUp":
                e.preventDefault();
                setActiveIndex((prev) => Math.max(prev - 1, -1));
                break;
            case "Enter":
                e.preventDefault();
                if (activeIndex >= 0 && activeIndex < result.length) {
                    handleSelect(result[activeIndex].id);
                }
                break;
            case "Escape":
                setIsOpen(false);
                setActiveIndex(-1);
                inputRef.current?.blur();
                break;
        }
    };

    // Highlight matching text
    const highlightMatch = (text: string, query: string) => {
        if (!query.trim()) return text;

        const parts = text.split(new RegExp(`(${query})`, "gi"));
        return (
            <span>
                {parts.map((part, index) =>
                    part.toLowerCase() === query.toLowerCase() ? (
                        <mark
                            key={index}
                            className="bg-orange-200 dark:bg-orange-900/50 text-orange-900 dark:text-orange-200 font-semibold"
                        >
                            {part}
                        </mark>
                    ) : (
                        <span key={index}>{part}</span>
                    )
                )}
            </span>
        );
    };

    return (
        <div ref={containerRef} className="md:flex relative hidden w-full max-w-2xl">
            <label htmlFor="search" className="sr-only">
                Search for properties
            </label>

            {/* Search Input Container */}
            <div className="relative w-full group">
                {/* Search Icon */}
                <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none z-10">
                    <IoSearchOutline
                        className={`w-5 h-5 transition-colors ${
                            searchQuery
                                ? "text-orange-500 dark:text-orange-400"
                                : "text-gray-400 dark:text-slate-500"
                        }`}
                    />
                </div>

                {/* Input Field */}
                <input
                    ref={inputRef}
                    className="h-12 w-full rounded-xl text-sm pl-12 pr-12
                               bg-white dark:bg-slate-800
                               border-2 border-gray-200 dark:border-slate-700
                               text-gray-900 dark:text-slate-100
                               placeholder:text-gray-400 dark:placeholder:text-slate-500
                               focus:outline-none focus:ring-2 focus:ring-orange-500 dark:focus:ring-orange-400 
                               focus:border-transparent
                               hover:border-gray-300 dark:hover:border-slate-600
                               transition-all duration-200
                               shadow-sm hover:shadow-md focus:shadow-lg"
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    type="text"
                    value={searchQuery}
                    id="search"
                    placeholder="Search by property name, city, or location..."
                    autoComplete="off"
                />

                {/* Loading Spinner / Clear Button */}
                <div className="absolute right-4 top-1/2 -translate-y-1/2">
                    {isLoading ? (
                        <div className="animate-spin">
                            <svg
                                className="w-5 h-5 text-orange-500 dark:text-orange-400"
                                viewBox="0 0 24 24"
                                fill="none"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                />
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8v8z"
                                />
                            </svg>
                        </div>
                    ) : searchQuery ? (
                        <button
                            onClick={handleClear}
                            className="text-gray-400 dark:text-slate-500 hover:text-gray-600 dark:hover:text-slate-300 transition-colors"
                            aria-label="Clear search"
                        >
                            <IoCloseCircle className="w-5 h-5" />
                        </button>
                    ) : null}
                </div>
            </div>

            {/* Results Dropdown */}
            {isOpen && (
                <div
                    className="absolute top-14 left-0 w-full bg-white dark:bg-slate-800 
                                rounded-xl shadow-2xl border border-gray-200 dark:border-slate-700
                                backdrop-blur-xl overflow-hidden z-50
                                animate-in fade-in slide-in-from-top-2 duration-200"
                >
                    {/* Results Header */}
                    {result.length > 0 && (
                        <div className="px-4 py-2 border-b border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900/50">
                            <div className="flex items-center gap-2 text-xs font-medium text-gray-600 dark:text-slate-400">
                                <IoTrendingUpOutline className="w-4 h-4" />
                                {result.length} {result.length === 1 ? "property" : "properties"}{" "}
                                found
                            </div>
                        </div>
                    )}

                    {/* Results List */}
                    <div className="max-h-96 overflow-y-auto overscroll-contain">
                        {result.length > 0 ? (
                            <ul className="py-2">
                                {result.map((item, index) => (
                                    <li key={item.id}>
                                        <button
                                            onClick={() => handleSelect(item.id)}
                                            onMouseEnter={() => setActiveIndex(index)}
                                            className={`w-full text-left px-4 py-3 transition-all duration-150
                                                        flex items-start gap-3 group
                                                        ${
                                                            index === activeIndex
                                                                ? "bg-orange-50 dark:bg-orange-950/30 border-l-4 border-orange-500 dark:border-orange-400"
                                                                : "hover:bg-gray-50 dark:hover:bg-slate-750 border-l-4 border-transparent"
                                                        }`}
                                        >
                                            <div
                                                className={`p-2 rounded-lg transition-colors ${
                                                    index === activeIndex
                                                        ? "bg-orange-100 dark:bg-orange-900/30"
                                                        : "bg-gray-100 dark:bg-slate-700 group-hover:bg-gray-200 dark:group-hover:bg-slate-600"
                                                }`}
                                            >
                                                <IoLocationOutline
                                                    className={`w-5 h-5 ${
                                                        index === activeIndex
                                                            ? "text-orange-600 dark:text-orange-400"
                                                            : "text-gray-500 dark:text-slate-400"
                                                    }`}
                                                />
                                            </div>

                                            <div className="flex-1 min-w-0">
                                                <div className="font-medium text-gray-900 dark:text-slate-100 line-clamp-1">
                                                    {highlightMatch(item.title, searchQuery)}
                                                </div>
                                                {(item.city || item.state) && (
                                                    <div className="text-xs text-gray-500 dark:text-slate-400 mt-0.5 flex items-center gap-1">
                                                        <span>{item.city}</span>
                                                        {item.city && item.state && <span>•</span>}
                                                        <span>{item.state}</span>
                                                    </div>
                                                )}
                                            </div>

                                            {index === activeIndex && (
                                                <div className="flex items-center text-xs text-orange-600 dark:text-orange-400 font-medium">
                                                    <kbd className="px-2 py-1 bg-white dark:bg-slate-700 rounded border border-gray-300 dark:border-slate-600">
                                                        ↵
                                                    </kbd>
                                                </div>
                                            )}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        ) : searchQuery.trim() && !isLoading ? (
                            // Empty State
                            <div className="px-4 py-8 text-center">
                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-slate-700 mb-3">
                                    <IoSearchOutline className="w-8 h-8 text-gray-400 dark:text-slate-500" />
                                </div>
                                <p className="text-sm font-medium text-gray-900 dark:text-slate-100 mb-1">
                                    No properties found
                                </p>
                                <p className="text-xs text-gray-500 dark:text-slate-400">
                                    Try searching with different keywords
                                </p>
                            </div>
                        ) : null}
                    </div>

                    {/* Keyboard Shortcuts Helper */}
                    {result.length > 0 && (
                        <div className="px-4 py-2 border-t border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900/50">
                            <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-slate-400">
                                <span className="flex items-center gap-1">
                                    <kbd className="px-1.5 py-0.5 bg-white dark:bg-slate-700 rounded border border-gray-300 dark:border-slate-600 font-mono text-[10px]">
                                        ↑↓
                                    </kbd>
                                    Navigate
                                </span>
                                <span className="flex items-center gap-1">
                                    <kbd className="px-1.5 py-0.5 bg-white dark:bg-slate-700 rounded border border-gray-300 dark:border-slate-600 font-mono text-[10px]">
                                        ↵
                                    </kbd>
                                    Select
                                </span>
                                <span className="flex items-center gap-1">
                                    <kbd className="px-1.5 py-0.5 bg-white dark:bg-slate-700 rounded border border-gray-300 dark:border-slate-600 font-mono text-[10px]">
                                        Esc
                                    </kbd>
                                    Close
                                </span>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};
