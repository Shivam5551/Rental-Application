import { notFound, redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";
import prisma from "@/utils/prismaClient";
import {
    AddReviewForm,
    PropertySummaryForReview,
    ReviewGuidelines,
    BookingSummary,
} from "@/components/reviews";
import { FaStar, FaArrowLeft } from "react-icons/fa";
import Link from "next/link";

interface AddReviewPageProps {
    params: Promise<{
        pid: string;
    }>;
    searchParams: Promise<{
        bookingId?: string;
    }>;
}

export default async function AddReviewPage({ params, searchParams }: AddReviewPageProps) {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.id) {
        redirect(
            "/api/auth/signin?callbackUrl=" +
                encodeURIComponent(`/reviews/add/${(await params).pid}`)
        );
    }

    const resolvedParams = await params;
    const resolvedSearchParams = await searchParams;
    const propertyId = resolvedParams.pid;
    const bookingId = resolvedSearchParams.bookingId;

    // Fetch property details
    const property = await prisma.property.findUnique({
        where: { id: propertyId },
        include: {
            user: {
                select: {
                    id: true,
                    name: true,
                    image: true,
                },
            },
            reviews: {
                select: {
                    rating: true,
                },
            },
            _count: {
                select: {
                    reviews: true,
                },
            },
        },
    });

    if (!property) {
        notFound();
    }

    // Check if user already reviewed this property
    const existingReview = await prisma.review.findFirst({
        where: {
            userId: session.user.id,
            propertyId: propertyId,
        },
    });

    if (existingReview) {
        redirect(`/reviews/user?error=already-reviewed`);
    }

    // Prevent users from reviewing their own properties
    if (property.userId === session.user.id) {
        redirect(`/property/details/${propertyId}?error=own-property`);
    }

    // Calculate average rating
    const averageRating =
        property.reviews.length > 0
            ? property.reviews.reduce((sum, review) => sum + review.rating, 0) /
              property.reviews.length
            : null;

    // If bookingId is provided, fetch booking details
    let booking = null;
    if (bookingId) {
        booking = await prisma.booking.findFirst({
            where: {
                id: bookingId,
                userId: session.user.id,
                propertyId: propertyId,
                endDate: {
                    lt: new Date(),
                },
            },
            include: {
                payment: {
                    select: {
                        status: true,
                    },
                },
            },
        });

        if (!booking) {
            redirect(`/bookings?error=booking-not-found`);
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-slate-950">
            <div className="bg-linear-to-r from-orange-600 to-orange-700 dark:from-orange-700 dark:to-orange-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="flex items-center gap-4 mb-4">
                        <Link
                            href={"/bookings"}
                            className="p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors"
                        >
                            <FaArrowLeft className="w-4 h-4 text-white" />
                        </Link>
                        <div className="flex items-center gap-2 text-white">
                            <FaStar className="w-5 h-5" />
                            <span className="text-lg font-semibold">Write a Review</span>
                        </div>
                    </div>

                    <h1 className="text-3xl font-bold text-white mb-2">Share Your Experience</h1>
                    <p className="text-orange-100 text-lg max-w-2xl">
                        Help other travelers by sharing your honest feedback about your stay at this
                        property.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-8">
                        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-gray-200 dark:border-slate-700 p-6">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                                Rate Your Stay
                            </h2>

                            <AddReviewForm
                                propertyId={propertyId}
                                bookingId={bookingId}
                                userId={session.user.id}
                                propertyTitle={property.title}
                            />
                        </div>

                        <ReviewGuidelines />
                    </div>

                    <div className="lg:col-span-1 space-y-6">
                        <PropertySummaryForReview
                            property={property}
                            averageRating={averageRating}
                            totalReviews={property._count.reviews}
                        />

                        {booking && <BookingSummary booking={booking} />}

                        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6">
                            <h3 className="font-semibold text-blue-900 dark:text-blue-200 mb-2">
                                Need Help?
                            </h3>
                            <p className="text-sm text-blue-800 dark:text-blue-300 mb-4">
                                Having trouble with your review? We&apos;re here to help!
                            </p>
                            <Link
                                href="/contact"
                                className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
                            >
                                Contact Support
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
