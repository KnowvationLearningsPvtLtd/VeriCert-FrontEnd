import PageWrapper from "../features/dashboard/components/PageWrapper";
import Charts from "../features/dashboard/components/Chart";
import dashboardDataJson from "../features/dashboard/data/dashboardData.json";

const Analytics = () => {
  return (
    <PageWrapper title="Analytics" description="View analytics of certificates issued and received.">
      {/* Charts Section */}
      <div className="mt-6">
        <Charts data={dashboardDataJson.charts} />
      </div>
    </PageWrapper>
  );
};

export default Analytics;
