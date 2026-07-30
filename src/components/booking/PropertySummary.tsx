import Image from "next/image";
import { IoLocationOutline, IoMapOutline } from "react-icons/io5";

interface PropertySummaryProps {
    title: string;
    showcaseImage: string;
    price: number;
    discount: number;
    discountedPrice: string;
    address: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
    latitude?: number | null;
    longitude?: number | null;
}

export function PropertySummary({
    title,
    showcaseImage,
    price,
    discount,
    discountedPrice,
    address,
    city,
    state,
    country,
    postalCode,
    latitude,
    longitude,
}: PropertySummaryProps) {
    // NOTE: price/discount math kept as-is from the original component
    // (price appears to be stored in paise, discount as basis points).
    // Double-check this matches how RentPropertyForm computes price server-side.

    const originalPrice = (price / 100).toFixed(2);

    const formattedAddress = [address, city, state, postalCode].filter(Boolean).join(", ");

    const mapsUrl =
        latitude != null && longitude != null
            ? `https://www.google.com/maps?q=${latitude},${longitude}`
            : `https://www.google.com/maps?q=${encodeURIComponent(
                  [address, city, state, country].filter(Boolean).join(", ")
              )}`;

    return (
        <div className="bg-white dark:bg-slate-800 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Property Summary
            </h2>

            <div className="relative aspect-video rounded-lg overflow-hidden mb-4 bg-gray-100 dark:bg-slate-700">
                <Image
                    fill
                    src={showcaseImage}
                    alt={title}
                    sizes="(max-width: 768px) 100vw, 400px"
                    className="object-cover"
                />
            </div>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{title}</h3>

            <div className="mb-4">
                <div className="flex items-start gap-1.5 text-gray-600 dark:text-gray-300">
                    <IoLocationOutline
                        size={18}
                        className="mt-0.5 shrink-0 text-gray-400 dark:text-gray-500"
                    />
                    <div className="min-w-0">
                        <p className="text-sm leading-snug">{formattedAddress}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{country}</p>
                    </div>
                </div>

                <a
                    href={mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 mt-1.5 text-xs font-medium text-blue-600 dark:text-blue-400 hover:underline"
                >
                    <IoMapOutline size={13} />
                    View on map
                </a>
            </div>

            <div className="flex items-center justify-between border-t border-gray-100 dark:border-slate-700 pt-4">
                <div className="flex items-center">
                    {discount > 0 ? (
                        <div className="flex items-center gap-2">
                            <span className="text-2xl font-bold text-gray-900 dark:text-white">
                                ₹{Number(discountedPrice).toLocaleString("en-IN")}
                            </span>
                            <span className="text-lg text-gray-500 dark:text-gray-400 line-through">
                                ₹{Number(originalPrice).toLocaleString("en-IN")}
                            </span>
                        </div>
                    ) : (
                        <span className="text-2xl font-bold text-gray-900 dark:text-white">
                            ₹{Number(originalPrice).toLocaleString("en-IN")}
                        </span>
                    )}
                    <span className="text-gray-600 dark:text-gray-300 ml-2 text-sm">/Night</span>
                </div>
            </div>
        </div>
    );
}
