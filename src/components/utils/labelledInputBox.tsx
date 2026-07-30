interface LabelledInputBoxProps {
    children?: React.ReactNode;
    labelClassName?: string;
    label: string;
    placeholder: string;
    type: string;
}

export function LabelledInputBox({
    children,
    labelClassName,
    label,
    placeholder,
    type,
}: LabelledInputBoxProps) {
    return (
        <div className="relative">
            {children && (
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-slate-500 pointer-events-none">
                    {children}
                </div>
            )}
            <input
                name={label}
                type={type}
                placeholder={placeholder}
                required
                className={`${labelClassName} w-full pl-10 pr-4 py-3 text-sm rounded-xl border border-gray-300 dark:border-slate-700
                 bg-white text-gray-900  
                 placeholder:text-gray-400 dark:placeholder:text-slate-500
                 focus:outline-none focus:ring-2 focus:ring-orange-500 dark:focus:ring-orange-400 
                 focus:border-transparent
                 transition-all duration-200
                 hover:border-gray-400 dark:hover:border-slate-600}`}
            />
        </div>
    );
}
