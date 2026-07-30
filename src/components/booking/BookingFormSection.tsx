import { BookingForm } from "@/components/booking/BookingForm";
import { PropertyPage } from "./PropertyPage";

interface BookingFormSectionProps {
    propertyId: string;
    pricePerNight: number;
    propertyTitle: string;
}

export function BookingFormSection({ propertyId, pricePerNight }: BookingFormSectionProps) {
    return (
        <div className="bg-white dark:bg-slate-800 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Booking Details
            </h2>
            <PropertyPage propertyId={propertyId} pricePerNight={pricePerNight} />
        </div>
    );
}
