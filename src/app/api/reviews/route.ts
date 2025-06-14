import { NextRequest, NextResponse } from 'next/server';
import { getAllReviews, getReviewsByRating } from '@/actions/getAllReviews';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const sortBy = searchParams.get('sortBy') as 'newest' | 'oldest' | 'rating-high' | 'rating-low' || 'newest';
    const rating = searchParams.get('rating');

    let result;

    if (rating) {
      // Filter by specific rating
      const ratingNum = parseInt(rating);
      const reviews = await getReviewsByRating(ratingNum);
      result = {
        reviews,
        totalCount: reviews.length,
        totalPages: 1,
        currentPage: 1
      };
    } else {
      // Get all reviews with pagination
      result = await getAllReviews(page, limit, sortBy);
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return NextResponse.json(
      { error: 'Failed to fetch reviews' },
      { status: 500 }
    );
  }
}
