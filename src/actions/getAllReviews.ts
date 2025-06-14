import prisma from "@/utils/prismaClient";

export interface ReviewWithDetails {
  id: string;
  rating: number;
  comment: string;
  createdAt: Date;
  user: {
    id: string;
    name: string;
    image: string | null;
  };
  property: {
    id: string;
    title: string;
    location: string;
    showcaseimage: string;
  };
}

export const getAllReviews = async (
  page: number = 1,
  limit: number = 10,
  sortBy: 'newest' | 'oldest' | 'rating-high' | 'rating-low' = 'newest'
): Promise<{
  reviews: ReviewWithDetails[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
}> => {
  const skip = (page - 1) * limit;
  
  // Determine sort order
  let orderBy: Record<string, 'asc' | 'desc'> = { createdAt: 'desc' };
  switch (sortBy) {
    case 'oldest':
      orderBy = { createdAt: 'asc' };
      break;
    case 'rating-high':
      orderBy = { rating: 'desc' };
      break;
    case 'rating-low':
      orderBy = { rating: 'asc' };
      break;
    default:
      orderBy = { createdAt: 'desc' };
  }

  const [reviews, totalCount] = await Promise.all([
    prisma.review.findMany({
      skip,
      take: limit,
      orderBy,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
        property: {
          select: {
            id: true,
            title: true,
            location: true,
            showcaseimage: true,
          },
        },
      },
    }),
    prisma.review.count(),
  ]);

  return {
    reviews,
    totalCount,
    totalPages: Math.ceil(totalCount / limit),
    currentPage: page,
  };
};

export const getReviewsByRating = async (rating: number) => {
  return await prisma.review.findMany({
    where: {
      rating: rating,
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
      property: {
        select: {
          id: true,
          title: true,
          location: true,
          showcaseimage: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
};
