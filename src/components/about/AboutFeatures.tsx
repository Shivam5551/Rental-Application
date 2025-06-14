'use client';

import { 
  FaShieldAlt, 
  FaSearch, 
  FaMapMarkerAlt, 
  FaCreditCard, 
  FaHeadset, 
  FaMobile,
  FaUserFriends,
  FaChartLine 
} from 'react-icons/fa';

export const AboutFeatures = () => {
  const features = [
    {
      icon: FaSearch,
      title: 'Advanced Search & Filters',
      description: 'Find your perfect property with our sophisticated search system including location, price, amenities, and more.',
      color: 'blue'
    },
    {
      icon: FaShieldAlt,
      title: 'Verified Properties',
      description: 'All properties go through our rigorous verification process to ensure authenticity and quality standards.',
      color: 'green'
    },
    {
      icon: FaMapMarkerAlt,
      title: 'Pan-India Coverage',
      description: 'Discover rental properties across major cities and towns throughout India with comprehensive location coverage.',
      color: 'orange'
    },
    {
      icon: FaCreditCard,
      title: 'Secure Payments',
      description: 'Safe and secure payment processing with multiple payment options and transparent pricing.',
      color: 'purple'
    },
    {
      icon: FaHeadset,
      title: '24/7 Customer Support',
      description: 'Round-the-clock customer support to assist you throughout your property search and booking journey.',
      color: 'red'
    },
    {
      icon: FaMobile,
      title: 'Mobile Optimized',
      description: 'Fully responsive platform that works seamlessly across all devices for on-the-go property hunting.',
      color: 'indigo'
    },
    {
      icon: FaUserFriends,
      title: 'Community Reviews',
      description: 'Read authentic reviews from previous tenants to make informed decisions about your next rental.',
      color: 'yellow'
    },
    {
      icon: FaChartLine,
      title: 'Transparent Pricing',
      description: 'No hidden fees or surprise charges. Clear, upfront pricing with detailed cost breakdowns.',
      color: 'teal'
    }
  ];

  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: {
        bg: 'bg-blue-100 dark:bg-blue-900/30',
        text: 'text-blue-600 dark:text-blue-400',
        hover: 'group-hover:bg-blue-600 group-hover:text-white'
      },
      green: {
        bg: 'bg-green-100 dark:bg-green-900/30',
        text: 'text-green-600 dark:text-green-400',
        hover: 'group-hover:bg-green-600 group-hover:text-white'
      },
      orange: {
        bg: 'bg-orange-100 dark:bg-orange-900/30',
        text: 'text-orange-600 dark:text-orange-400',
        hover: 'group-hover:bg-orange-600 group-hover:text-white'
      },
      purple: {
        bg: 'bg-purple-100 dark:bg-purple-900/30',
        text: 'text-purple-600 dark:text-purple-400',
        hover: 'group-hover:bg-purple-600 group-hover:text-white'
      },
      red: {
        bg: 'bg-red-100 dark:bg-red-900/30',
        text: 'text-red-600 dark:text-red-400',
        hover: 'group-hover:bg-red-600 group-hover:text-white'
      },
      indigo: {
        bg: 'bg-indigo-100 dark:bg-indigo-900/30',
        text: 'text-indigo-600 dark:text-indigo-400',
        hover: 'group-hover:bg-indigo-600 group-hover:text-white'
      },
      yellow: {
        bg: 'bg-yellow-100 dark:bg-yellow-900/30',
        text: 'text-yellow-600 dark:text-yellow-400',
        hover: 'group-hover:bg-yellow-600 group-hover:text-white'
      },
      teal: {
        bg: 'bg-teal-100 dark:bg-teal-900/30',
        text: 'text-teal-600 dark:text-teal-400',
        hover: 'group-hover:bg-teal-600 group-hover:text-white'
      }
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.blue;
  };

  return (
    <section className="py-20 bg-gray-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Why Choose BookIT?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Experience the next generation of rental property platform with features 
            designed to make your property search effortless and secure.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const colors = getColorClasses(feature.color);
            const IconComponent = feature.icon;
            
            return (
              <div
                key={index}
                className="group bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105"
              >
                <div className={`w-14 h-14 ${colors.bg} ${colors.hover} rounded-xl flex items-center justify-center mb-6 transition-all duration-300`}>
                  <IconComponent className={`${colors.text} group-hover:text-white text-xl transition-colors duration-300`} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-orange-600 to-orange-700 dark:from-orange-700 dark:to-orange-800 rounded-2xl p-12">
            <h3 className="text-3xl font-bold text-white mb-4">
              Ready to Experience the Difference?
            </h3>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied customers who have found their perfect 
              rental properties through our platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-orange-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200">
                Browse Properties
              </button>
              <button className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-orange-600 transition-all duration-200">
                List Your Property
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
