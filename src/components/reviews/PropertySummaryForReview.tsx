'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FaMapMarkerAlt, FaBed, FaBath, FaRulerCombined, FaStar } from 'react-icons/fa';

interface PropertySummaryProps {
  property: {
    id: string;
    title: string;
    location: string;
    showcaseimage: string;
    price: number;
    discount: number;
    beds: number;
    baths: number;
    area: number;
    user: {
      id: string;
      name: string;
      image: string | null;
    };
  };
  averageRating?: number | null;
  totalReviews?: number;
}

export default function PropertySummaryForReview({ property, averageRating, totalReviews }: PropertySummaryProps) {
  const discountedPrice = property.discount > 0 
    ? property.price - property.discount 
    : property.price;

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <FaStar
        key={i}
        className={`w-4 h-4 ${
          i < Math.round(rating) ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'
        }`}
      />
    ));
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-gray-200 dark:border-slate-700 overflow-hidden">
      {/* Property Image */}
      <div className="relative h-48 sm:h-56">
        <Image
          src={property.showcaseimage}
          alt={property.title}
          fill
          className="object-cover"
        />
        
        {/* Discount Badge */}
        {property.discount > 0 && (
          <div className="absolute top-4 right-4">
            <span className="bg-red-500 text-white text-sm font-semibold px-3 py-1 rounded-full">
              {Math.round((property.discount / property.price) * 100)}% OFF
            </span>
          </div>
        )}
      </div>

      {/* Property Details */}
      <div className="p-6 space-y-4">
        {/* Title and Location */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            {property.title}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 flex items-center gap-2">
            <FaMapMarkerAlt className="w-4 h-4 text-gray-500" />
            {property.location}
          </p>
        </div>

        {/* Property Features */}
        <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-300">
          <span className="flex items-center gap-1">
            <FaBed className="w-4 h-4" />
            {property.beds} beds
          </span>
          <span className="flex items-center gap-1">
            <FaBath className="w-4 h-4" />
            {property.baths} baths
          </span>
          <span className="flex items-center gap-1">
            <FaRulerCombined className="w-4 h-4" />
            {property.area} sq ft
          </span>
        </div>

        {/* Rating */}
        {averageRating && (
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              {renderStars(averageRating)}
            </div>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {averageRating.toFixed(1)} ({totalReviews || 0} {totalReviews === 1 ? 'review' : 'reviews'})
            </span>
          </div>
        )}

        {/* Price */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-200 dark:border-gray-600">
          <div className="flex items-center gap-2">
            {property.discount > 0 ? (
              <>
                <span className="text-xl font-bold text-gray-900 dark:text-white">
                  ₹{discountedPrice.toLocaleString()}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400 line-through">
                  ₹{property.price.toLocaleString()}
                </span>
              </>
            ) : (
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                ₹{property.price.toLocaleString()}
              </span>
            )}
            <span className="text-sm text-gray-600 dark:text-gray-300">/night</span>
          </div>
        </div>

        {/* Host Info */}
        <div className="flex items-center gap-3 pt-2 border-t border-gray-200 dark:border-gray-600">
          {property.user.image ? (
            <Image
              src={property.user.image}
              alt={property.user.name}
              width={40}
              height={40}
              className="rounded-full object-cover"
            />
          ) : (
            <div className="w-10 h-10 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center">
              <span className="text-sm font-semibold text-gray-600 dark:text-gray-300">
                {property.user.name.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
          <div>
            <p className="font-medium text-gray-900 dark:text-white">
              Hosted by {property.user.name}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Property Host
            </p>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-4">
          <Link href={`/property/details/${property.id}`}>
            <button className="w-full py-3 px-4 border border-orange-600 text-orange-600 hover:bg-orange-50 dark:hover:bg-orange-900/20 font-semibold rounded-lg transition-colors">
              View Property Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
