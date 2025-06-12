export const SubHeading = ({ title, className }: { title: string; className?: string }) => {
    return (
        <div className={`text-base font-light text-neutral-500 mb-4 ${className}`}>
            {title}
        </div>
    )
}