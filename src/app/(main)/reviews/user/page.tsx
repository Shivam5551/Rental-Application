'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { ReviewWithDetails } from '@/actions/getAllReviews';
import { 
  ReviewsHeader, 
  ReviewsContainer,
  ReviewStats 
} from '@/components/reviews';
import Pagination from '@/components/Pagination';
import { redirect } from 'next/navigation';

export default function UserReviewsPage() {
  const { data: session, status } = useSession();
  const [reviews, setReviews] = useState<ReviewWithDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [stats, setStats] = useState<{
    totalReviews: number;
    averageRating: number | null;
    ratingDistribution: Array<{
      rating: number;
      _count: { rating: number };
    }>;
  } | null>(null);

  // Redirect if not authenticated
  useEffect(() => {
    if (status === 'loading') return;
    if (!session) {
      redirect('/signin');
    }
  }, [session, status]);

  const fetchUserReviews = useCallback(async (page: number) => {
    if (!session?.user) return;
    
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '10',
        includeStats: 'true'
      });

      const response = await fetch(`/api/reviews/user?${params}`);
      
      if (!response.ok) {
        if (response.status === 401) {
          redirect('/signin');
          return;
        }
        throw new Error('Failed to fetch user reviews');
      }
      
      const result = await response.json();
      
      setReviews(result.reviews);
      setTotalCount(result.totalCount);
      setTotalPages(result.totalPages);
      setStats(result.stats);
    } catch (error) {
      console.error('Error fetching user reviews:', error);
      setReviews([]);
      setTotalCount(0);
      setTotalPages(0);
      setStats(null);
    } finally {
      setLoading(false);
    }
  }, [session?.user]);

  useEffect(() => {
    if (session?.user) {
      fetchUserReviews(currentPage);
    }
  }, [fetchUserReviews, currentPage, session?.user]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!session) {
    return null; // Will redirect
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-16 mb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">
              My Reviews
            </h1>
            <p className="text-xl text-green-100 max-w-2xl mx-auto">
              Manage and view all the reviews you&apos;ve written. Your feedback helps 
              the community make better decisions.
            </p>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <ReviewsHeader 
          title="Your Reviews"
          subtitle={`Welcome back, ${session?.user?.name || 'User'}! Here are all your reviews.`}
          totalCount={totalCount}
        />

        {stats && (
          <ReviewStats
            totalReviews={stats.totalReviews}
            averageRating={stats.averageRating}
            ratingDistribution={stats.ratingDistribution}
          />
        )}

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <>
            <ReviewsContainer 
              reviews={reviews}
              showProperty={true}
              emptyMessage="You haven't written any reviews yet. Start exploring properties and share your experiences!"
            />

            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}
