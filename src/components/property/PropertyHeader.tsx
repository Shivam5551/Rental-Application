import { FaMapMarkerAlt, FaCheckCircle } from "react-icons/fa";

interface PropertyHeaderProps {
    title: string;
    address: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
    verified?: boolean;
}

export function PropertyHeader({
    title,
    address,
    city,
    state,
    country,
    postalCode,
    verified,
}: PropertyHeaderProps) {
    const location = `${address}, ${city}, ${state} ${postalCode}, ${country}`;

    return (
        <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">{title}</h1>
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                <FaMapMarkerAlt className="w-4 h-4" />
                <span>{location}</span>
                {verified && (
                    <span className="ml-4 bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm flex items-center gap-1">
                        <FaCheckCircle className="w-3 h-3" />
                        Verified
                    </span>
                )}
            </div>
        </div>
    );
}
