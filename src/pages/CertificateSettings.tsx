import PageWrapper from "../features/dashboard/components/PageWrapper";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const CertificateSettings = () => {
  return (
    <PageWrapper
      title="Certificate Management"
      description="Manage issued and received certificates."
    >
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-2">Certificate Editor</h2>
        <p className="text-gray-500 mb-4">
          Create and customize your certificates using our editor.
        </p>

        {/* Animated Link Button */}
        <motion.div
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="inline-block"
        >
          <Link
            to="/issuer/certificate-editor"
            className="px-4 py-2 bg-[#5C4033] text-white rounded-md hover:bg-[#4E3227] transition"
          >
            Open Certificate Editor
          </Link>
        </motion.div>
      </div>

      <div>
        <h2 className="text-lg font-semibold">Issued Certificates</h2>
        <p className="text-gray-500">No issued certificates yet.</p>
      </div>
    </PageWrapper>
  );
};

export default CertificateSettings;
