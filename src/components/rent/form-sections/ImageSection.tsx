// components/rent/form-sections/ImagesSection.tsx
import { IoImagesOutline } from "react-icons/io5";
import { SectionCard } from "@/components/ui/sectionCard";
import { SectionHeader } from "@/components/ui/sectionHeader";
import { ImageUploadSlot } from "@/components/ui/imageUploadSlot";
import { ImagePreview } from "@/types/property";

interface ImagesSectionProps {
    imagePreview: ImagePreview;
    hasShowcase: boolean;
    onFileChange: (
        e: React.ChangeEvent<HTMLInputElement>,
        type: "showcase" | "image1" | "image2"
    ) => void;
    onRemove: (type: "showcase" | "image1" | "image2") => void;
}

export function ImagesSection({
    imagePreview,
    hasShowcase,
    onFileChange,
    onRemove,
}: ImagesSectionProps) {
    const hasImage1 = !!imagePreview.image1;

    return (
        <SectionCard>
            <SectionHeader
                icon={<IoImagesOutline size={18} />}
                title="Property Images"
                subtitle="Upload photos to attract more guests"
            />
            <div className="space-y-4">
                <ImageUploadSlot
                    id="showcase"
                    label="Showcase Image"
                    badge="Required"
                    preview={imagePreview.showcase}
                    onChange={(e) => onFileChange(e, "showcase")}
                    onRemove={() => onRemove("showcase")}
                />
                {hasShowcase && (
                    <div className="grid grid-cols-2 gap-4">
                        <ImageUploadSlot
                            id="image1"
                            label="Additional Image 1"
                            badge="Optional"
                            preview={imagePreview.image1}
                            onChange={(e) => onFileChange(e, "image1")}
                            onRemove={() => onRemove("image1")}
                        />
                        {hasImage1 && (
                            <ImageUploadSlot
                                id="image2"
                                label="Additional Image 2"
                                badge="Optional"
                                preview={imagePreview.image2}
                                onChange={(e) => onFileChange(e, "image2")}
                                onRemove={() => onRemove("image2")}
                            />
                        )}
                    </div>
                )}
            </div>
        </SectionCard>
    );
}
