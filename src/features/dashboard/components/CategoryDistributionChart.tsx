import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { CategoryDistributionData } from "@/types/types"; 

interface CategoryDistributionChartProps {
  data: CategoryDistributionData[]; 
}

const CategoryDistributionChart: React.FC<CategoryDistributionChartProps> = ({ data }) => {
  return (
    <div className="bg-white shadow rounded-lg p-4 min-h-[350px]">
      <h2 className="text-lg font-semibold mb-4">Category Distribution</h2>
      <div className="w-full h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="issued" fill="#4F46E5" radius={[5, 5, 0, 0]} /> 
            <Bar dataKey="received" fill="#10B981" radius={[5, 5, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CategoryDistributionChart;
