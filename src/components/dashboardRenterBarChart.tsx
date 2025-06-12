'use client'

import { Bar, BarChart, CartesianGrid, Legend, Rectangle, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

export const RenterBarChart = () => {
    const data = [
        {
            name: 'Jan',
            'Last Year': 4000,
            'This Year': 2400,
        },
        {
            name: 'Feb',
            'Last Year': 3000,
            'This Year': 1398,
        },
        {
            name: 'Mar',
            'Last Year': 2000,
            'This Year': 900,
        },
        {
            name: 'Apr',
            'Last Year': 2780,
            'This Year': 3908,
        },
        {
            name: 'May',
            'Last Year': 1890,
            'This Year': 4800,
        },
    ];


    return (
        <div className="w-full md:w-[65%] overflow-auto h-[350] rounded-lg bg-white dark:bg-black/50 border border-gray-400">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    width={600}
                    height={300}
                    data={data}
                    margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="This Year" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
                    <Bar dataKey="Last Year" fill="#82ca9d" activeBar={<Rectangle fill="gold" stroke="purple" />} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}