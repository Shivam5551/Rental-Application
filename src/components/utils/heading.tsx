interface HeadingProps {
    title: string;
    className?: string;
}

const Heading: React.FC<HeadingProps> = ({ title, className }) => (
    <h1 className={`text-4xl font-extrabold text-center text-black mt-4 mb-2 tracking-wide ${className}`}>
        {title}
    </h1>
);

export default Heading;
