// types/property.ts
export interface PropertyFormData {
    title: string;
    description: string;
    price: number;
    discount: number; // percentage (0-100)
    beds: number;
    baths: number;
    area: number;
    address: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
    latitude: number | null;
    longitude: number | null;
    petfriendly: boolean;
    firesafety: boolean;
}

export interface Images {
    showcase: string;
    image1: string;
    image2: string;
}

export interface UploadedImages {
    showcase: File | null;
    image1: File | null;
    image2: File | null;
}

export interface ImagePreview {
    showcase: string | null;
    image1: string | null;
    image2: string | null;
}

export const DEFAULT_COUNTRY = "India";
export const DEFAULT_COUNTRY_ISO = "IN";
