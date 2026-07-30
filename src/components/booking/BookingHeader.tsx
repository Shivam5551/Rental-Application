// components/booking/BookingHeader.tsx
interface BookingHeaderProps {
    propertyTitle: string;
    address?: string;
    city: string;
    state: string;
    postalCode?: string;
    country?: string;
}

export function BookingHeader({
    propertyTitle,
    address,
    city,
    state,
    postalCode,
    country,
}: BookingHeaderProps) {
    const formattedLocation =
        `${city}, ${state}` +
        (country ? `, ${country}` : "") +
        (postalCode ? ` ${postalCode}` : "");

    return (
        <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Complete Your Booking
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">{propertyTitle}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">{formattedLocation}</p>
        </div>
    );
}
