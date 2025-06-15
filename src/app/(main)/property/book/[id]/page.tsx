import { notFound, redirect } from 'next/navigation';
import prisma from '@/utils/prismaClient';
import { BookingForm } from '@/components/BookingForm';
import Image from 'next/image';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/utils/authOptions';
import { LoginButton } from '@/components/loginButton';

interface BookingPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function BookingPage({ params }: BookingPageProps) {
  const session = await getServerSession(authOptions);

  if (!session || !session?.user.id) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-slate-950 flex items-center justify-center px-4">
        <div className="bg-white dark:bg-slate-800 rounded-lg p-8 max-w-md w-full text-center shadow-lg">
          <div className="mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Authentication Required</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6">You need to be logged in to make a booking. Please sign in to continue.</p>
          <div className='flex items-center justify-center'><LoginButton /></div>
        </div>
      </div>
    );
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
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Book {property.title}
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Complete your booking for this amazing property in {property.location}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Property Summary */}
          <div className="bg-white dark:bg-slate-800 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Property Summary
            </h2>
            <div className="aspect-video rounded-lg overflow-hidden mb-4">
              <Image
                width={100}
                height={100}
                src={property.showcaseimage}
                alt={property.title}
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              {property.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {property.location}
            </p>
            <div className="flex items-center justify-between">
              <div>
                {property.discount > 0 ? (
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-gray-900 dark:text-white">
                      ₹{discountedPrice.toLocaleString()}
                    </span>
                    <span className="text-lg text-gray-500 dark:text-gray-400 line-through">
                      ₹{property.price.toLocaleString()}
                    </span>
                  </div>
                ) : (
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">
                    ₹{property.price.toLocaleString()}
                  </span>
                )}
                <span className="text-gray-600 dark:text-gray-300 ml-2">/night</span>
              </div>
            </div>
          </div>

          {/* Booking Form */}
          <div className="bg-white dark:bg-slate-800 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Booking Details
            </h2>
            <BookingForm 
              propertyId={property.id} 
              pricePerNight={discountedPrice}
              propertyTitle={property.title}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
