import { IoAddOutline, IoRemoveOutline } from "react-icons/io5";
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

const noSpinner = `
  [appearance:textfield]
  [&::-webkit-outer-spin-button]:appearance-none
  [&::-webkit-inner-spin-button]:appearance-none
`.trim();

interface NumberStepperProps {
    icon?: React.ReactNode;
    label: string;
    name: string;
    value: number;
    onChange: (name: string, val: number) => void;
    min?: number;
    max?: number;
    required?: boolean;
    prefix?: React.ReactNode;
    hint?: string;
}

export function NumberStepper({
    icon,
    label,
    name,
    value,
    onChange,
    min = 0,
    max,
    required,
    prefix,
    hint,
}: NumberStepperProps) {
    const step = (dir: 1 | -1) => {
        const next = value + dir;
        if (next < min) return;
        if (max !== undefined && next > max) return;
        onChange(name, next);
    };

    return (
        <div>
            <FieldLabel label={label} required={required} htmlFor={name} />
            <div className="flex items-center rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 overflow-hidden">
                {(icon || prefix) && (
                    <span className="flex items-center pl-3 text-gray-500 dark:text-slate-400 shrink-0">
                        {prefix ?? icon}
                    </span>
                )}
                <input
                    id={name}
                    name={name}
                    type="number"
                    value={value === 0 ? "" : value}
                    min={min}
                    max={max}
                    required={required}
                    placeholder="0"
                    onChange={(e) => {
                        const raw = e.target.value;
                        if (raw === "") {
                            onChange(name, 0);
                            return;
                        }
                        const n = parseInt(raw, 10);
                        if (!isNaN(n) && n >= min && (max === undefined || n <= max)) {
                            onChange(name, n);
                        }
                    }}
                    className={`flex-1 px-3 py-2.5 text-sm bg-transparent text-gray-900 dark:text-slate-100 placeholder:text-gray-400 dark:placeholder:text-slate-500 focus:outline-none ${noSpinner}`}
                />
                <div className="flex flex-col border-l border-gray-300 dark:border-slate-700">
                    <button
                        type="button"
                        onClick={() => step(1)}
                        disabled={max !== undefined && value >= max}
                        className="px-2.5 py-1.5 text-gray-600 dark:text-slate-300 hover:text-gray-900 dark:hover:text-slate-100 hover:bg-gray-100 dark:hover:bg-slate-700 border-b border-gray-300 dark:border-slate-700 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                        <IoAddOutline size={12} />
                    </button>
                    <button
                        type="button"
                        onClick={() => step(-1)}
                        disabled={value <= min}
                        className="px-2.5 py-1.5 text-gray-600 dark:text-slate-300 hover:text-gray-900 dark:hover:text-slate-100 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                        <IoRemoveOutline size={12} />
                    </button>
                </div>
            </div>
            {hint && <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">{hint}</p>}
        </div>
    );
}
