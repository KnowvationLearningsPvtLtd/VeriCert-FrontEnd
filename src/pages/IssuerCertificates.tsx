import PageWrapper from "../features/dashboard/components/PageWrapper";
import { Link } from "react-router-dom";

const IssuerCertificates = () => {
  return (
    <PageWrapper
      title="Issuer Certificates"
      description="Manage certificates issued by you."
    >
      <div className="mb-8 bg-[#f5e7dd] p-6 rounded-lg shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-brown-900">Issued Certificates</h2>
          <Link
            to="/issuer/certificate-editor"
            className="px-5 py-2 bg-[#5C4033] text-[#f5e7dd] font-semibold rounded-lg hover:bg-[#4E3227] hover:text-white transition-all duration-300 shadow-sm"
          >
            Create Certificate
          </Link>
        </div>
        <p className="text-brown-600">No certificates have been issued yet.</p>
      </div>
    </PageWrapper>
  );
};

export default IssuerCertificates;
