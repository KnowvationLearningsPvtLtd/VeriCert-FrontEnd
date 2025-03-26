import PageWrapper from "../features/dashboard/components/PageWrapper";

const Profile = () => {
  return (
    <PageWrapper title="Profile" description="Manage your account details.">
      <input type="text" placeholder="Full Name" className="border p-2 w-full mt-2" />
      <input type="email" placeholder="Email" className="border p-2 w-full mt-2" />
    </PageWrapper>
  );
};

export default Profile;
