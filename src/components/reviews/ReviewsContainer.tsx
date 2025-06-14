import ReviewCard from './ReviewCard';
import { ReviewWithDetails } from '@/actions/getAllReviews';

interface ReviewsContainerProps {
  reviews: ReviewWithDetails[];
  showProperty?: boolean;
  emptyMessage?: string;
}

export default function ReviewsContainer({ 
  reviews, 
  showProperty = true,
  emptyMessage = "No reviews found."
}: ReviewsContainerProps) {
  if (reviews.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 mx-auto mb-4 text-gray-400">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          No Reviews Yet
        </h3>
        <p className="text-gray-500 dark:text-gray-400">
          {emptyMessage}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {reviews.map((review) => (
        <ReviewCard 
          key={review.id} 
          review={review} 
          showProperty={showProperty}
        />
      ))}
    </div>
  );
}
