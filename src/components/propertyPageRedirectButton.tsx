'use client';

import { redirect } from "next/navigation";

export const PropertyPageRedirectButton = () => {

    return (
        <div className="mt-8 text-center">
            <button onClick={ () => redirect('/properties' )} className="inline-flex items-center bg-orange-500 justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-orange-700">
                View All Properties
            </button>
        </div>
    )
}