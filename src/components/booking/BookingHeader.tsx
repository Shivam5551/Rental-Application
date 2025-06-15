interface BookingHeaderProps {
  propertyTitle: string;
  location: string;
}

export function BookingHeader({ propertyTitle, location }: BookingHeaderProps) {
  return (
    <div className="mb-8">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
        Book {propertyTitle}
      </h1>
      <p className="text-gray-600 dark:text-gray-300">
        Complete your booking for this amazing property in {location}
      </p>
    </div>
  );
}
