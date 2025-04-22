import PageWrapper from "../features/dashboard/components/PageWrapper";
import { Link } from "react-router-dom";
import { useState } from 'react';

const IssuerCertificates = () => {
  const [certificateId, setCertificateId] = useState('');

  const handleViewCertificate = () => {
    // Logic to view certificate by ID
    console.log(`Viewing certificate with ID: ${certificateId}`);
  };

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
        <div className="mt-4">
          <input
            type="text"
            value={certificateId}
            onChange={(e) => setCertificateId(e.target.value)}
            placeholder="Enter Certificate ID"
            className="px-2 py-1 border rounded-lg mr-2"
          />
          <button
            onClick={handleViewCertificate}
            className="px-4 py-2 bg-green-500 text-white rounded-lg"
          >
            View Certificate
          </button>
        </div>
      </div>
    </PageWrapper>
  );
};

export default IssuerCertificates;
