'use client';

import { FaEye, FaBullseye, FaHeart } from 'react-icons/fa';

export const AboutMission = () => {
  return (
    <section className="py-20 bg-gray-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Our Mission & Vision
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Building the future of rental property management through innovation, 
            transparency, and customer-centric solutions.
          </p>
        </div>

        {/* Mission, Vision, Values Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Mission */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/30 rounded-xl flex items-center justify-center mb-6">
              <FaBullseye className="text-orange-600 dark:text-orange-400 text-2xl" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Our Mission
            </h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              To democratize access to quality rental properties across India by creating 
              a transparent, secure, and user-friendly platform that connects property 
              owners with tenants seamlessly.
            </p>
          </div>

          {/* Vision */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mb-6">
              <FaEye className="text-blue-600 dark:text-blue-400 text-2xl" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Our Vision
            </h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              To become India&apos;s most trusted rental property platform, fostering 
              a community where finding your perfect home is simple, safe, and 
              stress-free for everyone involved.
            </p>
          </div>

          {/* Values */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center mb-6">
              <FaHeart className="text-green-600 dark:text-green-400 text-2xl" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Our Values
            </h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Transparency, integrity, and customer satisfaction drive everything 
              we do. We believe in building lasting relationships through trust 
              and exceptional service quality.
            </p>
          </div>
        </div>

        {/* Story Section */}
        <div className="mt-20">
          <div className="bg-gradient-to-r from-orange-600 to-orange-700 dark:from-orange-700 dark:to-orange-800 rounded-2xl p-12 text-white">
            <div className="max-w-4xl mx-auto text-center">
              <h3 className="text-3xl font-bold mb-6">Our Story</h3>
              <p className="text-xl leading-relaxed opacity-95">
                Founded in 2025, BookIT emerged from a simple observation: finding quality 
                rental properties in India was unnecessarily complicated and often unreliable. 
                Our founders, having experienced these challenges firsthand, set out to create 
                a platform that would revolutionize how people discover, evaluate, and book 
                rental properties across the country.
              </p>
              <div className="mt-8 inline-flex items-center gap-2 bg-white/20 rounded-full px-6 py-3">
                <span className="w-2 h-2 bg-white rounded-full"></span>
                <span className="text-sm font-medium">Established 2025</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
