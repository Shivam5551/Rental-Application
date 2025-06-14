import { FaMapMarkerAlt, FaUsers, FaShieldAlt } from 'react-icons/fa';
import Image from 'next/image';

export const AboutHero = () => {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-white to-orange-50 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div>
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                About{' '}
                <span className="text-orange-600 dark:text-orange-400">
                  BookIT
                </span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mt-6">
                Revolutionizing the rental property experience in India through transparency, 
                trust, and technology-driven solutions.
              </p>
            </div>
            
            {/* Key Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
                  <FaMapMarkerAlt className="text-orange-600 dark:text-orange-400 text-xl" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900 dark:text-white">Pan-India</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Coverage</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
                  <FaUsers className="text-orange-600 dark:text-orange-400 text-xl" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900 dark:text-white">Trusted</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Community</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
                  <FaShieldAlt className="text-orange-600 dark:text-orange-400 text-xl" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900 dark:text-white">Verified</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Properties</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Image */}
          <div className="relative">
            <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
              <Image
                width={100}
                height={100}
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=600&fit=crop"
                alt="Modern apartment building"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Floating Card */}
            <div className="absolute -bottom-6 -left-6 bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg border border-gray-100 dark:border-slate-700">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  Serving customers across India
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
