import PageWrapper from "../features/dashboard/components/PageWrapper";

const CertificateSettings = () => {
  return (
    <PageWrapper title="Certificate Management" description="Manage issued and received certificates.">
      <h2 className="text-lg font-semibold">Issued Certificates</h2>
      <p className="text-gray-500">No issued certificates yet.</p>
    </PageWrapper>
  );
};

export default CertificateSettings;
