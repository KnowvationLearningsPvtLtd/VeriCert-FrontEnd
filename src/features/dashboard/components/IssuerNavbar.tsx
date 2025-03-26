import { NavLink } from "react-router-dom";

const IssuerNavbar: React.FC = () => {
  return (
    <nav className="bg-white shadow-md p-4 flex justify-between">
      <h1 className="text-xl font-semibold">Issuer Dashboard</h1>
      <div className="space-x-4">
        <NavLink 
          to="/issuer/dashboard" 
          className="text-gray-700 hover:text-blue-500"
        >
          Dashboard
        </NavLink>
        <NavLink 
          to="/issuer/certificates" 
          className="text-gray-700 hover:text-blue-500"
        >
          Certificates
        </NavLink>
        <NavLink 
          to="/issuer/approvals" 
          className="text-gray-700 hover:text-blue-500"
        >
          Approvals
        </NavLink>
      </div>
    </nav>
  );
};

export default IssuerNavbar;
