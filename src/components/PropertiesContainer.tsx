'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Property, SearchParams } from '@/actions/getProperties';
import { PropertySearchFilters } from './PropertySearchFilters';
import { PropertyPagination } from './PropertyPagination';
import { PropertyCardWrapper } from './propretyCardWrapper';

interface PropertiesContainerProps {
  initialProperties: Property[];
  searchParams: SearchParams;
}

export const PropertiesContainer = ({ 
  initialProperties, 
  searchParams 
}: PropertiesContainerProps) => {
  const [properties, setProperties] = useState<Property[]>(initialProperties);
  const [loading, setLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  
  const router = useRouter();
  const urlSearchParams = useSearchParams();
  
  const currentPage = parseInt(searchParams.page || '1');

  const handleSearch = async (filters: SearchParams) => {
    setLoading(true);
    
    const params = new URLSearchParams();
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value && value.toString().trim()) {
        params.set(key, value.toString());
      }
    });
    
    // Reset to first page when new search
    params.set('page', '1');
    
    const url = `/properties?${params.toString()}`;
    router.push(url);
  };

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(urlSearchParams.toString());
    params.set('page', page.toString());
    router.push(`/properties?${params.toString()}`);
  };

  // Update properties when searchParams change
  useEffect(() => {
    setProperties(initialProperties);
    setLoading(false);
  }, [initialProperties]);

  return (
    <div className="space-y-6">
      {/* Search and Filter Section */}
      <div className="bg-white dark:bg-slate-800 dark:text-white rounded-lg shadow-sm border p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4">
          <div className="flex items-center gap-4">
            <h2 className="text-lg font-semibold dark:text-white text-gray-900">
              {properties.length} properties found
            </h2>
            {Object.keys(searchParams).length > 0 && (
              <button
                onClick={() => router.push('/properties')}
                className="text-sm text-blue-600 dark:text-blue-200 hover:text-blue-800 font-medium"
              >
                Clear all filters
              </button>
            )}
          </div>
          
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors lg:hidden"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
            </svg>
            Filters
          </button>
        </div>

        <div className={`${showFilters ? 'block' : 'hidden lg:block'}`}>
          <PropertySearchFilters
            onSearch={handleSearch}
            initialFilters={searchParams}
            loading={loading}
          />
        </div>
      </div>

      {loading && (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Searching properties...</p>
        </div>
      )}

      {!loading && (
        <>
          {properties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.map((property) => (
                <PropertyCardWrapper key={property.id} property={property}/>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-24 h-24 mx-auto mb-4 text-gray-400">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-lg font-medium dark:text-white text-gray-900 mb-2">No properties found</h3>
              <p className="text-gray-600 dark:text-gray-200 mb-4">
                Try adjusting your search criteria or browse all available properties.
              </p>
              <button
                onClick={() => router.push('/properties')}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Show all properties
              </button>
            </div>
          )}

          {/* Pagination */}
          {properties.length > 0 && (
            <PropertyPagination
              currentPage={currentPage}
              totalProperties={properties.length}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}
    </div>
  );
};
