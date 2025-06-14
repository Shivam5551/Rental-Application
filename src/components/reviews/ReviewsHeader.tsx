interface ReviewsHeaderProps {
  title: string;
  subtitle?: string;
  totalCount?: number;
}

export default function ReviewsHeader({ title, subtitle, totalCount }: ReviewsHeaderProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {title}
          </h1>
          {subtitle && (
            <p className="text-gray-600 dark:text-gray-400">
              {subtitle}
            </p>
          )}
        </div>
        {typeof totalCount === 'number' && (
          <div className="text-right">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {totalCount.toLocaleString()}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Total Reviews
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
