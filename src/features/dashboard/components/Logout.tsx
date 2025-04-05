import React from "react";
import { useRecoilState } from "recoil";
import { authState } from  "../../../store/authAtom"; // ✅ Adjust path as needed
import { useNavigate } from "react-router-dom";
import axios from "axios";


const Logout = () => {
  const [auth, setAuth] = useRecoilState(authState);
  console.log("Current Auth State:", auth); // ✅ Correct usage
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
        await axios.post("http://localhost:2000/api/auth/logout");
        localStorage.removeItem("auth");
    setAuth({
      isAuthenticated: false,
      user: null,
      token: '',
    });
    
    localStorage.removeItem("token"); // ✅ Clear token from local storage
    console.log("User logged out");

    navigate("/login"); // ✅ Redirect to login
    } catch (error) {
        console.error("Logout failed", error);
      }
    };

  return (
    <button onClick={handleLogout} className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700">
      Logout
    </button>
  );
};

export default Logout;
