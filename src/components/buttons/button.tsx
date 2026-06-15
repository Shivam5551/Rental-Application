import { ReactNode } from "react";

export const Button = ({ btClass, children }: { btClass: string, children: ReactNode}) => {
    return (
        <button className={`${btClass} px-7 py-3 rounded-lg flex items-center justify-center`}>
            {children}
        </button>
    );  
};