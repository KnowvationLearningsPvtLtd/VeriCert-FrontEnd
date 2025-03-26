import PageWrapper from "../features/dashboard/components/PageWrapper";

const IssuerCertificates = () => {
  return (
    <PageWrapper title="Issuer Certificates" description="Manage certificates issued by you.">
      <h2 className="text-lg font-semibold">Issued Certificates</h2>
      <p className="text-gray-500">No certificates have been issued yet.</p>
    </PageWrapper>
  );
};

export default IssuerCertificates;
