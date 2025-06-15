'use client';

import { useState, useEffect } from 'react';
import { SearchParams } from '@/actions/getProperties';

interface PropertySearchFiltersProps {
  onSearch: (filters: SearchParams) => void;
  initialFilters: SearchParams;
  loading: boolean;
}

export const PropertySearchFilters = ({
  onSearch,
  initialFilters,
  loading
}: PropertySearchFiltersProps) => {
  const [filters, setFilters] = useState<SearchParams>({
    location: initialFilters.location || '',
    minPrice: initialFilters.minPrice || '',
    maxPrice: initialFilters.maxPrice || '',
    beds: initialFilters.beds || '',
    baths: initialFilters.baths || '',
    petfriendly: initialFilters.petfriendly || '',
    firesafety: initialFilters.firesafety || '',
    verified: initialFilters.verified || '',
    area: initialFilters.area || '',
  });

  const handleInputChange = (key: keyof SearchParams, value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(filters);
  };

  const handleReset = () => {
    setFilters({
      location: '',
      minPrice: '',
      maxPrice: '',
      beds: '',
      baths: '',
      petfriendly: '',
      firesafety: '',
      verified: '',
      area: '',
    });
  };

  // Quick search for location
  const handleQuickSearch = (location: string) => {
    const newFilters = { ...filters, location };
    setFilters(newFilters);
    onSearch(newFilters);
  };

  useEffect(() => {
    setFilters({
      location: initialFilters.location || '',
      minPrice: initialFilters.minPrice || '',
      maxPrice: initialFilters.maxPrice || '',
      beds: initialFilters.beds || '',
      baths: initialFilters.baths || '',
      petfriendly: initialFilters.petfriendly || '',
      firesafety: initialFilters.firesafety || '',
      verified: initialFilters.verified || '',
      area: initialFilters.area || '',
    });
  }, [initialFilters]);

  return (
    <div className="space-y-6">
      {/* Quick Location Search */}
      <div>
        <h3 className="text-sm font-medium dark:text-gray-200 text-gray-700 mb-3">Popular Destinations</h3>
        <div className="flex flex-wrap gap-2">
          {['Mumbai', 'Delhi', 'Bangalore', 'Goa', 'Pune', 'Chennai'].map((city) => (
            <button
              key={city}
              onClick={() => handleQuickSearch(city)}
              className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-blue-100 hover:text-blue-700 transition-colors"
            >
              {city}
            </button>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Location and Price */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm dark:text-gray-200 font-medium text-gray-700 mb-1">
              Location
            </label>
            <input
              type="text"
              value={filters.location}
              onChange={(e) => handleInputChange('location', e.target.value)}
              placeholder="Enter city or area"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm dark:text-gray-200 font-medium text-gray-700 mb-1">
              Min Price (₹/night)
            </label>
            <input
              type="number"
              value={filters.minPrice}
              onChange={(e) => handleInputChange('minPrice', e.target.value)}
              placeholder="Min price"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm dark:text-gray-200 font-medium text-gray-700 mb-1">
              Max Price (₹/night)
            </label>
            <input
              type="number"
              value={filters.maxPrice}
              onChange={(e) => handleInputChange('maxPrice', e.target.value)}
              placeholder="Max price"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Beds, Baths, Area */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm dark:text-gray-200 font-medium text-gray-700 mb-1">
              Minimum Beds
            </label>
            <select
              value={filters.beds}
              onChange={(e) => handleInputChange('beds', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Any</option>
              <option value="1">1+ Bed</option>
              <option value="2">2+ Beds</option>
              <option value="3">3+ Beds</option>
              <option value="4">4+ Beds</option>
            </select>
          </div>

          <div>
            <label className="block text-sm dark:text-gray-200 font-medium text-gray-700 mb-1">
              Minimum Baths
            </label>
            <select
              value={filters.baths}
              onChange={(e) => handleInputChange('baths', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Any</option>
              <option value="1">1+ Bath</option>
              <option value="2">2+ Baths</option>
              <option value="3">3+ Baths</option>
            </select>
          </div>

          <div>
            <label className="block text-sm dark:text-gray-200 font-medium text-gray-700 mb-1">
              Minimum Area (sq ft)
            </label>
            <input
              type="number"
              value={filters.area}
              onChange={(e) => handleInputChange('area', e.target.value)}
              placeholder="Min area"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>



        {/* Amenities and Features */}
        <div>
          <h3 className="text-sm font-medium dark:text-white text-gray-700 mb-3">Amenities & Features</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.petfriendly === 'true'}
                onChange={(e) => handleInputChange('petfriendly', e.target.checked ? 'true' : '')}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-sm dark:text-gray-200 text-gray-700">Pet Friendly</span>
            </label>

            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.firesafety === 'true'}
                onChange={(e) => handleInputChange('firesafety', e.target.checked ? 'true' : '')}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-sm dark:text-gray-200 text-gray-700">Fire Safety</span>
            </label>

            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.verified === 'true'}
                onChange={(e) => handleInputChange('verified', e.target.checked ? 'true' : '')}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-sm dark:text-gray-200 text-gray-700">Verified</span>
            </label>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 px-6 py-2 cursor-pointer bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Searching...
              </div>
            ) : (
              'Search Properties'
            )}
          </button>
          
          <button
            type="button"
            onClick={handleReset}
            className="px-6 py-2 cursor-pointer border bg-orange-600 border-gray-300  dark:hover:text-black text-white rounded-lg hover:bg-orange-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
          >
            Reset Filters
          </button>
        </div>
      </form>
    </div>
  );
};
