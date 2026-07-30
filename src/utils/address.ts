// utils/address.ts
export interface GeoAddress {
    house_number?: string;
    road?: string;
    neighbourhood?: string;
    suburb?: string;
    city?: string;
    town?: string;
    village?: string;
    county?: string;
    state?: string;
    postcode?: string;
    country?: string;
    country_code?: string;
}

export interface GeoResult {
    place_id: number;
    display_name: string;
    lat: string;
    lon: string;
    address: GeoAddress;
}

export const postalCodePatterns: Record<string, RegExp> = {
    IN: /^[1-9][0-9]{5}$/,
    US: /^\d{5}(-\d{4})?$/,
    GB: /^[A-Za-z]{1,2}\d[A-Za-z\d]?\s?\d[A-Za-z]{2}$/i,
    CA: /^[A-Za-z]\d[A-Za-z]\s?\d[A-Za-z]\d$/i,
    AU: /^\d{4}$/,
};

export function isValidPostalCode(code: string, countryIso?: string) {
    if (!code?.trim()) return false;
    const pattern = countryIso ? postalCodePatterns[countryIso] : undefined;
    return pattern ? pattern.test(code.trim()) : code.trim().length >= 3;
}
