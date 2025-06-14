interface ReviewStatsProps {
  totalReviews: number;
  averageRating: number | null;
  ratingDistribution: Array<{
    rating: number;
    _count: { rating: number };
  }>;
}

export default function ReviewStats({ totalReviews, averageRating, ratingDistribution }: ReviewStatsProps) {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        className={`text-lg ${
          i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'
        }`}
      >
        ★
      </span>
    ));
  };

  const getRatingCount = (rating: number) => {
    const found = ratingDistribution.find(r => r.rating === rating);
    return found ? found._count.rating : 0;
  };

  const getRatingPercentage = (rating: number) => {
    if (totalReviews === 0) return 0;
    return (getRatingCount(rating) / totalReviews) * 100;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-6">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Review Statistics
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Overall Stats */}
        <div className="space-y-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
              {averageRating ? averageRating.toFixed(1) : '0.0'}
            </div>
            <div className="flex justify-center mb-2">
              {renderStars(averageRating || 0)}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Based on {totalReviews.toLocaleString()} reviews
            </div>
          </div>
        </div>

        {/* Rating Distribution */}
        <div className="space-y-2">
          {[5, 4, 3, 2, 1].map((rating) => (
            <div key={rating} className="flex items-center gap-3">
              <div className="flex items-center gap-1 w-12">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {rating}
                </span>
                <span className="text-yellow-400">★</span>
              </div>
              <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${getRatingPercentage(rating)}%` }}
                />
              </div>
              <div className="w-12 text-right">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {getRatingCount(rating)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
