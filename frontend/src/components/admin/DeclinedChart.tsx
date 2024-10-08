import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar, Legend, ResponsiveContainer } from "recharts";
import { ChartContainer } from "@/components/ui/chart";
import { useWindowSize } from "@/components/shared/WindowSize";
// Removed Redux imports as we will use mock data
// import { useSelector } from "react-redux";
// import { RootState } from "@/lib/redux/redux.config";

export function DeclinedChart() {
    // Mock data
    const mockBarChartData = [
        { month: "January", rejected: 10, cancelled: 5 },
        { month: "February", rejected: 8, cancelled: 3 },
        { month: "March", rejected: 12, cancelled: 7 },
        { month: "April", rejected: 15, cancelled: 10 },
    ];

    const size = useWindowSize();
    const getAspect = () => {
        if (size.width > 1200) return 3.55;
        if (size.width > 992) return 1.95;
        return 2;
    };

    return (
        <div className="bg-white shadow-lg p-4 pt-6 rounded-md">
            <h3 className="text-center mb-4">REJECTED AND CANCELED</h3>
            <ResponsiveContainer width="100%" aspect={getAspect()}>
                <ChartContainer config={{ waitingForm: { color: "#82ca9d" } }}>
                    <BarChart width={900} height={450} data={mockBarChartData}>
                        <CartesianGrid strokeDasharray="2" strokeWidth={"3"} />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="rejected" fill="hsl(var(--chart-rejected))" />
                        <Bar dataKey="cancelled" fill="hsl(var(--chart-cancelled))" />
                    </BarChart>
                </ChartContainer>
            </ResponsiveContainer>
        </div>
    );
}
