export const DashboardCard = ({ children, heading, value }: { children: React.ReactNode; heading: string; value: number }) => {
    return (
        <div className="bg-white duration-500 transform transition-all rounded-xl hover:rounded-2xl shadow-md border hover:shadow-slate-800 dark:hover:shadow-orange-300 p-2 font-semibold dark:bg-slate-800">
            <div className="flex items-center gap-2 p-2">{children} <span className="text-black dark:text-white text-xl">{heading}</span></div>
            <div className="text-black font-bold ml-2 flex items-center justify-between text-4xl dark:text-white">{value}<span className="text-5xl mr-2 hover:cursor-pointer font-extralight">{">"}</span></div>
        </div>
    )
}