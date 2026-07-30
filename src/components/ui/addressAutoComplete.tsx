"use client";

import { useEffect, useReducer, useRef } from "react";
import { IoSearchOutline, IoLocationOutline } from "react-icons/io5";
import { GeoResult } from "@/utils/address";

const inputCls = `
  w-full px-3 py-2.5 text-sm rounded-lg border 
  border-gray-300 dark:border-slate-700
  bg-white dark:bg-slate-800 
  text-gray-900 dark:text-slate-100 
  placeholder:text-gray-400 dark:placeholder:text-slate-500
  focus:outline-none focus:ring-2 focus:ring-orange-500 dark:focus:ring-orange-400 focus:border-transparent
  transition-colors
`.trim();

interface State {
    query: string;
    suggestions: GeoResult[];
    loading: boolean;
    open: boolean;
    activeIndex: number;
}

type Action =
    | { type: "SET_QUERY"; payload: string }
    | { type: "FETCH_START" }
    | { type: "FETCH_SUCCESS"; payload: GeoResult[] }
    | { type: "FETCH_ERROR" }
    | { type: "CLEAR_SUGGESTIONS" }
    | { type: "SELECT_SUGGESTION"; payload: string }
    | { type: "SET_ACTIVE_INDEX"; payload: number }
    | { type: "MOVE_ACTIVE_INDEX"; payload: "up" | "down" }
    | { type: "OPEN_DROPDOWN" }
    | { type: "CLOSE_DROPDOWN" };

function reducer(state: State, action: Action): State {
    switch (action.type) {
        case "SET_QUERY":
            return { ...state, query: action.payload };

        case "FETCH_START":
            return { ...state, loading: true };

        case "FETCH_SUCCESS":
            return {
                ...state,
                loading: false,
                suggestions: action.payload,
                open: true,
                activeIndex: -1,
            };

        case "FETCH_ERROR":
            return { ...state, loading: false };

        case "CLEAR_SUGGESTIONS":
            return { ...state, suggestions: [], loading: false, open: false };

        case "SELECT_SUGGESTION":
            return {
                ...state,
                query: action.payload,
                open: false,
                activeIndex: -1,
            };

        case "SET_ACTIVE_INDEX":
            return { ...state, activeIndex: action.payload };

        case "MOVE_ACTIVE_INDEX": {
            const max = state.suggestions.length - 1;
            const next =
                action.payload === "down"
                    ? Math.min(state.activeIndex + 1, max)
                    : Math.max(state.activeIndex - 1, 0);
            return { ...state, activeIndex: next };
        }

        case "OPEN_DROPDOWN":
            return { ...state, open: true };

        case "CLOSE_DROPDOWN":
            return { ...state, open: false, activeIndex: -1 };

        default:
            return state;
    }
}

interface AddressAutocompleteProps {
    initialValue: string;
    onSelect: (result: GeoResult) => void;
    onManualChange: (value: string) => void;
}

export function AddressAutocomplete({
    initialValue,
    onSelect,
    onManualChange,
}: AddressAutocompleteProps) {
    const [state, dispatch] = useReducer(reducer, {
        query: initialValue,
        suggestions: [],
        loading: false,
        open: false,
        activeIndex: -1,
    });

    const containerRef = useRef<HTMLDivElement>(null);

    // ── Debounced fetch ──────────────────────────────────────────────────────
    useEffect(() => {
        if (state.query.trim().length < 3) {
            dispatch({ type: "CLEAR_SUGGESTIONS" });
            return;
        }

        const controller = new AbortController();
        dispatch({ type: "FETCH_START" });

        const timeout = setTimeout(async () => {
            try {
                const res = await fetch(`/api/geocode?q=${encodeURIComponent(state.query)}`, {
                    signal: controller.signal,
                });
                const data = await res.json();
                dispatch({
                    type: "FETCH_SUCCESS",
                    payload: Array.isArray(data) ? data : [],
                });
            } catch (err) {
                if ((err as Error).name !== "AbortError") {
                    dispatch({ type: "FETCH_ERROR" });
                }
            }
        }, 400);

        return () => {
            clearTimeout(timeout);
            controller.abort();
        };
    }, [state.query]);

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                dispatch({ type: "CLOSE_DROPDOWN" });
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleQueryChange = (value: string) => {
        dispatch({ type: "SET_QUERY", payload: value });
        onManualChange(value);
    };

    const selectSuggestion = (s: GeoResult) => {
        dispatch({ type: "SELECT_SUGGESTION", payload: s.display_name });
        onSelect(s);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (!state.open || state.suggestions.length === 0) return;

        if (e.key === "ArrowDown") {
            e.preventDefault();
            dispatch({ type: "MOVE_ACTIVE_INDEX", payload: "down" });
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            dispatch({ type: "MOVE_ACTIVE_INDEX", payload: "up" });
        } else if (e.key === "Enter") {
            e.preventDefault();
            if (state.activeIndex >= 0) {
                selectSuggestion(state.suggestions[state.activeIndex]);
            }
        } else if (e.key === "Escape") {
            dispatch({ type: "CLOSE_DROPDOWN" });
        }
    };

    return (
        <div ref={containerRef} className="relative">
            <div className="relative">
                <IoSearchOutline
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-slate-400 pointer-events-none"
                />
                <input
                    type="text"
                    value={state.query}
                    onChange={(e) => handleQueryChange(e.target.value)}
                    onFocus={() =>
                        state.suggestions.length > 0 && dispatch({ type: "OPEN_DROPDOWN" })
                    }
                    onKeyDown={handleKeyDown}
                    placeholder="Start typing your address — e.g. 221B Baker Street, London"
                    className={`${inputCls} pl-9 pr-9`}
                    autoComplete="off"
                />
                {state.loading && (
                    <svg
                        className="animate-spin h-4 w-4 text-gray-500 dark:text-slate-400 absolute right-3 top-1/2 -translate-y-1/2"
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
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                )}
            </div>

            {state.open && state.suggestions.length > 0 && (
                <ul className="absolute z-30 mt-1.5 w-full max-h-64 overflow-y-auto rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-xl">
                    {state.suggestions.map((s, i) => (
                        <li key={s.place_id}>
                            <button
                                type="button"
                                onClick={() => selectSuggestion(s)}
                                onMouseEnter={() =>
                                    dispatch({ type: "SET_ACTIVE_INDEX", payload: i })
                                }
                                className={`w-full text-left px-3 py-2.5 text-sm flex items-start gap-2 transition-colors
                  ${
                      i === state.activeIndex
                          ? "bg-orange-50 dark:bg-slate-700 text-gray-900 dark:text-slate-100"
                          : "text-gray-700 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-750"
                  }`}
                            >
                                <IoLocationOutline
                                    size={15}
                                    className="mt-0.5 text-orange-500 dark:text-orange-400 shrink-0"
                                />
                                <span className="line-clamp-2">{s.display_name}</span>
                            </button>
                        </li>
                    ))}
                </ul>
            )}

            {state.open &&
                !state.loading &&
                state.query.trim().length >= 3 &&
                state.suggestions.length === 0 && (
                    <div className="absolute z-30 mt-1.5 w-full rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-3 text-xs text-gray-500 dark:text-slate-400">
                        No matches found. Try a different search or fill in the fields manually
                        below.
                    </div>
                )}
        </div>
    );
}
