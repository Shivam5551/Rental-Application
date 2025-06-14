import Link from 'next/link';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaEnvelope, FaPhone, FaMapMarkerAlt, FaHeart } from 'react-icons/fa';

export const Footer = () => {
  const quickLinks = [
    { href: '/', label: 'Home' },
    { href: '/properties', label: 'Browse Properties' },
    { href: '/list-property', label: 'List Your Property' },
    { href: '/about', label: 'About Us' },
    { href: '/contact', label: 'Contact' }
  ];

  const supportLinks = [
    { href: '/help', label: 'Help Center' },
    { href: '/safety', label: 'Safety Guidelines' },
    { href: '/cancellation', label: 'Cancellation Policy' },
    { href: '/terms', label: 'Terms of Service' },
    { href: '/privacy', label: 'Privacy Policy' }
  ];

  const socialLinks = [
    { href: '#', icon: FaFacebook },
    { href: '#', icon: FaTwitter },
    { href: '#', icon: FaInstagram },
    { href: '#', icon: FaLinkedin }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <h3 className="text-2xl font-bold text-blue-400">BookIT</h3>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Your trusted platform for short-term property rentals. Find the perfect place for your next stay or list your property with confidence.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <Link key={index} href={social.href} className="text-gray-400 hover:text-blue-400 transition-colors duration-200">
                    <IconComponent size={20} />
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link href={link.href} className="text-gray-300 hover:text-blue-400 transition-colors duration-200 text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Support</h4>
            <ul className="space-y-2">
              {supportLinks.map((link, index) => (
                <li key={index}>
                  <Link href={link.href} className="text-gray-300 hover:text-blue-400 transition-colors duration-200 text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <FaEnvelope className="text-blue-400 flex-shrink-0" size={16} />
                <span className="text-gray-300 text-sm">support@bookit.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <FaPhone className="text-blue-400 flex-shrink-0" size={16} />
                <span className="text-gray-300 text-sm">+91 9999999999</span>
              </div>
              <div className="flex items-center space-x-3">
                <FaMapMarkerAlt className="text-blue-400 flex-shrink-0" size={16} />
                <span className="text-gray-300 text-sm">134, Connaught Place<br />New Delhi - 110092, India</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="text-gray-300 text-sm">
              © 2025 BookIT. All rights reserved.
            </div>
            <div className="flex items-center space-x-1 text-gray-300 text-sm">
              <span>Made with</span>
              <FaHeart className="text-red-500" size={14} />
              <span>for travelers and property owners</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
