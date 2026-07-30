// components/rent/form-sections/PropertyDetailsSection.tsx
import { IoExpandOutline, IoBedOutline, IoWaterOutline } from "react-icons/io5";
import { SectionCard } from "@/components/ui/sectionCard";
import { SectionHeader } from "@/components/ui/sectionHeader";
import { NumberStepper } from "@/components/ui/numberStepper";

interface PropertyDetailsSectionProps {
    beds: number;
    baths: number;
    area: number;
    onChange: (name: string, val: number) => void;
}

export function PropertyDetailsSection({
    beds,
    baths,
    area,
    onChange,
}: PropertyDetailsSectionProps) {
    return (
        <SectionCard>
            <SectionHeader
                icon={<IoExpandOutline size={18} />}
                title="Property Details"
                subtitle="Help guests know what to expect"
            />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <NumberStepper
                    icon={<IoBedOutline size={15} />}
                    label="Beds"
                    name="beds"
                    value={beds}
                    onChange={onChange}
                    required
                />
                <NumberStepper
                    icon={<IoWaterOutline size={15} />}
                    label="Baths"
                    name="baths"
                    value={baths}
                    onChange={onChange}
                    required
                />
                <NumberStepper
                    icon={<IoExpandOutline size={15} />}
                    label="Area (sq ft)"
                    name="area"
                    value={area}
                    onChange={onChange}
                    required
                />
            </div>
        </SectionCard>
    );
}
