import React, { useState, FormEvent, ChangeEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSetRecoilState } from "recoil";
import { authState } from "../store/authAtom";
import { CheckCircle } from "lucide-react";
import { AuthUser } from "@/types/authTypes";
import { motion } from "framer-motion";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');  // Error message state
  const navigate = useNavigate();
  const setAuth = useSetRecoilState(authState);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:2000/api/auth/login', { email, password });

      if (response.status === 200 && response.data.token) {
        const user: AuthUser = {
          id: response.data.user._id,
          username: response.data.user.username,
          email: response.data.user.email,
          role: response.data.user.role,
        };

        setAuth({
          isAuthenticated: true,
          user: response.data.user,
          token: response.data.token,
        });

        if (user.role === "user") {
          navigate("/user/dashboard");
        } else if (user.role === "issuer" || user.role === "organization") {
          navigate("/issuer/dashboard");
        } else {
          navigate("/");
        }
      }
    } catch (error) {
      setErrorMessage('Incorrect email or password. Please try again.');  // Set error message on login failure
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-[#fdfaf5]">
      <div className="w-full max-w-md bg-white shadow-xl rounded-xl p-8">
        {/* Logo Section */}
        <div className="flex items-center justify-center mb-6">
          <CheckCircle className="h-8 w-8 text-[#260e03] mr-2" />
          <h1 className="text-3xl font-bold text-[#5C4033] tracking-tight">VeriCert</h1>
        </div>

        {/* Login Header */}
        <h2 className="text-xl font-semibold text-[#5C4033] text-center mb-6">Welcome Back</h2>

        {/* Error Message */}
        {errorMessage && (
          <div className="text-red-600 text-center mb-4">
            {errorMessage}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-[#5C4033] mb-1">Email</label>
            <input 
              id="email"
              type="email"
              value={email}
              placeholder="example@email.com"
              onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-[#5C4033] rounded-lg focus:ring-2 focus:ring-[#5C4033] focus:outline-none transition"
              required
            />
          </div>

          {/* Password Input */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-[#5C4033] mb-1">Password</label>
            <input 
              id="password"
              type="password"
              value={password}
              placeholder="********"
              onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-[#5C4033] rounded-lg focus:ring-2 focus:ring-[#5C4033] focus:outline-none transition"
              required
            />
          </div>

          {/* Submit Button with Animation */}
          <motion.button 
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300 }}
            type="submit"
            className="w-full py-2 px-4 bg-[#5C4033] text-white font-semibold rounded-lg hover:bg-opacity-90 transition-colors duration-300"
          >
            Log In
          </motion.button>
        </form>

        {/* Register Link */}
        <p className="text-sm text-center text-[#5C4033] mt-4">
          Don’t have an account?{' '}
          <Link to="/signup" className="text-[#5C4033] underline font-medium hover:text-opacity-80">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
