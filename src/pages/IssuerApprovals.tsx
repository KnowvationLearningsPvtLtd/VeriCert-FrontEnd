import PageWrapper from "../features/dashboard/components/PageWrapper";

const IssuerApprovals = () => {
  return (
    <PageWrapper
      title="Issuer Approvals"
      description="Approve or reject certificate requests."
    >
      <div className="bg-[#f5e7dd] p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold text-brown-900 mb-2">Pending Approvals</h2>
        <p className="text-brown-600">No pending approvals at the moment.</p>
      </div>
    </PageWrapper>
  );
};

export default IssuerApprovals;
