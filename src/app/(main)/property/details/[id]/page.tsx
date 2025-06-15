import { notFound } from 'next/navigation';
import prisma from '@/utils/prismaClient';
import { FaStar, FaBed, FaBath, FaRulerCombined, FaPaw, FaShieldAlt, FaCheckCircle, FaMapMarkerAlt } from 'react-icons/fa';
import { ImageKitProvider, Image as ImageKitImage } from '@imagekit/next';
import { IMAGEKIT_CONFIG } from '@/utils/imagekitConfig';
import Image from 'next/image';
import { BookNowButton } from '@/components/BookNowButton';

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

  const discountedPrice = propertyWithRating.discount > 0 
    ? propertyWithRating.price - propertyWithRating.discount 
    : propertyWithRating.price;

  const discountPercentage = propertyWithRating.discount > 0 
    ? Math.round((propertyWithRating.discount / propertyWithRating.price) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            {property.title}
          </h1>
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
            <FaMapMarkerAlt className="w-4 h-4" />
            <span>{property.location}</span>
            {property.verified && (
              <span className="ml-4 bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm flex items-center gap-1">
                <FaCheckCircle className="w-3 h-3" />
                Verified
              </span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery */}
            <div className="aspect-video rounded-lg overflow-hidden">
              <ImageKitProvider urlEndpoint={IMAGEKIT_CONFIG.urlEndpoint}>
                <ImageKitImage
                  src={property.showcaseimage}
                  alt={property.title}
                  width={800}
                  height={450}
                  transformation={[{
                    height: 450,
                    width: 800,
                    crop: 'maintain_ratio'
                  }]}
                  className="w-full h-full object-cover"
                />
              </ImageKitProvider>
            </div>

            {/* Property Details */}
            <div className="bg-white dark:bg-slate-800 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Property Details
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <FaBed className="text-orange-600 dark:text-orange-400" />
                  <span className="text-gray-900 dark:text-white">{property.beds} Beds</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaBath className="text-orange-600 dark:text-orange-400" />
                  <span className="text-gray-900 dark:text-white">{property.baths} Baths</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaRulerCombined className="text-orange-600 dark:text-orange-400" />
                  <span className="text-gray-900 dark:text-white">{property.area} sq ft</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaStar className="text-orange-600 dark:text-orange-400" />
                  <span className="text-gray-900 dark:text-white">{propertyWithRating.rating || 'No rating'}</span>
                </div>
              </div>

              {/* Amenities */}
              <div className="flex flex-wrap gap-2 mb-6">
                {property.petfriendly && (
                  <span className="flex items-center gap-1 text-sm text-green-600 bg-green-50 dark:bg-green-900/30 px-3 py-1 rounded-full">
                    <FaPaw className="w-3 h-3" />
                    Pet Friendly
                  </span>
                )}
                {property.firesafety && (
                  <span className="flex items-center gap-1 text-sm text-red-600 bg-red-50 dark:bg-red-900/30 px-3 py-1 rounded-full">
                    <FaShieldAlt className="w-3 h-3" />
                    Fire Safety
                  </span>
                )}
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Description</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {property.description}
                </p>
              </div>
            </div>

            {/* Reviews */}
            <div className="bg-white dark:bg-slate-800 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Reviews ({property._count.reviews})
              </h2>
              {property.reviews.length > 0 ? (
                <div className="space-y-4">
                  {property.reviews.slice(0, 5).map((review) => (
                    <div key={review.id} className="border-b border-gray-200 dark:border-gray-700 pb-4">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center">
                          {review.user.image ? (
                            <Image
                              width={100}
                              height={100} 
                              src={review.user.image} 
                              alt={review.user.name}
                              className="w-full h-full rounded-full object-cover"
                            />
                          ) : (
                            <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                              {review.user.name.charAt(0).toUpperCase()}
                            </span>
                          )}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900 dark:text-white">{review.user.name}</div>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <FaStar
                                key={i}
                                className={`w-3 h-3 ${
                                  i < review.rating ? 'text-yellow-400' : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300">{review.comment}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600 dark:text-gray-300">No reviews yet.</p>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-slate-800 rounded-lg p-6 sticky top-20">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Pricing
              </h3>
              
              <div className="mb-6">
                {property.discount > 0 ? (
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-3xl font-bold text-gray-900 dark:text-white">
                        ₹{discountedPrice.toLocaleString()}
                      </span>
                      <span className="text-lg text-gray-500 dark:text-gray-400 line-through">
                        ₹{property.price.toLocaleString()}
                      </span>
                    </div>
                    <div className="bg-red-100 text-red-800 px-2 py-1 rounded text-sm inline-block">
                      {discountPercentage}% OFF
                    </div>
                  </div>
                ) : (
                  <span className="text-3xl font-bold text-gray-900 dark:text-white">
                    ₹{property.price.toLocaleString()}
                  </span>
                )}
                <span className="text-gray-600 dark:text-gray-300 ml-2">/night</span>
              </div>

              <BookNowButton id={resolvedParams.id}/>

              {/* Host Info */}
              <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Hosted by</h4>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center">
                    {property.user.image ? (
                      <Image
                      width={100}
                      height={100} 
                        src={property.user.image} 
                        alt={property.user.name.toString()[0]}
                        className="w-full h-full flex items-center justify-center font-semibold rounded-full object-cover"
                      />
                    ) : (
                      <span className="text-lg font-medium text-gray-600 dark:text-gray-300">
                        {property.user.name.charAt(0).toUpperCase()}
                      </span>
                    )}
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">{property.user.name}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Property Owner</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
