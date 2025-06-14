import prisma from '@/utils/prismaClient';
import Image from 'next/image';
import Link from 'next/link';
import { FaStar, FaQuoteLeft } from 'react-icons/fa';

export const AboutTestimonials = async () => {
  const testimonials = await prisma.review.findMany({
    where: {
      rating: {
        gte: 4
      }
    },
    include: {
      user: {
        select: {
          name: true,
          image: true
        }
      },
      property: {
        select: {
          title: true,
          location: true
        }
      }
    },
    orderBy: {
      createdAt: 'desc'
    },
    take: 6
  });

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1 justify-center mb-4">
        {[...Array(5)].map((_, i) => (
          <FaStar
            key={i}
            className={`text-sm ${
              i < rating ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <section className="py-20 bg-gray-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            What Our Customers Say
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Real experiences from real customers who have found their perfect 
            rental properties through BookIT.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 relative"
            >
              {/* Quote Icon */}
              <div className="absolute top-6 right-6 text-orange-200 dark:text-orange-800">
                <FaQuoteLeft className="text-2xl" />
              </div>

              {renderStars(testimonial.rating)}

              <blockquote className="text-gray-700 dark:text-gray-300 mb-6 text-center leading-relaxed">
                &quot;{testimonial.comment}&quot;
              </blockquote>

              <div className="flex items-center justify-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center overflow-hidden">
                  {testimonial.user.image ? (
                    <Image
                      height={100}
                      width={100}
                      src={testimonial.user.image} 
                      alt={testimonial.user.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-8 h-8 text-gray-500">
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2" fill="none" />
                        <path
                          d="M4 20c0-3.3137 3.134-6 7-6s7 2.6863 7 6"
                          stroke="currentColor"
                          strokeWidth="2"
                          fill="none"
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>
                  )}
                </div>
                <div className="text-right max-w-[75%]">
                  <div className="font-semibold text-gray-900 dark:text-white">
                    {testimonial.user.name}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Stayed at {testimonial.property.title}, {testimonial.property.location}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-12 text-center">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
              Trusted by Customers Across India
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <div className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2">
                  4.7/5
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Average Rating
                </div>
              </div>
              <div>
                <div className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2">
                  98%
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Customer Satisfaction
                </div>
              </div>
              <div>
                <div className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2">
                  15+
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Cities Covered
                </div>
              </div>
              <div>
                <div className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2">
                  24/7
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Customer Support
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Ready to Share Your Experience?
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers and find your perfect rental property today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={'/properties'}>
              <button className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200">
                Start Your Search
              </button>
            </Link>
            <Link href={'/reviews'}>
              <button className="border-2 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200">
                Read More Reviews
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
