import { FcGoogle } from "react-icons/fc";

interface GoogleContinueButtonProps {
    onClickHandler: () => void;
}

export function GoogleContinueButton({ onClickHandler }: GoogleContinueButtonProps) {
    return (
        <button
            type="button"
            onClick={onClickHandler}
            className="w-full py-3.5 px-6 rounded-xl text-sm font-semibold
                 bg-white dark:bg-slate-800 
                 text-gray-700 dark:text-slate-200
                 border-2 border-gray-300 dark:border-slate-700
                 hover:bg-gray-50 dark:hover:bg-slate-750
                 hover:border-gray-400 dark:hover:border-slate-600 dark:hover:text-black
                 focus:outline-none focus:ring-2 focus:ring-orange-500 dark:focus:ring-orange-400 
                 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-slate-900
                 transform transition-all duration-200
                 hover:scale-[1.02] active:scale-[0.98]
                 flex items-center justify-center gap-3"
        >
            <FcGoogle className="w-5 h-5" />
            Continue with Google
        </button>
    );
}
