import React from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer,
} from "recharts";

import { getMonthlySpending } from "../../utils/chartUtils";
import { useSelector } from "react-redux";

function MonthlySpendingChart() {
    const expenses = useSelector(state => state.expense.expenseList);

    const data = getMonthlySpending(expenses);

    return (
        <div
            style={{
                width: "100%",
                height: 300,
                background: "white",
                borderRadius: "16px",
                padding: "20px",
            }}
        >
            <h5>Monthly Spending</h5>

            <ResponsiveContainer width="100%" height="85%">
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                        dataKey="month"
                        interval={0}
                        angle={0}
                        dy={10}
                    />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="amount" fill="#6f42c1" radius={[4, 4, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}

export default MonthlySpendingChart;
