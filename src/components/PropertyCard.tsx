import { Property } from '@/actions/getProperties';
import { FaStar, FaBed, FaBath, FaRulerCombined, FaPaw, FaShieldAlt, FaCheckCircle } from 'react-icons/fa';
import { Buttons } from './Buttons';
import Image from 'next/image';

interface PropertyCardProps {
  property: Property;
  rating?: number | null;
}

export const PropertyCard = ({ property, rating }: PropertyCardProps) => {
  const discountedPrice = property.discount > 0 
    ? property.price - property.discount 
    : property.price;

  const discountPercentage = property.discount > 0 
    ? Math.round((property.discount / property.price) * 100)
    : 0;

  const renderStars = () => {
    // console.log(rating);
    
    if (!rating) return <span className="text-sm text-gray-500">No rating</span>;
    
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <FaStar
            key={i}
            className={`w-3 h-3 ${
              i < rating ! ? 'text-yellow-400' : 'text-gray-300'
            }`}
          />
        ))}
        <span className="text-sm text-gray-600 ml-1">({property._count.reviews})</span>
      </div>
    );
  };

  return (
    <div className="bg-white dark:bg-slate-800 dark:hover:shadow-amber-100 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden group cursor-pointer">
      {/* Image Section */}
      
        <div className="relative h-48 bg-gray-200">
          <Image
            width={384}
            height={192}
            src={property.showcaseimage}
            alt={property.title}
            className="w-full h-full object-cover"
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1">
            {property.verified && (
              <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                <FaCheckCircle className="w-3 h-3" />
                Verified
              </span>
            )}
            {discountPercentage > 0 && (
              <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                {discountPercentage}% OFF
              </span>
            )}
          </div>
        </div>

      {/* Content Section */}
      <div className="p-4">
        {/* Title and Location */}
        <div className="mb-3">
          <h3 className="font-semibold dark:text-white text-gray-900 text-lg mb-1 line-clamp-1">
            {property.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {property.location}
          </p>
        </div>

        {/* Property Details */}
        <div className="flex items-center justify-between text-sm dark:text-gray-300 text-gray-600 mb-3">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <FaBed className="w-3 h-3" />
              {property.beds}
            </span>
            <span className="flex items-center gap-1">
              <FaBath className="w-3 h-3" />
              {property.baths}
            </span>
            <span className="flex items-center gap-1">
              <FaRulerCombined className="w-3 h-3" />
              {property.area} sq ft
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-3">
          {property.petfriendly && (
            <span className="flex items-center gap-1 text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">
              <FaPaw className="w-3 h-3" />
              Pet Friendly
            </span>
          )}
          {property.firesafety && (
            <span className="flex items-center gap-1 text-xs text-red-600 bg-red-50 px-2 py-1 rounded-full">
              <FaShieldAlt className="w-3 h-3" />
              Fire Safety
            </span>
          )}
        </div>

        {/* Rating */}
        <div className="mb-3">
          {renderStars()}
        </div>

        <div className="flex items-center gap-2 mb-4 text-sm text-gray-600">
          {property.user.image ? (
            <Image 
              width={24}
              height={24}
              src={property.user.image}
              alt={property.user.name}
              className="w-6 h-6 rounded-full object-cover"
            />
          ) : (
            <div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center">
              <span className="text-xs font-medium dark:text-gray-300 text-gray-600">
                {property.user.name.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
          <span className='dark:text-gray-300 text-gray-600'>Hosted by {property.user.name}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {property.discount > 0 ? (
              <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-gray-900 dark:text-gray-100">
              ₹{discountedPrice.toFixed(2)}
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400 line-through">
              ₹{property.price.toFixed(2)}
            </span>
              </div>
            ) : (
              <span className="text-lg font-bold text-gray-900 dark:text-gray-100">
            ₹{property.price.toFixed(2)}
              </span>
            )}
            <span className="text-sm text-gray-600 dark:text-gray-300">/Night</span>
          </div>
        </div>
        <Buttons propertyId={property.id} />
      </div>
    </div>
  );
};
