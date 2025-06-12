import { GiPayMoney, GiReceiveMoney } from "react-icons/gi";
import { Icons } from "./dashboardCardContainer";
import { RenterBarChart } from "./dashboardRenterBarChart"
import Heading from "./heading"
import { SubHeading } from "./subHeading"
import { FaDownload } from "react-icons/fa";

export const RevenueOverview = () => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Nov", "Dec"];
    const month = months[new Date().getMonth() + 1];
    return (
        <div className="flex w-full bg-neutral-50 dark:bg-slate-800 mt-4 rounded-xl shadow-md border p-4 flex-col justify-start">
            <Heading className="text-left dark:text-white" title="Revenue Overview" />
            <SubHeading className="text-left dark:text-red-100" title={`Your property revenue Jan ${new Date().getFullYear() - 1} - ${month} ${new Date().getFullYear()}`} />
            <div className="flex gap-4 w-full md:flex-row flex-col">
                <RenterBarChart />
                <div className="border w-full md:w-[35%] bg-white dark:bg-slate-800/90 dark:border-gray-300 p-6 space-y-4 rounded-2xl">
                    <div className="text-black  dark:text-white ">
                        <div className="text-xl font-semibold">Total Balance</div>
                        <div className="font-extrabold text-4xl">Rs.13,100</div>
                    </div>
                    <RevenueDetailsComponent title="Total Profit" amount={1300}><Icons color="bg-green-400"><GiReceiveMoney size={35} /></Icons></RevenueDetailsComponent>
                    <RevenueDetailsComponent title="Total Expense" amount={100}><Icons color="bg-blue-300"><GiPayMoney size={35}/></Icons></RevenueDetailsComponent>
                    <button className="w-full flex items-center justify-center p-4 gap-1 font-medium duration-500 transform transition-all cursor-pointer hover:text-red-800 hover:bg-red-300 rounded-lg hover:rounded-2xl text-red-600 bg-red-200"><FaDownload /><span>Download Report</span></button>
                </div>
            </div>
        </div>
    )
}

const RevenueDetailsComponent = ({ title, amount, children }: { title: string; amount: number; children: React.ReactNode }) => {
    return (
        <div className="flex items-center space-y-1 place-items-start align-super">
            {children}
            <div className="ml-2 dark:text-white">
                <span className="flex gap-2 items-center font-medium text-xl">{title}</span>
                <div className="text-2xl font-bold">{"Rs." + amount}</div>
            </div>
        </div>
    )
}