"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaStar, FaSpinner } from "react-icons/fa";

interface AddReviewFormProps {
    propertyId: string;
    bookingId?: string;
    userId: string;
    propertyTitle?: string;
    onSuccess?: () => void;
}

export default function AddReviewForm({
    propertyId,
    bookingId,
    userId,
    propertyTitle,
    onSuccess,
}: AddReviewFormProps) {
    const router = useRouter();
    const [formData, setFormData] = useState({
        rating: 0,
        comment: "",
    });
    const [hoveredRating, setHoveredRating] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");

    const handleRatingClick = (rating: number) => {
        setFormData((prev) => ({ ...prev, rating }));
    };

    const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setFormData((prev) => ({ ...prev, comment: e.target.value }));
        setError("");
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (formData.rating === 0) {
            setError("Please select a rating");
            return;
        }

        if (formData.comment.trim().length < 10) {
            setError("Please write at least 10 characters in your review");
            return;
        }

        setIsSubmitting(true);
        setError("");

        try {
            const response = await fetch("/api/reviews", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    propertyId,
                    bookingId,
                    userId,
                    rating: formData.rating,
                    comment: formData.comment.trim(),
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Failed to submit review");
            }

            // Success
            if (onSuccess) {
                onSuccess();
            } else {
                const successUrl = `/reviews/success?propertyTitle=${encodeURIComponent(propertyTitle || "")}&propertyId=${propertyId}`;
                router.push(successUrl);
            }
        } catch (error) {
            console.error("Error submitting review:", error);
            setError(error instanceof Error ? error.message : "Failed to submit review");
        } finally {
            setIsSubmitting(false);
        }
    };

    const getRatingText = (rating: number) => {
        switch (rating) {
            case 1:
                return "Poor";
            case 2:
                return "Fair";
            case 3:
                return "Good";
            case 4:
                return "Very Good";
            case 5:
                return "Excellent";
            default:
                return "Select Rating";
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-3">
                <label className="block text-lg font-semibold text-gray-900 dark:text-white">
                    Rate your experience
                </label>

                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                key={star}
                                type="button"
                                className="p-1 focus:outline-none focus:ring-2 focus:ring-orange-500 rounded"
                                onMouseEnter={() => setHoveredRating(star)}
                                onMouseLeave={() => setHoveredRating(0)}
                                onClick={() => handleRatingClick(star)}
                            >
                                <FaStar
                                    className={`w-8 h-8 transition-colors ${
                                        star <= (hoveredRating || formData.rating)
                                            ? "text-yellow-400"
                                            : "text-gray-300 dark:text-gray-600"
                                    }`}
                                />
                            </button>
                        ))}
                    </div>

                    <span className="text-lg font-medium text-gray-700 dark:text-gray-300">
                        {getRatingText(hoveredRating || formData.rating)}
                    </span>
                </div>

                {formData.rating > 0 && (
                    <p className="text-sm text-green-600 dark:text-green-400">
                        {formData.rating === 5
                            ? "🌟 Amazing! We're glad you had an excellent experience!"
                            : formData.rating >= 4
                              ? "😊 Great! Thanks for the positive feedback!"
                              : formData.rating >= 3
                                ? "👍 Good to hear! Any suggestions for improvement?"
                                : "😔 Sorry to hear that. Please let us know what went wrong."}
                    </p>
                )}
            </div>

            <div className="space-y-3">
                <label
                    htmlFor="comment"
                    className="block text-lg font-semibold text-gray-900 dark:text-white"
                >
                    Share your experience
                </label>

                <textarea
                    id="comment"
                    value={formData.comment}
                    onChange={handleCommentChange}
                    placeholder="Tell others about your stay. What did you like? What could be improved? Your honest feedback helps fellow travelers and hosts..."
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-slate-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 resize-none"
                    maxLength={1000}
                />

                <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500 dark:text-gray-400">
                        Minimum 10 characters required
                    </span>
                    <span
                        className={`${
                            formData.comment.length > 900
                                ? "text-orange-600 dark:text-orange-400"
                                : "text-gray-500 dark:text-gray-400"
                        }`}
                    >
                        {formData.comment.length}/1000
                    </span>
                </div>
            </div>

            {error && (
                <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                    <p className="text-red-700 dark:text-red-300 text-sm">{error}</p>
                </div>
            )}

            <div className="flex gap-4 pt-4">
                <button
                    type="button"
                    onClick={() => router.back()}
                    className="flex-1 px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
                >
                    Cancel
                </button>

                <button
                    type="submit"
                    disabled={
                        isSubmitting || formData.rating === 0 || formData.comment.trim().length < 10
                    }
                    className="flex-1 px-6 py-3 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
                >
                    {isSubmitting ? (
                        <>
                            <FaSpinner className="w-4 h-4 animate-spin" />
                            Submitting...
                        </>
                    ) : (
                        "Submit Review"
                    )}
                </button>
            </div>
        </form>
    );
}
