// components/rent/form-sections/BasicInfoSection.tsx
import { IoHomeOutline } from "react-icons/io5";
import { SectionCard } from "@/components/ui/sectionCard";
import { SectionHeader } from "@/components/ui/sectionHeader";
import { FieldLabel } from "@/components/ui/fieldLabel";

const inputCls = `
  w-full px-3 py-2.5 text-sm rounded-lg border 
  border-gray-300 dark:border-slate-700
  bg-white dark:bg-slate-800 
  text-gray-900 dark:text-slate-100 
  placeholder:text-gray-400 dark:placeholder:text-slate-500
  focus:outline-none focus:ring-2 focus:ring-orange-500 dark:focus:ring-orange-400 focus:border-transparent
  transition-colors
`.trim();

interface BasicInfoSectionProps {
    title: string;
    description: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export function BasicInfoSection({ title, description, onChange }: BasicInfoSectionProps) {
    return (
        <SectionCard>
            <SectionHeader
                icon={<IoHomeOutline size={18} />}
                title="Basic Information"
                subtitle="Tell guests about your property"
            />
            <div className="space-y-4">
                <div>
                    <FieldLabel label="Property Title" required htmlFor="title" />
                    <input
                        id="title"
                        name="title"
                        type="text"
                        value={title}
                        onChange={onChange}
                        required
                        placeholder="e.g. Cozy 2BHK near Marine Drive"
                        className={inputCls}
                    />
                </div>

                <div>
                    <FieldLabel label="Description" required htmlFor="description" />
                    <textarea
                        id="description"
                        name="description"
                        value={description}
                        onChange={onChange}
                        required
                        rows={4}
                        placeholder="Describe what makes your property special…"
                        className={`${inputCls} resize-none`}
                    />
                </div>
            </div>
        </SectionCard>
    );
}
