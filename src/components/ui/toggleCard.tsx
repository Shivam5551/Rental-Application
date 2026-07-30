interface ToggleCardProps {
    icon: React.ReactNode;
    label: string;
    description: string;
    name: string;
    checked: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function ToggleCard({ icon, label, description, name, checked, onChange }: ToggleCardProps) {
    return (
        <label
            htmlFor={name}
            className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all select-none
        ${
            checked
                ? "border-orange-500 dark:border-orange-400 bg-orange-50 dark:bg-orange-950/20"
                : "border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-gray-300 dark:hover:border-slate-600"
        }`}
        >
            <div
                className={`p-2 rounded-lg transition-colors ${
                    checked
                        ? "bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400"
                        : "bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-slate-400"
                }`}
            >
                {icon}
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-slate-100">{label}</p>
                <p className="text-xs text-gray-500 dark:text-slate-400 mt-0.5">{description}</p>
            </div>
            <div className="relative shrink-0">
                <input
                    type="checkbox"
                    id={name}
                    name={name}
                    checked={checked}
                    onChange={onChange}
                    className="sr-only"
                />
                <div
                    className={`w-11 h-6 rounded-full transition-colors ${
                        checked
                            ? "bg-orange-500 dark:bg-orange-400"
                            : "bg-gray-300 dark:bg-slate-600"
                    }`}
                />
                <div
                    className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                        checked ? "translate-x-6" : "translate-x-1"
                    }`}
                />
            </div>
        </label>
    );
}
