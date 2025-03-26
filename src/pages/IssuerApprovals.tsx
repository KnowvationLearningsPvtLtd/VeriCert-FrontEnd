import PageWrapper from "../features/dashboard/components/PageWrapper";

const IssuerApprovals = () => {
  return (
    <PageWrapper title="Issuer Approvals" description="Approve or reject certificate requests.">
      <h2 className="text-lg font-semibold">Pending Approvals</h2>
      <p className="text-gray-500">No pending approvals at the moment.</p>
    </PageWrapper>
  );
};

export default IssuerApprovals;
