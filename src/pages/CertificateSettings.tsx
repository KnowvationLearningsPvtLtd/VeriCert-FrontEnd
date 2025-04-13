import PageWrapper from "../features/dashboard/components/PageWrapper";
import { Link } from "react-router-dom";

const CertificateSettings = () => {
  return (
    <PageWrapper title="Certificate Management" description="Manage issued and received certificates.">
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-2">Certificate Editor</h2>
        <p className="text-gray-500 mb-4">Create and customize your certificates using our editor.</p>
        <Link 
          to="/issuer/certificate-editor"
          className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          Open Certificate Editor
        </Link>
      </div>

      <div>
        <h2 className="text-lg font-semibold">Issued Certificates</h2>
        <p className="text-gray-500">No issued certificates yet.</p>
      </div>
    </PageWrapper>
  );
};

export default CertificateSettings;
