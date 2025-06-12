interface WarnHeadingProps {
    message: string;
    actionText: string;
    onAction: () => void;
}

const WarnHeading: React.FC<WarnHeadingProps> = ({
    message,
    actionText,
    onAction,
}) => (
    <div className="flex border-t border-t-gray-400 mt-4 items-center justify-center space-x-2 p-2">
        <span className="sm:flex hidden text-gray-700">{message}</span>
        <button
            className="text-blue-600 hover:cursor-pointer font-semibold hover:underline focus:outline-none"
            onClick={onAction}
            type="button"
        >
            {actionText}
        </button>
    </div>
);

export default WarnHeading;