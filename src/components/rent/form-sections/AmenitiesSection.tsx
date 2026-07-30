// components/rent/form-sections/AmenitiesSection.tsx
import { IoPawOutline, IoFlameOutline } from "react-icons/io5";
import { SectionCard } from "@/components/ui/sectionCard";
import { SectionHeader } from "@/components/ui/sectionHeader";
import { ToggleCard } from "@/components/ui/toggleCard";

interface AmenitiesSectionProps {
    petfriendly: boolean;
    firesafety: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function AmenitiesSection({ petfriendly, firesafety, onChange }: AmenitiesSectionProps) {
    return (
        <SectionCard>
            <SectionHeader
                icon={<IoPawOutline size={18} />}
                title="Amenities & Safety"
                subtitle="Let guests know about key features"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <ToggleCard
                    icon={<IoPawOutline size={17} />}
                    label="Pet Friendly"
                    description="Guests can bring their pets"
                    name="petfriendly"
                    checked={petfriendly}
                    onChange={onChange}
                />
                <ToggleCard
                    icon={<IoFlameOutline size={17} />}
                    label="Fire Safety"
                    description="Has fire safety equipment"
                    name="firesafety"
                    checked={firesafety}
                    onChange={onChange}
                />
            </div>
        </SectionCard>
    );
}
