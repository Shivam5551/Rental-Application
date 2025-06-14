import prisma from '@/utils/prismaClient';
import { FaHome, FaUsers, FaCalendarCheck, FaStar } from 'react-icons/fa';

export const AboutStats = async () => {
  // Get platform statistics
  const stats = await Promise.all([
    prisma.property.count(),
    prisma.user.count(),
    prisma.booking.count(),
    prisma.review.count()
  ]);

  const [totalProperties, totalUsers, totalBookings, totalReviews] = stats;

  // Get additional stats
  const verifiedProperties = await prisma.property.count({
    where: { verified: true }
  });

  const averageRating = await prisma.review.aggregate({
    _avg: {
      rating: true
    }
  });

  const statsData = [
    {
      icon: FaHome,
      value: totalProperties.toLocaleString(),
      label: 'Properties Listed',
      description: 'Across major cities in India',
      color: 'orange'
    },
    {
      icon: FaUsers,
      value: totalUsers.toLocaleString(),
      label: 'Happy Customers',
      description: 'Property owners and tenants',
      color: 'blue'
    },
    {
      icon: FaCalendarCheck,
      value: totalBookings.toLocaleString(),
      label: 'Successful Bookings',
      description: 'Completed reservations',
      color: 'green'
    },
    {
      icon: FaStar,
      value: (averageRating._avg.rating || 0).toFixed(1),
      label: 'Average Rating',
      description: `Based on ${totalReviews} reviews`,
      color: 'yellow'
    }
  ];

  const getColorClasses = (color: string) => {
    const colorMap = {
      orange: {
        bg: 'bg-orange-100 dark:bg-orange-900/30',
        text: 'text-orange-600 dark:text-orange-400',
        accent: 'text-orange-600 dark:text-orange-400'
      },
      blue: {
        bg: 'bg-blue-100 dark:bg-blue-900/30',
        text: 'text-blue-600 dark:text-blue-400',
        accent: 'text-blue-600 dark:text-blue-400'
      },
      green: {
        bg: 'bg-green-100 dark:bg-green-900/30',
        text: 'text-green-600 dark:text-green-400',
        accent: 'text-green-600 dark:text-green-400'
      },
      yellow: {
        bg: 'bg-yellow-100 dark:bg-yellow-900/30',
        text: 'text-yellow-600 dark:text-yellow-400',
        accent: 'text-yellow-600 dark:text-yellow-400'
      }
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.orange;
  };

  return (
    <section className="py-20 bg-white dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Our Impact in Numbers
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            See how we&apos;re transforming the rental property landscape across India
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {statsData.map((stat, index) => {
            const colors = getColorClasses(stat.color);
            const IconComponent = stat.icon;
            
            return (
              <div
                key={index}
                className="bg-gray-50 dark:bg-slate-800 rounded-2xl p-8 text-center hover:transform hover:scale-105 transition-all duration-300"
              >
                <div className={`w-16 h-16 ${colors.bg} rounded-xl flex items-center justify-center mx-auto mb-6`}>
                  <IconComponent className={`${colors.text} text-2xl`} />
                </div>
                <div className={`text-4xl font-bold ${colors.accent} mb-2`}>
                  {stat.value}
                </div>
                <div className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {stat.label}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {stat.description}
                </div>
              </div>
            );
          })}
        </div>

        {/* Additional Metrics */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-r from-orange-600 to-orange-700 dark:from-orange-700 dark:to-orange-800 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Quality Assurance</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span>Verified Properties</span>
                <span className="font-bold">{verifiedProperties} / {totalProperties}</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-2">
                <div
                  className="bg-white rounded-full h-2 transition-all duration-500"
                  style={{ width: `${(verifiedProperties / totalProperties) * 100}%` }}
                ></div>
              </div>
              <div className="text-sm opacity-90">
                {Math.round((verifiedProperties / totalProperties) * 100)}% of properties are verified
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-700 dark:to-blue-800 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Customer Satisfaction</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span>Average Rating</span>
                <div className="flex items-center gap-2">
                  <FaStar className="text-yellow-300" />
                  <span className="font-bold">{(averageRating._avg.rating || 0).toFixed(1)}/5</span>
                </div>
              </div>
              <div className="w-full bg-white/20 rounded-full h-2">
                <div
                  className="bg-yellow-300 rounded-full h-2 transition-all duration-500"
                  style={{ width: `${((averageRating._avg.rating || 0) / 5) * 100}%` }}
                ></div>
              </div>
              <div className="text-sm opacity-90">
                Based on {totalReviews} authentic customer reviews
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
