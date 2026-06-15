'use client'
import { useRouter } from "next/navigation";
import { useCallback } from "react"

 
export const Buttons = ({ propertyId }: { propertyId: string}) => {
    const router = useRouter();
    
    const handleBookNow = useCallback((e: React.MouseEvent) => {
        e.stopPropagation();
        router.push(`/property/book/${propertyId}`)
    }, [router, propertyId]);

    const handleViewDetailsClick = useCallback((e: React.MouseEvent) => {
        e.stopPropagation();
        router.push(`/property/details/${propertyId}`)
    }, [router, propertyId]);

    return (
        <div className='flex items-center gap-2 mt-2 justify-evenly'>
            <button 
                onClick={handleBookNow}
                className="px-4 py-2 cursor-pointer hover:shadow-md w-full bg-orange-600 text-white text-sm rounded-lg hover:bg-orange-700 transition-colors"
            >
                Book Now
            </button>
            <button 
                onClick={handleViewDetailsClick}
                className="px-4 py-2 cursor-pointer bg-blue-600 hover:shadow-md w-full text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
            >
                View Details
            </button>
        </div>
    )
}