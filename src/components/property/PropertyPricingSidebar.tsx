import Image from "next/image";
import { BookNowButton } from "@/components/buttons/BookNowButton";

interface Host {
    id: string;
    name: string;
    image: string | null;
    email: string;
}

interface PropertyPricingSidebarProps {
    propertyId: string;
    price: number;
    discount: number;
    host: Host;
}

export function PropertyPricingSidebar({
    propertyId,
    price,
    discount,
    host,
}: PropertyPricingSidebarProps) {
    const discountedPrice: number =
        discount > 0 ? (price / 100) * (1 - discount / 10000) : price / 100;

    return (
        <div className="bg-white dark:bg-slate-800 rounded-lg p-6 sticky top-20">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Pricing</h3>

            <div className="mb-6">
                {discount > 0 ? (
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <span className="text-3xl font-bold text-gray-900 dark:text-white">
                                Rs.{discountedPrice.toLocaleString()}
                            </span>
                            <span className="text-lg text-gray-500 dark:text-gray-400 line-through">
                                Rs.{(price / 100).toLocaleString()}
                            </span>
                        </div>
                        <div className="bg-red-100 text-red-800 px-2 py-1 rounded text-sm inline-block">
                            {discount / 100}% OFF
                        </div>
                    </div>
                ) : (
                    <span className="text-3xl font-bold text-gray-900 dark:text-white">
                        Rs.{(price / 100).toLocaleString()}
                    </span>
                )}
                <span className="text-gray-600 dark:text-gray-300 ml-2">/night</span>
            </div>

            <BookNowButton id={propertyId} />

            <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Hosted by</h4>
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center">
                        {host.image ? (
                            <Image
                                width={48}
                                height={48}
                                src={host.image}
                                alt={host.name}
                                className="w-full h-full rounded-full object-cover"
                            />
                        ) : (
                            <span className="text-lg font-medium text-gray-600 dark:text-gray-300">
                                {host.name.charAt(0).toUpperCase()}
                            </span>
                        )}
                    </div>
                    <div>
                        <div className="font-medium text-gray-900 dark:text-white">{host.name}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-300">
                            Property Owner
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
