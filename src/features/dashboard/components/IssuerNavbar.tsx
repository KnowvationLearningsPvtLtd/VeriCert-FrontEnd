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
    setAuth({ isAuthenticated: false, user: null, token: "" });
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
    <nav className="bg-[#5C4033] text-white shadow-md p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Issuer Dashboard</h1>

      <div className="flex items-center space-x-6">
        <NavLink to="/issuer/dashboard" className="hover:text-[#f5e7dd] transition">
          Dashboard
        </NavLink>
        <NavLink to="/issuer/certificates" className="hover:text-[#f5e7dd] transition">
          Certificates
        </NavLink>
        <NavLink to="/issuer/approvals" className="hover:text-[#f5e7dd] transition">
          Approvals
        </NavLink>

        {auth?.user && (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center space-x-2 bg-[#7b5e4d] hover:bg-[#6d4e3f] px-3 py-1.5 rounded-md transition"
            >
              <span className="text-sm font-medium">{auth.user.username}</span>
              <svg
                className="w-4 h-4 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white text-[#5C4033] shadow-lg rounded-md py-2 z-10">
                <button
                  onClick={() => {
                    setDropdownOpen(false);
                    navigate("/issuer/profile");
                  }}
                  className="w-full text-left px-4 py-2 text-sm hover:bg-[#f5e7dd]"
                >
                  View Profile
                </button>
                <button
                  onClick={() => {
                    setDropdownOpen(false);
                    navigate("/issuer/change-password");
                  }}
                  className="w-full text-left px-4 py-2 text-sm hover:bg-[#f5e7dd]"
                >
                  Change Password
                </button>
                <hr className="my-1 border-[#d4bba8]" />
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-[#f5e7dd]"
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
