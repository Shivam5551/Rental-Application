import Image from "next/image";
import { FaStar } from "react-icons/fa";

interface Review {
    id: string;
    rating: number;
    comment: string;
    user: {
        name: string;
        image: string | null;
    };
}

interface PropertyReviewsProps {
    reviews: Review[];
    totalReviews: number;
}

export function PropertyReviews({ reviews, totalReviews }: PropertyReviewsProps) {
    return (
        <div className="bg-white dark:bg-slate-800 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Reviews ({totalReviews})
            </h2>
            {reviews.length > 0 ? (
                <div className="space-y-4">
                    {reviews.slice(0, 5).map((review) => (
                        <div
                            key={review.id}
                            className="border-b border-gray-200 dark:border-gray-700 pb-4"
                        >
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center">
                                    {review.user.image ? (
                                        <Image
                                            width={40}
                                            height={40}
                                            src={review.user.image}
                                            alt={review.user.name}
                                            className="w-full h-full rounded-full object-cover"
                                        />
                                    ) : (
                                        <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                                            {review.user.name.charAt(0).toUpperCase()}
                                        </span>
                                    )}
                                </div>
                                <div>
                                    <div className="font-medium text-gray-900 dark:text-white">
                                        {review.user.name}
                                    </div>
                                    <div className="flex items-center gap-1">
                                        {[...Array(5)].map((_, i) => (
                                            <FaStar
                                                key={i}
                                                className={`w-3 h-3 ${
                                                    i < review.rating
                                                        ? "text-yellow-400"
                                                        : "text-gray-300"
                                                }`}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <p className="text-gray-600 dark:text-gray-300">{review.comment}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-gray-600 dark:text-gray-300">No reviews yet.</p>
            )}
        </div>
    );
}
