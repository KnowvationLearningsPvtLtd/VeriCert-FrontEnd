import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

interface DataPoint {
  name: string;
  issued: number;
  received: number;
}

interface BarChartComponentProps {
  data: DataPoint[];
}

const BarChartComponent: React.FC<BarChartComponentProps> = ({ data }) => {
  return (
    <div className="mt-6 bg-gray-50 p-4 shadow rounded-lg">
      <h2 className="text-lg font-semibold">Quarterly Performance</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="issued" fill="#8884d8" />
          <Bar dataKey="received" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartComponent;
