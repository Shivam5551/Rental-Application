// components/ui/SelectField.tsx
import { IoChevronDownOutline } from "react-icons/io5";
import { FieldLabel } from "./fieldLabel";

const inputCls = `
  w-full px-3 py-2.5 text-sm rounded-lg border 
  border-gray-300 dark:border-slate-700
  bg-white dark:bg-slate-800 
  text-gray-900 dark:text-slate-100 
  placeholder:text-gray-400 dark:placeholder:text-slate-500
  focus:outline-none focus:ring-2 focus:ring-orange-500 dark:focus:ring-orange-400 focus:border-transparent
  transition-colors
`.trim();

interface SelectFieldProps {
    label: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    options: string[];
    required?: boolean;
    placeholder?: string;
    disabled?: boolean;
}

export function SelectField({
    label,
    name,
    value,
    onChange,
    options,
    required,
    placeholder,
    disabled,
}: SelectFieldProps) {
    return (
        <div>
            <FieldLabel label={label} required={required} htmlFor={name} />
            <div className="relative">
                <select
                    id={name}
                    name={name}
                    value={value}
                    onChange={onChange}
                    required={required}
                    disabled={disabled}
                    className={`${inputCls} appearance-none pr-9 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                    <option value="" disabled>
                        {placeholder ?? `Select ${label}`}
                    </option>
                    {options.map((o) => (
                        <option key={o} value={o}>
                            {o}
                        </option>
                    ))}
                </select>
                <IoChevronDownOutline
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-slate-400 pointer-events-none"
                    size={14}
                />
            </div>
        </div>
    );
}
