import { NextRequest, NextResponse } from "next/server";
import { getAllReviews, getReviewsByRating } from "@/actions/getAllReviews";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";
import prisma from "@/utils/prismaClient";

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const page = parseInt(searchParams.get("page") || "1");
        const limit = parseInt(searchParams.get("limit") || "10");
        const sortBy =
            (searchParams.get("sortBy") as "newest" | "oldest" | "rating-high" | "rating-low") ||
            "newest";
        const rating = searchParams.get("rating");

        let result;

        if (rating) {
            // Filter by specific rating
            const ratingNum = parseInt(rating);
            const reviews = await getReviewsByRating(ratingNum);
            result = {
                reviews,
                totalCount: reviews.length,
                totalPages: 1,
                currentPage: 1,
            };
        } else {
            // Get all reviews with pagination
            result = await getAllReviews(page, limit, sortBy);
        }

        return NextResponse.json(result);
    } catch (error) {
        console.error("Error fetching reviews:", error);
        return NextResponse.json({ error: "Failed to fetch reviews" }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || !session.user?.id) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const body = await request.json();
        const { propertyId, bookingId, rating, comment } = body;

        // Validate required fields
        if (!propertyId || !rating || !comment) {
            return NextResponse.json(
                { message: "Property ID, rating, and comment are required" },
                { status: 400 }
            );
        }

        // Validate rating range
        if (rating < 1 || rating > 5) {
            return NextResponse.json(
                { message: "Rating must be between 1 and 5" },
                { status: 400 }
            );
        }

        // Validate comment length
        if (comment.trim().length < 10) {
            return NextResponse.json(
                { message: "Comment must be at least 10 characters long" },
                { status: 400 }
            );
        }

        // Check if property exists
        const property = await prisma.property.findUnique({
            where: { id: propertyId },
            select: { id: true, userId: true },
        });

        if (!property) {
            return NextResponse.json({ message: "Property not found" }, { status: 404 });
        }

        // Prevent users from reviewing their own properties
        if (property.userId === session.user.id) {
            return NextResponse.json(
                { message: "You cannot review your own property" },
                { status: 400 }
            );
        }

        // If bookingId is provided, verify the booking belongs to the user and is completed
        if (bookingId) {
            const booking = await prisma.booking.findFirst({
                where: {
                    id: bookingId,
                    userId: session.user.id,
                    propertyId: propertyId,
                    endDate: {
                        lt: new Date(), // Booking must be completed
                    },
                },
            });

            if (!booking) {
                return NextResponse.json(
                    { message: "Booking not found or not yet completed" },
                    { status: 404 }
                );
            }
        }

        // Check if user has already reviewed this property
        const existingReview = await prisma.review.findFirst({
            where: {
                userId: session.user.id,
                propertyId: propertyId,
            },
        });

        if (existingReview) {
            return NextResponse.json(
                { message: "You have already reviewed this property" },
                { status: 400 }
            );
        }

        // Create the review
        const review = await prisma.review.create({
            data: {
                rating: parseInt(rating),
                comment: comment.trim(),
                userId: session.user.id,
                propertyId: propertyId,
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
                        address: true,
                        city: true,
                        state: true,
                        country: true,
                        postalCode: true,
                        showcaseimage: true,
                    },
                },
            },
        });

        return NextResponse.json(
            {
                message: "Review submitted successfully",
                review,
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("Error creating review:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
