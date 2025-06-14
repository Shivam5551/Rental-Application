import { ReviewWithDetails } from "@/actions/getAllReviews";
import Image from "next/image";
import Link from "next/link";

interface ReviewCardProps {
  review: ReviewWithDetails;
  showProperty?: boolean;
}

export default function ReviewCard({ review, showProperty = true }: ReviewCardProps) {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(new Date(date));
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        className={`text-lg ${
          i < rating ? 'text-yellow-400' : 'text-gray-300'
        }`}
      >
        ★
      </span>
    ));
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
      {/* User Info */}
      <div className="flex items-center gap-3 mb-4">
        <div className="relative w-10 h-10">
          {review.user.image ? (
            <Image
              src={review.user.image}
              alt={review.user.name}
              width={40}
              height={40}
              className="rounded-full object-cover"
            />
          ) : (
            <div className="w-10 h-10 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center">
              <span className="text-gray-600 dark:text-gray-300 font-semibold">
                {review.user.name.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
        </div>
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-white">
            {review.user.name}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {formatDate(review.createdAt)}
          </p>
        </div>
      </div>

      {/* Rating */}
      <div className="flex items-center gap-2 mb-3">
        <div className="flex">{renderStars(review.rating)}</div>
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {review.rating}/5
        </span>
      </div>

      {/* Comment */}
      <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
        {review.comment}
      </p>

      {/* Property Info */}
      {showProperty && (
        <div className="border-t border-gray-200 dark:border-gray-600 pt-4">
          <Link 
            href={`/property/${review.property.id}`}
            className="flex items-center gap-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg p-2 transition-colors"
          >
            <div className="relative w-12 h-12 flex-shrink-0">
              <Image
                src={review.property.showcaseimage}
                alt={review.property.title}
                width={48}
                height={48}
                className="rounded-lg object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-gray-900 dark:text-white truncate">
                {review.property.title}
              </h4>
              <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                {review.property.location}
              </p>
            </div>
          </Link>
        </div>
      )}
    </div>
  );
}
