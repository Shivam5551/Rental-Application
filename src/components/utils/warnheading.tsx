interface WarnHeadingProps {
    message: string;
    actionText: string;
    onAction: () => void;
}

export default function WarnHeading({ message, actionText, onAction }: WarnHeadingProps) {
    return (
        <p className="text-center text-sm text-gray-600 dark:text-slate-400">
            {message}{" "}
            <button
                type="button"
                onClick={onAction}
                className="font-semibold text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 hover:underline transition-colors"
            >
                {actionText}
            </button>
        </p>
    );
}
