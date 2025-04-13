import PageWrapper from "../features/dashboard/components/PageWrapper";
import { Link } from "react-router-dom";

const IssuerCertificates = () => {
  return (
    <PageWrapper title="Issuer Certificates" description="Manage certificates issued by you.">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Issued Certificates</h2>
          <Link 
            to="/issuer/certificate-editor"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Create Certificate
          </Link>
        </div>
        <p className="text-gray-500">No certificates have been issued yet.</p>
      </div>
    </PageWrapper>
  );
};

export default IssuerCertificates;
