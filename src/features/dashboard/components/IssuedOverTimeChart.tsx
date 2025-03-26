import { LineChart, Line, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { IssuedOverTimeData } from "@/types/types"; // ✅ Use global type

interface IssuedOverTimeChartProps {
  data: IssuedOverTimeData[];
}

const IssuedOverTimeChart: React.FC<IssuedOverTimeChartProps> = ({ data }) => {
  return (
    <div className="bg-white shadow rounded-lg p-4">
      <h2 className="text-lg font-semibold mb-4">Issued Over Time</h2>
      <LineChart width={500} height={300} data={data}>
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="issued" stroke="#FF8042" strokeWidth={2} />
      </LineChart>
    </div>
  );
};

export default IssuedOverTimeChart;
