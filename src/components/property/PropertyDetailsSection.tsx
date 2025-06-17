import { FaStar, FaBed, FaBath, FaRulerCombined, FaPaw, FaShieldAlt } from 'react-icons/fa';

interface PropertyDetailsSectionProps {
  beds: number;
  baths: number;
  area: number;
  rating: number | null;
  description: string;
  petFriendly?: boolean;
  fireSafety?: boolean;
}

export function PropertyDetailsSection({ 
  beds, 
  baths, 
  area, 
  rating, 
  description, 
  petFriendly = false, 
  fireSafety = false 
}: PropertyDetailsSectionProps) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
        Property Details
      </h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="flex items-center gap-2">
          <FaBed className="text-orange-600 dark:text-orange-400" />
          <span className="text-gray-900 dark:text-white">{beds} Beds</span>
        </div>
        <div className="flex items-center gap-2">
          <FaBath className="text-orange-600 dark:text-orange-400" />
          <span className="text-gray-900 dark:text-white">{baths} Baths</span>
        </div>
        <div className="flex items-center gap-2">
          <FaRulerCombined className="text-orange-600 dark:text-orange-400" />
          <span className="text-gray-900 dark:text-white">{area} sq ft</span>
        </div>
        <div className="flex items-center gap-2">
          <FaStar className="text-orange-600 dark:text-orange-400" />
          <span className="text-gray-900 dark:text-white">{rating || 'No rating'}</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {petFriendly && (
          <span className="flex items-center gap-1 text-sm text-green-600 bg-green-50 dark:bg-green-900/30 px-3 py-1 rounded-full">
            <FaPaw className="w-3 h-3" />
            Pet Friendly
          </span>
        )}
        {fireSafety && (
          <span className="flex items-center gap-1 text-sm text-red-600 bg-red-50 dark:bg-red-900/30 px-3 py-1 rounded-full">
            <FaShieldAlt className="w-3 h-3" />
            Fire Safety
          </span>
        )}
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Description</h3>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}
