import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";

interface PieChartData {
  name: string;
  value: number;
}

interface PieChartComponentProps {
  data: PieChartData[];
  colors: string[];
}

const PieChartComponent: React.FC<PieChartComponentProps> = ({ data, colors }) => {
  return (
    <div className="mt-6 bg-gray-50 p-4 shadow rounded-lg flex flex-col items-center">
      <h2 className="text-lg font-semibold mb-2">Certificate Categories</h2>
      <ResponsiveContainer width={300} height={300}>
        <PieChart>
          <Pie data={data} cx="50%" cy="50%" outerRadius={100} fill="#8884d8" dataKey="value">
            {data?.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PieChartComponent;
