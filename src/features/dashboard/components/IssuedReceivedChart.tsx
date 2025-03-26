import { PieChart, Pie, Cell, Tooltip } from "recharts";
import { IssuedReceivedData } from "@/types/types"; 

interface IssuedReceivedChartProps {
  data: IssuedReceivedData[];
}

const IssuedReceivedChart: React.FC<IssuedReceivedChartProps> = ({ data }) => {
  const colors = ["#0088FE", "#00C49F"];

  return (
    <div className="bg-white shadow rounded-lg p-4">
      <h2 className="text-lg font-semibold">Issued vs. Received</h2>
      <PieChart width={300} height={300}>
        <Pie data={data} dataKey="value" cx="50%" cy="50%" outerRadius={100}>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </div>
  );
};

export default IssuedReceivedChart;
