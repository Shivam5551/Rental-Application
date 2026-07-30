import { MdCurrencyRupee } from "react-icons/md";
import { SectionCard } from "@/components/ui/sectionCard";
import { SectionHeader } from "@/components/ui/sectionHeader";
import { NumberStepper } from "@/components/ui/numberStepper";

interface PricingSectionProps {
    price: number;
    discount: number;
    onChange: (name: string, val: number) => void;
}

export function PricingSection({ price, discount, onChange }: PricingSectionProps) {
    const discountAmount = (price * discount) / 100;
    const effectivePrice = Math.max(price - discountAmount, 0);
    const hasDiscount = discount > 0 && price > 0;

    return (
        <SectionCard>
            <SectionHeader
                icon={<MdCurrencyRupee size={18} />}
                title="Pricing"
                subtitle="Set your nightly rate and optional discount"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <NumberStepper
                    label="Price per Night (₹)"
                    name="price"
                    value={price}
                    onChange={onChange}
                    min={1}
                    required
                    prefix={
                        <MdCurrencyRupee size={15} className="text-gray-500 dark:text-slate-400" />
                    }
                />
                <NumberStepper
                    label="Discount (%)"
                    name="discount"
                    value={discount}
                    onChange={onChange}
                    min={0}
                    max={100}
                    hint="Percentage off (0-100%)"
                />
            </div>

            {price > 0 && (
                <div
                    className={`mt-4 px-4 py-3 rounded-lg border text-sm font-medium ${
                        hasDiscount
                            ? "border-green-500/30 dark:border-green-400/30 bg-green-50 dark:bg-green-950/20 text-green-700 dark:text-green-400"
                            : "border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 text-gray-700 dark:text-slate-300"
                    }`}
                >
                    Guests pay{" "}
                    <span className="font-bold text-gray-900 dark:text-slate-100">
                        ₹{Math.round(effectivePrice).toLocaleString("en-IN")}
                    </span>{" "}
                    per night
                    {hasDiscount && (
                        <>
                            <span className="ml-2 line-through text-gray-500 dark:text-slate-400">
                                ₹{price.toLocaleString("en-IN")}
                            </span>
                            <span className="ml-2 text-xs font-normal">
                                ({discount}% off • Save ₹
                                {Math.round(discountAmount).toLocaleString("en-IN")})
                            </span>
                        </>
                    )}
                </div>
            )}
        </SectionCard>
    );
}
