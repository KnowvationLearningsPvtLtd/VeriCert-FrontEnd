import PageWrapper from "../features/dashboard/components/PageWrapper";

const Notifications = () => {
  return (
    <PageWrapper title="Notifications" description="View system notifications and updates.">
      <h2 className="text-lg font-semibold">Recent Notifications</h2>
      <p className="text-gray-500">No new notifications.</p>
    </PageWrapper>
  );
};

export default Notifications;
