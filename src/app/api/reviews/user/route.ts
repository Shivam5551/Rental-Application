import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/utils/authOptions';
import { getUserReviews, getUserReviewStats } from '@/actions/getUserReviews';
import { ReviewWithDetails } from '@/actions/getAllReviews';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const userWithId = session.user as { id?: string };
    if (!userWithId.id) {
      return NextResponse.json(
        { error: 'User ID not found' },
        { status: 400 }
      );
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const includeStats = searchParams.get('includeStats') === 'true';

    const reviewsResult = await getUserReviews(userWithId.id, page, limit);
    
    interface ReviewStats {
      totalReviews: number;
      averageRating: number | null;
      ratingDistribution: Array<{
        rating: number;
        _count: {
          rating: number;
        };
      }>;
    }

    interface ApiResult {
      reviews: ReviewWithDetails[];
      totalCount: number;
      totalPages: number;
      currentPage: number;
      stats?: ReviewStats;
    }
    
    let result: ApiResult = reviewsResult;

    if (includeStats) {
      const stats = await getUserReviewStats(userWithId.id);
      result = {
        ...reviewsResult,
        stats
      };
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error fetching user reviews:', error);
    return NextResponse.json(
      { error: 'Failed to fetch user reviews' },
      { status: 500 }
    );
  }
}
