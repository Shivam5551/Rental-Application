'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FaCheckCircle, FaStar, FaHome, FaList } from 'react-icons/fa';

interface ReviewSuccessProps {
  propertyTitle?: string;
  propertyId?: string;
}

export default function ReviewSuccess({ propertyTitle, propertyId }: ReviewSuccessProps) {
  const router = useRouter();

  useEffect(() => {
    // Auto redirect after 10 seconds
    const timer = setTimeout(() => {
      router.push('/reviews/user');
    }, 10000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {/* Success Card */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-gray-200 dark:border-slate-700 p-8 text-center">
          {/* Success Icon */}
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <FaCheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
          </div>

          {/* Title */}
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
            Review Submitted!
          </h1>

          {/* Message */}
          <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
            Thank you for sharing your experience! Your review helps other travelers 
            make informed decisions and helps hosts improve their services.
          </p>

          {/* Property Info */}
          {propertyTitle && (
            <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-center gap-2 text-orange-800 dark:text-orange-300">
                <FaStar className="w-4 h-4" />
                <span className="font-medium">Review for: {propertyTitle}</span>
              </div>
            </div>
          )}

          {/* Next Steps */}
          <div className="space-y-3 mb-6">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Your review will be visible within 24 hours after moderation.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Link href="/reviews/user">
              <button className="w-full py-3 px-4 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700 transition-colors flex items-center justify-center gap-2">
                <FaList className="w-4 h-4" />
                View My Reviews
              </button>
            </Link>

            <div className="grid grid-cols-2 gap-3">
              {propertyId && (
                <Link href={`/property/details/${propertyId}`}>
                  <button className="w-full py-2 px-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors text-sm">
                    View Property
                  </button>
                </Link>
              )}

              <Link href="/">
                <button className="w-full py-2 px-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors flex items-center justify-center gap-2 text-sm">
                  <FaHome className="w-3 h-3" />
                  Home
                </button>
              </Link>
            </div>
          </div>

          {/* Auto redirect notice */}
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-6">
            You&apos;ll be redirected to your reviews in 10 seconds...
          </p>
        </div>

        {/* Additional Tips */}
        <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <h3 className="font-medium text-blue-900 dark:text-blue-200 mb-2">
            💡 Did you know?
          </h3>
          <ul className="text-sm text-blue-800 dark:text-blue-300 space-y-1">
            <li>• Honest reviews help maintain quality standards</li>
            <li>• Detailed feedback helps hosts improve</li>
            <li>• You can edit your review within 24 hours</li>
            <li>• Reviews boost your profile credibility</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
