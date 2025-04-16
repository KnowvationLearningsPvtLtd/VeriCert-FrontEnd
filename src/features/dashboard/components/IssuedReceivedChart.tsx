import { PieChart, Pie, Cell, Tooltip } from "recharts";
import { IssuedReceivedData } from "@/types/types";

interface IssuedReceivedChartProps {
  data: IssuedReceivedData[];
}

const IssuedReceivedChart: React.FC<IssuedReceivedChartProps> = ({ data }) => {
  // Brown tone shades
  const brownShades = ["#5C4033", "#8B5E3C"];

  return (
    <div className="bg-white shadow rounded-lg p-4">
      <h2 className="text-lg font-semibold mb-2">Issued vs. Received</h2>
      <PieChart width={300} height={300}>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          innerRadius="50%"
          outerRadius="80%"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={brownShades[index % brownShades.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </div>
  );
};

export default IssuedReceivedChart;
