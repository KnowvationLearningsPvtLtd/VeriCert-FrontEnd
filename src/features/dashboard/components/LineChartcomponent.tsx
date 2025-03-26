import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, Legend } from "recharts";

interface LineChartData {
  name: string;
  issued: number;
  received: number;
}

interface LineChartComponentProps {
  data: LineChartData[];
}

const LineChartComponent: React.FC<LineChartComponentProps> = ({ data }) => {
  return (
    <div className="mt-6 bg-gray-50 p-4 shadow rounded-lg">
      <h2 className="text-lg font-semibold">Issued vs. Received Certificates (Monthly)</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="issued" stroke="#8884d8" />
          <Line type="monotone" dataKey="received" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineChartComponent;
