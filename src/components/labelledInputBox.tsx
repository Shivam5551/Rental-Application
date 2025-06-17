export interface InputBox {
    label: string;
    type: string;
    placeholder: string;
    className?: string;
    labelClassName?: string;
}

export const LabelledInputBox = ({ label, type, placeholder, className, labelClassName }: InputBox)=> {
    return (
        <div className="flex flex-col w-full mb-3">
            <label className={`text-black font-semibold text-xl md:text-2xl mb-0.5 ${labelClassName}`} htmlFor={label}>{label}</label>
            <input required className={`${className} text-gray-600 text-base sm:text-xl font-medium p-2 focus:rounded-2xl focus:outline-0 focus:border-2 border rounded-md w-full`} aria-label={label} id={label} name={label} placeholder={placeholder} type={type}/>
        </div>
    )
}