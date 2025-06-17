'use client';

import Image from 'next/image';
import Link from 'next/link';
import { IBookedProperties } from "@/utils/interfaces";
import { FaBed, FaBath, FaRulerCombined, FaCalendarAlt, FaMapMarkerAlt, FaUser } from 'react-icons/fa';

export const BookedPropertiesCard = ({ bookedProperties }: { bookedProperties: IBookedProperties}) => {
    const formatDate = (date: Date) => {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const calculateNights = () => {
        const diffTime = Math.abs(new Date(bookedProperties.endDate).getTime() - new Date(bookedProperties.startDate).getTime());
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    };

    const isUpcoming = new Date(bookedProperties.startDate) > new Date();
    const isOngoing = new Date(bookedProperties.startDate) <= new Date() && new Date(bookedProperties.endDate) >= new Date();
    const isPast = new Date(bookedProperties.endDate) < new Date();
    
    const getStatusBadge = () => {
        if (isOngoing) {
            return (
                <span className="px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800 border border-green-200">
                    Ongoing
                </span>
            );
        } else if (isUpcoming) {
            return (
                <span className="px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800 border border-blue-200">
                    Upcoming
                </span>
            );
        } else {
            return (
                <span className="px-3 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800 border border-gray-200">
                    Completed
                </span>
            );
        }
    };

    const discountedPrice = bookedProperties.property.discount > 0 
        ? bookedProperties.property.price - (bookedProperties.property.price * bookedProperties.property.discount / 100)
        : bookedProperties.property.price;

    return (
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-slate-700 mb-6">
            <div className="md:flex">
                <div className="md:w-1/3 relative">
                    <Image
                        src={bookedProperties.property.showcaseimage}
                        alt={bookedProperties.property.title}
                        width={300}
                        height={200}
                        className="w-full h-48 md:h-full object-cover"
                    />
                    
                    <div className="absolute top-3 right-3">
                        {getStatusBadge()}
                    </div>

                    {bookedProperties.property.discount > 0 && (
                        <div className="absolute top-3 left-3">
                            <span className="px-2 py-1 text-xs font-bold rounded bg-red-500 text-white">
                                {bookedProperties.property.discount}% OFF
                            </span>
                        </div>
                    )}
                </div>

                <div className="md:w-2/3 p-6">
                    <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                                {bookedProperties.property.title}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300 flex items-center gap-1 mb-3">
                                <FaMapMarkerAlt className="w-4 h-4 text-red-500" />
                                {bookedProperties.property.location}
                            </p>
                        </div>
                        
                        <div className="text-right ml-4">
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                Rs.{bookedProperties.totalPrice.toLocaleString()}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Total for {calculateNights()} {calculateNights() === 1 ? 'night' : 'nights'}
                            </p>
                            {bookedProperties.property.discount > 0 && (
                                <p className="text-xs text-gray-400 line-through">
                                    Rs.{(discountedPrice * calculateNights()).toLocaleString()}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="flex items-center gap-6 mb-4 text-sm text-gray-600 dark:text-gray-300">
                        <span className="flex items-center gap-1">
                            <FaBed className="w-3 h-3 text-blue-500" />
                            {bookedProperties.property.beds} {bookedProperties.property.beds === 1 ? 'bed' : 'beds'}
                        </span>
                        <span className="flex items-center gap-1">
                            <FaBath className="w-3 h-3 text-cyan-500" />
                            {bookedProperties.property.baths} {bookedProperties.property.baths === 1 ? 'bath' : 'baths'}
                        </span>
                        <span className="flex items-center gap-1">
                            <FaRulerCombined className="w-3 h-3 text-green-500" />
                            {bookedProperties.property.area} sq ft
                        </span>
                    </div>

                    <div className="bg-gray-50 dark:bg-slate-700 rounded-lg p-4 mb-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                                    <FaCalendarAlt className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Check-in</p>
                                    <p className="font-semibold text-gray-900 dark:text-white">
                                        {formatDate(bookedProperties.startDate)}
                                    </p>
                                </div>
                            </div>
                            
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
                                    <FaCalendarAlt className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Check-out</p>
                                    <p className="font-semibold text-gray-900 dark:text-white">
                                        {formatDate(bookedProperties.endDate)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            {bookedProperties.property.user.image ? (
                                <Image
                                    src={bookedProperties.property.user.image}
                                    alt={bookedProperties.property.user.name[0]}
                                    width={40}
                                    height={40}
                                    className="w-10 h-10 rounded-full flex items-center justify-center dark:text-white object-cover border-2 border-gray-200 dark:border-slate-600"
                                />
                            ) : (
                                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center border-2 border-gray-200 dark:border-slate-600">
                                    <FaUser className="w-4 h-4 text-white" />
                                </div>
                            )}
                            <div>
                                <p className="text-sm font-medium text-gray-900 dark:text-white">
                                    {bookedProperties.property.user.name}
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">Host</p>
                            </div>
                        </div>

                        <div className="flex gap-2">
                            <Link href={`/property/details/${bookedProperties.property.id}`}>
                                <button className="cursor-pointer px-4 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 border border-blue-600 dark:border-blue-400 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
                                    View Property
                                </button>
                            </Link>
                            
                            {isPast && (
                                <Link href={`/reviews/add/${bookedProperties.property.id}`}>
                                    <button className="cursor-pointer px-4 py-2 text-sm font-medium text-white bg-orange-600 rounded-lg hover:bg-orange-700 transition-colors">
                                        Write Review
                                    </button>
                                </Link>
                            )}
                        </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-200 dark:border-slate-600">
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                            Booked on {formatDate(bookedProperties.createdAt)} • Booking ID: {bookedProperties.id.slice(0, 8)}...
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}