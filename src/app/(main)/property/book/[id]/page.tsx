import { notFound } from 'next/navigation';
import prisma from '@/utils/prismaClient';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/utils/authOptions';
import {
  AuthRequired,
  BookingHeader,
  PropertySummary,
  BookingFormSection
} from '@/components/booking';

interface BookingPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function BookingPage({ params }: BookingPageProps) {
  const session = await getServerSession(authOptions);

  if (!session || !session?.user.id) {
    return <AuthRequired />;
  }

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
          image: true
        }
      }
    }
  });

  if (!property) {
    notFound();
  }

  const discountedPrice = property.discount > 0 
    ? property.price - property.discount 
    : property.price;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <BookingHeader 
          propertyTitle={property.title}
          location={property.location}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <PropertySummary 
            title={property.title}
            location={property.location}
            showcaseImage={property.showcaseimage}
            price={property.price}
            discount={property.discount}
          />

          <BookingFormSection 
            propertyId={property.id}
            pricePerNight={discountedPrice}
            propertyTitle={property.title}
          />
        </div>
      </div>
    </div>
  );
}
