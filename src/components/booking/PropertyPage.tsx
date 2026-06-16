'use server';

import { getProperty } from "@/actions/getProperty";
import { BookingForm } from "./BookingForm";
import { fetchBookedDates } from "@/actions/fetchBookedDates";

export async function PropertyPage({ propertyId, pricePerNight }: { propertyId: string, pricePerNight: number }) {
    const [property, bookedDates] = await Promise.all([
        getProperty(propertyId),
        fetchBookedDates(propertyId),
    ]);

    return (
        <BookingForm
            propertyId={propertyId}
            pricePerNight={pricePerNight}
            bookedDates={bookedDates}
        />
    );
}