'use client';

import { useState, useEffect, useCallback, Suspense } from 'react';
import { ReviewWithDetails } from '@/actions/getAllReviews';
import {
    ReviewsHero,
    ReviewsHeader,
    ReviewFilters,
    ReviewsContainer
} from '@/components/reviews';
import Pagination from '@/components/Pagination';
import { useRouter, useSearchParams } from 'next/navigation';

export default function ReviewsPage() {
    return (
        <Suspense fallback={<div className="flex justify-center items-center min-h-screen">Loading...</div>}>
            <ReviewsPageContent />
        </Suspense>
    );
}

function ReviewsPageContent() {
    const urlSearchParms = useSearchParams();
    const [reviews, setReviews] = useState<ReviewWithDetails[]>([]);
    const [loading, setLoading] = useState(true);
    const [totalCount, setTotalCount] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(Number(urlSearchParms.get("page")) || 1);
    const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'rating-high' | 'rating-low'>('newest');
    const [ratingFilter, setRatingFilter] = useState<number | null>(null);
    const router = useRouter();

    const fetchReviews = useCallback(async (page: number, sort: typeof sortBy, rating: number | null) => {
        setLoading(true);
        try {
            const params = new URLSearchParams({
                page: page.toString(),
                limit: '10',
                sortBy: sort
            });

            if (rating !== null) {
                params.append('rating', rating.toString());
            }

            const response = await fetch(`/api/reviews?${params}`);

            if (!response.ok) {
                throw new Error('Failed to fetch reviews');
            }

            const result = await response.json();
            setReviews(result.reviews);
            setTotalCount(result.totalCount);
            setTotalPages(result.totalPages);
        } catch (error) {
            console.error('Error fetching reviews:', error);
            setReviews([]);
            setTotalCount(0);
            setTotalPages(0);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchReviews(currentPage, sortBy, ratingFilter);
    }, [currentPage, sortBy, ratingFilter, fetchReviews]);

    const handleSortChange = (newSort: typeof sortBy) => {
        setSortBy(newSort);
        setCurrentPage(1);
    };

    const handleRatingFilter = (rating: number | null) => {
        setRatingFilter(rating);
        setCurrentPage(1);
    };

    const handlePageChange = async (page: number) => {
        setCurrentPage(page);
        const params = new URLSearchParams();
        
        params.set('page', (page).toString());
    
        const url = `/reviews?${params.toString()}`;
        router.push(url);
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <ReviewsHero />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
                <ReviewsHeader
                    title="All Reviews"
                    subtitle="Browse through authentic reviews from our community"
                    totalCount={totalCount}
                />

                <ReviewFilters
                    onSortChange={handleSortChange}
                    onRatingFilter={handleRatingFilter}
                    currentSort={sortBy}
                    currentRating={ratingFilter}
                />

                {loading ? (
                    <div className="flex items-center justify-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                    </div>
                ) : (
                    <>
                        <ReviewsContainer
                            reviews={reviews}
                            showProperty={true}
                            emptyMessage="No reviews match your current filters. Try adjusting your search criteria."
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
