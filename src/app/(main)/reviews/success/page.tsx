'use client';
import { useSearchParams } from 'next/navigation';
import { ReviewSuccess } from '@/components/reviews';
import { Suspense } from 'react';

export default function ReviewSuccessPage() {

    return (
        <Suspense fallback={<div className="flex justify-center items-center min-h-screen">Loading...</div>}>
            <Success />
        </Suspense>
    );
}

function Success() {
    const searchParams = useSearchParams();
    const propertyTitle = searchParams.get('propertyTitle');
    const propertyId = searchParams.get('propertyId');

    return (
        <ReviewSuccess
            propertyTitle={propertyTitle || undefined}
            propertyId={propertyId || undefined}
        />
    )
}
