export function FieldLabel({
    label,
    required,
    htmlFor,
}: {
    label: string;
    required?: boolean;
    htmlFor?: string;
}) {
    return (
        <label
            htmlFor={htmlFor}
            className="block text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-slate-300 mb-1.5"
        >
            {label}
            {required && <span className="text-red-500 dark:text-red-400 ml-1">*</span>}
        </label>
    );
}
