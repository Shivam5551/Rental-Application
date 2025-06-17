import { notFound } from 'next/navigation';
import prisma from '@/utils/prismaClient';
import {
  PropertyHeader,
  PropertyImageGallery,
  PropertyDetailsSection,
  PropertyReviews,
  PropertyPricingSidebar
} from '@/components/property';

interface PropertyDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function PropertyDetailsPage({ params }: PropertyDetailsPageProps) {
  const resolvedParams = await params;


  const property = await prisma.property.findUnique({
    where: {
      id: resolvedParams.id
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          image: true,
          email: true
        }
      },
      images: true,
      reviews: {
        include: {
          user: {
            select: {
              name: true,
              image: true
            }
          }
        },
        orderBy: {
          createdAt: 'desc'
        }
      },
      _count: {
        select: {
          reviews: true,
          bookings: true
        }
      }
    }
  });

  if (!property) {
    notFound();
  }

  // Calculate average rating
  const averageRating = property.reviews.length > 0 
    ? property.reviews.reduce((sum, review) => sum + review.rating, 0) / property.reviews.length
    : null;

  const propertyWithRating = {
    ...property,
    rating: averageRating ? Math.round(averageRating * 10) / 10 : null
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        <PropertyHeader 
          title={property.title}
          location={property.location}
          verified={property.verified}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <PropertyImageGallery 
              showcaseImage={property.showcaseimage}
              title={property.title}
            />

            <PropertyDetailsSection 
              beds={property.beds}
              baths={property.baths}
              area={property.area}
              rating={propertyWithRating.rating}
              description={property.description}
              petFriendly={property.petfriendly}
              fireSafety={property.firesafety}
            />

            <PropertyReviews 
              reviews={property.reviews}
              totalReviews={property._count.reviews}
            />
          </div>

          <div className="lg:col-span-1">
            <PropertyPricingSidebar 
              propertyId={resolvedParams.id}
              price={property.price}
              discount={property.discount}
              host={property.user}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
