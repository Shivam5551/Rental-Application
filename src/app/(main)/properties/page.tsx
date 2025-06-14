import { getProperties } from "@/actions/getProperties";
import { PropertiesContainer } from "@/components/PropertiesContainer";

interface PropertiesPageProps {
  searchParams: Promise<{
    location?: string;
    minPrice?: string;
    maxPrice?: string;
    beds?: string;
    baths?: string;
    petfriendly?: string;
    firesafety?: string;
    verified?: string;
    area?: string;
    rating?: string;
    page?: string;
  }>;
}

export default async function PropertiesPage({ searchParams }: PropertiesPageProps) {
  const resolvedSearchParams = await searchParams;
  const properties = await getProperties(resolvedSearchParams);

  return (
    <div className="min-h-screen dark:bg-black bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl dark:text-white font-bold text-gray-900 mb-2">
            Find Your Perfect Stay
          </h1>
          <p className="text-gray-600 dark:text-gray-200">
            Discover amazing properties for your next getaway
          </p>
        </div>
        
        <PropertiesContainer
          initialProperties={properties}
          searchParams={resolvedSearchParams}
        />
      </div>
    </div>
  );
}
