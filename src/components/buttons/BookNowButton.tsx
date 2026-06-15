'use client';

import { useRouter } from "next/navigation"

export const BookNowButton = ({ id }: { id: string}) => {
    const router = useRouter();
    return (
        <button onClick={()=> router.push(`/property/book/${id}`)} className="w-full cursor-pointer bg-orange-600 hover:bg-orange-700 text-white py-3 px-4 rounded-lg font-semibold transition-colors mb-4">
                Book Now
              </button>
    )
}