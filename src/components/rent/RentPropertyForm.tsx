"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import { upload } from "@imagekit/next";
import { Country, State, City } from "country-state-city";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import axios from "axios";

import { ImageKitAuthenticator } from "@/utils/ImagekitAuthenticator";
import { IAuthenticator } from "../dashboard/UpdateProfile";
import { GeoResult, isValidPostalCode } from "@/utils/address";

import {
    PropertyFormData,
    Images,
    UploadedImages,
    ImagePreview,
    DEFAULT_COUNTRY,
    DEFAULT_COUNTRY_ISO,
} from "@/types/property";

import { BasicInfoSection } from "./form-sections/BasicInfoSection";
import { AddressSection } from "./form-sections/AddressSection";
import { PricingSection } from "./form-sections/PricingSection";
import { PropertyDetailsSection } from "./form-sections/PropertyDetailsSection";
import { AmenitiesSection } from "./form-sections/AmenitiesSection";
import { ImagesSection } from "./form-sections/ImageSection";

interface RentPropertyFormProps {
    property?: PropertyFormData;
    images?: Images;
    id?: string;
}

export const RentPropertyForm = ({ property, images, id }: RentPropertyFormProps) => {
    const router = useRouter();
    const abortControllerRef = useRef<AbortController | null>(null);

    const [formData, setFormData] = useState<PropertyFormData>(
        property ?? {
            title: "",
            description: "",
            price: 0,
            discount: 0,
            beds: 0,
            baths: 0,
            area: 0,
            address: "",
            city: "",
            state: "",
            country: DEFAULT_COUNTRY,
            postalCode: "",
            latitude: null,
            longitude: null,
            petfriendly: false,
            firesafety: false,
        }
    );

    const [postalCodeTouched, setPostalCodeTouched] = useState(false);
    const [locating, setLocating] = useState(false);

    const [imagePreview, setImagePreview] = useState<ImagePreview>(
        images
            ? {
                  showcase: images.showcase,
                  image1: images.image1,
                  image2: images.image2,
              }
            : { showcase: null, image1: null, image2: null }
    );

    const [uploadedImages, setUploadedImages] = useState<UploadedImages>({
        showcase: null,
        image1: null,
        image2: null,
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    // ── country / state / city data
    const countries = useMemo(() => Country.getAllCountries(), []);
    const countryIso = useMemo(
        () => countries.find((c) => c.name === formData.country)?.isoCode ?? DEFAULT_COUNTRY_ISO,
        [countries, formData.country]
    );

    const states = useMemo(() => State.getStatesOfCountry(countryIso), [countryIso]);
    const stateNames = useMemo(() => states.map((s) => s.name), [states]);

    const selectedStateObj = useMemo(
        () => states.find((s) => s.name === formData.state),
        [states, formData.state]
    );

    const cities = useMemo(() => {
        if (!selectedStateObj) return [];
        return City.getCitiesOfState(countryIso, selectedStateObj.isoCode);
    }, [countryIso, selectedStateObj]);

    const postalCodeValid = useMemo(
        () => isValidPostalCode(formData.postalCode, countryIso),
        [formData.postalCode, countryIso]
    );

    // ── handlers
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
        }));
    };

    const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFormData((prev) => ({
            ...prev,
            country: e.target.value,
            state: "",
            city: "",
        }));
    };

    const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFormData((prev) => ({ ...prev, state: e.target.value, city: "" }));
    };

    const handleNumberChange = (name: string, val: number) => {
        setFormData((prev) => ({ ...prev, [name]: val }));
    };

    const applyGeoResult = useCallback((result: GeoResult) => {
        const addr = result.address ?? {};
        const line = [addr.house_number, addr.road].filter(Boolean).join(" ");

        setFormData((prev) => ({
            ...prev,
            address: line || result.display_name.split(",")[0],
            city: addr.city || addr.town || addr.village || addr.suburb || prev.city,
            state: addr.state || prev.state,
            country: addr.country || prev.country,
            postalCode: addr.postcode || prev.postalCode,
            latitude: parseFloat(result.lat),
            longitude: parseFloat(result.lon),
        }));
        setPostalCodeTouched(true);
    }, []);

    const handleUseCurrentLocation = () => {
        if (!navigator.geolocation) {
            toast.error("Geolocation is not supported by your browser");
            return;
        }
        setLocating(true);
        navigator.geolocation.getCurrentPosition(
            async (pos) => {
                try {
                    const { latitude, longitude } = pos.coords;
                    const res = await fetch(
                        `/api/geocode/reverse?lat=${latitude}&lon=${longitude}`
                    );
                    const data: GeoResult = await res.json();
                    if (data?.address) {
                        applyGeoResult(data);
                        toast.success("Location detected");
                    } else {
                        toast.error("Could not resolve your address");
                    }
                } catch {
                    toast.error("Failed to detect address");
                } finally {
                    setLocating(false);
                }
            },
            () => {
                toast.error("Location permission denied");
                setLocating(false);
            }
        );
    };

    // ── image upload
    const authenticator = useCallback(async () => {
        const data = await ImageKitAuthenticator();
        if (!data) {
            toast.error("Failed to Authenticate");
            return null;
        }
        const { signature, expire, token, publicKey }: IAuthenticator = data;
        return { signature, expire, token, publicKey };
    }, []);

    const handleUpload = useCallback(
        async (file: File) => {
            const authParams = await authenticator();
            if (!authParams) return;
            abortControllerRef.current = new AbortController();
            try {
                const res = await upload({
                    ...authParams,
                    file,
                    fileName: file.name,
                    abortSignal: abortControllerRef.current.signal,
                });
                return res.url;
            } catch {
                toast.error("Unable to upload image");
            }
        },
        [authenticator]
    );

    const handleFileChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        type: "showcase" | "image1" | "image2"
    ) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const preview = URL.createObjectURL(file);

        if (type === "showcase") {
            setUploadedImages((c) => ({ ...c, showcase: file }));
            setImagePreview((c) => ({ ...c, showcase: preview }));
            return;
        }
        if (type === "image1" && (uploadedImages.showcase || imagePreview.showcase)) {
            setUploadedImages((c) => ({ ...c, image1: file }));
            setImagePreview((c) => ({ ...c, image1: preview }));
            return;
        }
        if (type === "image2" && (uploadedImages.image1 || imagePreview.image1)) {
            setUploadedImages((c) => ({ ...c, image2: file }));
            setImagePreview((c) => ({ ...c, image2: preview }));
        }
    };

    const removeImage = (type: "showcase" | "image1" | "image2") => {
        setUploadedImages((c) => ({ ...c, [type]: null }));
        setImagePreview((c) => ({ ...c, [type]: null }));
    };

    const handleSubmit = async () => {
        setPostalCodeTouched(true);

        if (!uploadedImages.showcase && !imagePreview.showcase) {
            toast.error("A showcase image is required");
            return;
        }
        if (
            !formData.address.trim() ||
            !formData.city.trim() ||
            !formData.state.trim() ||
            !formData.country.trim()
        ) {
            toast.error("Please complete the full address");
            return;
        }
        if (!postalCodeValid) {
            toast.error("Please enter a valid postal code");
            return;
        }

        setIsSubmitting(true);
        try {
            const resolveUrl = async (file: File | null | undefined, fallback: string | null) => {
                if (!file) return fallback;
                const url = await handleUpload(file);
                return url ?? fallback;
            };

            const [showcaseUri, image1Uri, image2Uri] = await Promise.all([
                resolveUrl(uploadedImages.showcase, imagePreview.showcase),
                resolveUrl(uploadedImages.image1, imagePreview.image1),
                resolveUrl(uploadedImages.image2, imagePreview.image2),
            ]);

            if (!showcaseUri) {
                toast.error("Showcase upload failed");
                return;
            }

            const response = await axios.post("/api/properties", {
                ...formData,
                showcaseimage: showcaseUri,
                image1: image1Uri,
                image2: image2Uri,
                id,
            });

            if (response.data.success) {
                toast.success(response.data.message);
                toast.info("Redirecting to your profile…");
                setTimeout(() => router.push("/profile/renter"), 1500);
            }
        } catch {
            toast.error("Failed to list property. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const hasShowcase = !!(uploadedImages.showcase || imagePreview.showcase);

    return (
        <div className="min-h-screen bg-orange-50 dark:bg-slate-950 p-4 sm:p-8">
            <form action={handleSubmit} className="space-y-4 max-w-2xl mx-auto">
                <div className="mb-2">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-slate-100">
                        {id ? "Edit Property" : "List Your Property"}
                    </h1>
                    <p className="text-sm text-gray-600 dark:text-slate-400 mt-1">
                        {id
                            ? "Update your property details below."
                            : "Fill in the details to get your property listed."}
                    </p>
                </div>

                <BasicInfoSection
                    title={formData.title}
                    description={formData.description}
                    onChange={handleInputChange}
                />

                <AddressSection
                    formData={formData}
                    countries={countries}
                    stateNames={stateNames}
                    cities={cities}
                    postalCodeValid={postalCodeValid}
                    postalCodeTouched={postalCodeTouched}
                    locating={locating}
                    onCountryChange={handleCountryChange}
                    onStateChange={handleStateChange}
                    onInputChange={handleInputChange}
                    onGeoSelect={applyGeoResult}
                    onUseCurrentLocation={handleUseCurrentLocation}
                    setPostalCodeTouched={setPostalCodeTouched}
                />

                <PricingSection
                    price={formData.price}
                    discount={formData.discount}
                    onChange={handleNumberChange}
                />

                <PropertyDetailsSection
                    beds={formData.beds}
                    baths={formData.baths}
                    area={formData.area}
                    onChange={handleNumberChange}
                />

                <AmenitiesSection
                    petfriendly={formData.petfriendly}
                    firesafety={formData.firesafety}
                    onChange={handleInputChange}
                />

                <ImagesSection
                    imagePreview={imagePreview}
                    hasShowcase={hasShowcase}
                    onFileChange={handleFileChange}
                    onRemove={removeImage}
                />

                <button
                    type="submit"
                    disabled={isSubmitting || !hasShowcase}
                    className="w-full py-3 px-6 rounded-xl text-sm font-semibold text-white 
                     bg-orange-500 hover:bg-orange-600 active:bg-orange-700
                     dark:bg-orange-600 dark:hover:bg-orange-500 dark:active:bg-orange-700
                     disabled:bg-gray-300 dark:disabled:bg-slate-700 
                     disabled:text-gray-500 dark:disabled:text-slate-500 
                     disabled:cursor-not-allowed
                     focus:outline-none focus:ring-2 focus:ring-orange-500 dark:focus:ring-orange-400 
                     focus:ring-offset-2 focus:ring-offset-orange-50 dark:focus:ring-offset-slate-950
                     transition-all"
                >
                    {isSubmitting ? (
                        <span className="flex items-center justify-center gap-2">
                            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                />
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8v8z"
                                />
                            </svg>
                            {id ? "Updating…" : "Listing Property…"}
                        </span>
                    ) : id ? (
                        "Update Property"
                    ) : (
                        "List My Property"
                    )}
                </button>
            </form>
        </div>
    );
};
