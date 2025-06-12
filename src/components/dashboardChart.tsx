'use client';

import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts"

interface Data {
    name: string,
    value: number,
    color: string
}

export const DashboardChart = ({ data }: {data: Data[]}) => {
    
    return (
        <div className="w-full  h-[280px] flex justify-center">
            <ResponsiveContainer width={"100%"} height={"100%"}>
                <PieChart width={400} height={250}>
                    <Pie
                        data={data}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        label
                    >
                    {data.map((entry: Data, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                    </Pie>
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}