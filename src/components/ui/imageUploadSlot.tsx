// components/ui/ImageUploadSlot.tsx
import Image from "next/image";
import { IoCloudUploadOutline, IoCheckmarkCircle } from "react-icons/io5";

interface ImageUploadSlotProps {
    id: string;
    label: string;
    badge?: string;
    preview: string | null;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onRemove: () => void;
}

export function ImageUploadSlot({
    id,
    label,
    badge,
    preview,
    onChange,
    onRemove,
}: ImageUploadSlotProps) {
    return (
        <div className="space-y-2">
            <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-slate-300">
                    {label}
                </span>
                {badge && (
                    <span
                        className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                            badge === "Required"
                                ? "bg-red-100 dark:bg-red-950/30 text-red-700 dark:text-red-400"
                                : "bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-slate-400"
                        }`}
                    >
                        {badge}
                    </span>
                )}
            </div>

            {!preview ? (
                <label
                    htmlFor={id}
                    className="flex flex-col items-center justify-center h-44 rounded-xl border-2 border-dashed border-gray-300 dark:border-slate-700 cursor-pointer bg-gray-50 dark:bg-slate-800/50 hover:border-orange-500 dark:hover:border-orange-400 hover:bg-orange-50 dark:hover:bg-slate-800 transition-all group"
                >
                    <IoCloudUploadOutline
                        size={30}
                        className="text-gray-400 dark:text-slate-500 group-hover:text-orange-500 dark:group-hover:text-orange-400 transition-colors mb-2"
                    />
                    <span className="text-sm font-medium text-gray-600 dark:text-slate-400 group-hover:text-gray-900 dark:group-hover:text-slate-200 transition-colors">
                        Click to upload
                    </span>
                    <span className="text-xs text-gray-400 dark:text-slate-500 mt-1">
                        PNG, JPG, WEBP up to 10MB
                    </span>
                    <input
                        type="file"
                        id={id}
                        accept="image/*"
                        onChange={onChange}
                        className="hidden"
                    />
                </label>
            ) : (
                <div className="relative rounded-xl overflow-hidden border border-gray-200 dark:border-slate-700 group h-44">
                    <Image fill src={preview} alt={label} className="object-cover" />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button
                            type="button"
                            onClick={onRemove}
                            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-lg transition-colors"
                        >
                            Remove
                        </button>
                    </div>
                    <div className="absolute top-2 right-2 flex items-center gap-1 px-2 py-1 bg-green-500/90 text-white text-xs font-medium rounded-full">
                        <IoCheckmarkCircle size={12} />
                        Ready
                    </div>
                </div>
            )}
        </div>
    );
}
