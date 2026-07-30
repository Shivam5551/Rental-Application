export function SectionHeader({
    icon,
    title,
    subtitle,
}: {
    icon: React.ReactNode;
    title: string;
    subtitle?: string;
}) {
    return (
        <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 bg-orange-100 dark:bg-slate-800 rounded-lg text-orange-600 dark:text-orange-400">
                {icon}
            </div>
            <div>
                <h2 className="text-base font-semibold text-gray-900 dark:text-slate-100">
                    {title}
                </h2>
                {subtitle && (
                    <p className="text-xs text-gray-500 dark:text-slate-400 mt-0.5">{subtitle}</p>
                )}
            </div>
        </div>
    );
}
