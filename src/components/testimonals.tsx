import { FaStar, FaStarHalf } from "react-icons/fa";

interface CardDetails {
    name: string
    rating: number
    thought: string
    type: string
}

function PrintStar(rating: number) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.5;
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
        stars.push(<FaStar key={i} className="text-amber-300 mr-1" />);
    }
    if (hasHalfStar) {
        stars.push(<FaStarHalf key="half" className="text-amber-300 mr-1" />);
    }
    return stars;
}

export const TestimonialCard = ({ cardDetails }: { cardDetails: CardDetails }) => {
    return (
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 shadow-sm">
            <div className="flex justify-between items-center mb-4">
                <div className="text-amber-500 flex">
                    {PrintStar(cardDetails.rating)}
                </div>
                <div className="w-14 h-14 rounded-full bg-black dark:bg-gray-700 flex items-center justify-center">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-8 h-8 text-white dark:text-gray-200"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2" fill="none" />
                        <path
                            d="M4 20c0-3.3137 3.134-6 7-6s7 2.6863 7 6"
                            stroke="currentColor"
                            strokeWidth="2"
                            fill="none"
                            strokeLinecap="round"
                        />
                    </svg>
                </div>
            </div>
            <blockquote className="text-gray-700 dark:text-gray-300 mb-4">
                {cardDetails.thought}
            </blockquote>
            <div className="flex items-center">
                <div className="font-medium text-gray-900 dark:text-white">{cardDetails.name}</div>
                <div className="text-gray-500 dark:text-gray-400 ml-2 text-sm">{cardDetails.type}</div>
            </div>
        </div>
    )
}