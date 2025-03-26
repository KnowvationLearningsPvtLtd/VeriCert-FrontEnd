import IssuedReceivedChart from "./IssuedReceivedChart";
import CategoryDistributionChart from "./CategoryDistributionChart";
import IssuedOverTimeChart from "./IssuedOverTimeChart";
import { ChartsProps } from "@/types/types";  

const Charts: React.FC<ChartsProps> = ({ data }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <IssuedReceivedChart data={data.issuedReceived} />
      <CategoryDistributionChart data={data.categoryDistribution} />
      <IssuedOverTimeChart data={data.issuedOverTime} />
    </div>
  );
};


export default Charts;
