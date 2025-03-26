import DashboardWrapper from "../features/dashboard/components/DashboardWrapper";
import StatsWidget from "../features/dashboard/components/StatsWidget";
import ActivityLog from "../features/dashboard/components/ActivityLog";
import Charts from "../features/dashboard/components/Chart";
import dashboardDataJson from "../features/dashboard/data/dashboardData.json";

const UserDashboard = () => {
  return (
    <DashboardWrapper title="User Dashboard">
      {/* Stats Widgets */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        <StatsWidget title="Certificates Issued" count={dashboardDataJson.certificatesIssued} />
        <StatsWidget title="Certificates Received" count={dashboardDataJson.certificatesReceived} />
      </div>

      {/* Activity Log */}
      <div className="mt-6">
        <ActivityLog logs={dashboardDataJson.activityLogs} />
      </div>

      {/* Charts Section */}
      <div className="mt-6">
        <Charts data={dashboardDataJson.charts} />
      </div>
    </DashboardWrapper>
  );
};

export default UserDashboard;
