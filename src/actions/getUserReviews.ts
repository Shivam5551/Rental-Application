import prisma from "@/utils/prismaClient";
import { ReviewWithDetails } from "./getAllReviews";

export const getUserReviews = async (
  userId: string,
  page: number = 1,
  limit: number = 10
): Promise<{
  reviews: ReviewWithDetails[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
}> => {
  const skip = (page - 1) * limit;

  const [reviews, totalCount] = await Promise.all([
    prisma.review.findMany({
      where: {
        userId: userId,
      },
      skip,
      take: limit,
      orderBy: {
        createdAt: 'desc',
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
    }),
    prisma.review.count({
      where: {
        userId: userId,
      },
    }),
  ]);

  return {
    reviews,
    totalCount,
    totalPages: Math.ceil(totalCount / limit),
    currentPage: page,
  };
};

export const getUserReviewStats = async (userId: string) => {
  const stats = await prisma.review.aggregate({
    where: {
      userId: userId,
    },
    _count: {
      id: true,
    },
    _avg: {
      rating: true,
    },
  });

  const ratingDistribution = await prisma.review.groupBy({
    by: ['rating'],
    where: {
      userId: userId,
    },
    _count: {
      rating: true,
    },
  });

  return {
    totalReviews: stats._count.id,
    averageRating: stats._avg.rating,
    ratingDistribution,
  };
};
