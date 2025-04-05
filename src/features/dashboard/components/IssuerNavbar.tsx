import { NavLink, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { authState } from "../../../store/authAtom";
import { useState, useRef, useEffect } from "react";

const IssuerNavbar: React.FC = () => {
  const [auth, setAuth] = useRecoilState(authState);
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleLogout = () => {
    setAuth({
      isAuthenticated: false,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    navigate("/login");
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center">
      <h1 className="text-xl font-semibold text-blue-700">Issuer Dashboard</h1>

      <div className="flex items-center space-x-6">
        <NavLink to="/issuer/dashboard" className="text-gray-700 hover:text-blue-500">
          Dashboard
        </NavLink>
        <NavLink to="/issuer/certificates" className="text-gray-700 hover:text-blue-500">
          Certificates
        </NavLink>
        <NavLink to="/issuer/approvals" className="text-gray-700 hover:text-blue-500">
          Approvals
        </NavLink>

        {/* Profile Dropdown */}
        {auth?.user && (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center space-x-2 bg-gray-200 hover:bg-gray-300 px-3 py-1.5 rounded transition"
            >
              <span className="text-sm font-medium text-gray-700">
                {auth.user.username}
              </span>
              <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md py-2 z-10">
                <button
                  onClick={() => {
                    setDropdownOpen(false);
                    navigate("/issuer/profile");
                  }}
                  className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                >
                  View Profile
                </button>
                <button
                  onClick={() => {
                    setDropdownOpen(false);
                    navigate("/issuer/change-password");
                  }}
                  className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                >
                  Change Password
                </button>
                <hr />
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default IssuerNavbar;
