import PageWrapper from "../features/dashboard/components/PageWrapper";

const Settings = () => {
  return (
    <PageWrapper title="Settings" description="Manage your account settings.">
      <h2 className="text-lg font-semibold">Change Password</h2>
      <input type="password" placeholder="Current Password" className="border p-2 w-full mt-2" />
      <input type="password" placeholder="New Password" className="border p-2 w-full mt-2" />
    </PageWrapper>
  );
};

export default Settings;
