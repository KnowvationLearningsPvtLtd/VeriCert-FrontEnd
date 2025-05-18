import React, { useState, FormEvent, ChangeEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSetRecoilState } from "recoil";
import { authState } from "../store/authAtom";
import { CheckCircle } from "lucide-react";
import { AuthUser } from '@/types/authTypes';
import { motion } from 'framer-motion'; // Import motion for hover effect

const Signup: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [role, setRole] = useState<string>('user'); // Default role
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();
  const setAuth = useSetRecoilState(authState);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:2000/api/auth/register', {
        username,
        email,
        password,
        role,
      });

      if (response.status === 201) {
        navigate("/login"); // ✅ Redirect to login
      } else {
        alert(response.data.message || "Signup failed. Please try again.");
      }
    } catch (err) {
      console.error("Signup error:", err);
      alert("An error occurred. Please check your details and try again.");
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#fdfaf5]">
      <div className="w-full max-w-md">
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
          <div className="flex items-center justify-center mb-6">
            <CheckCircle className="h-8 w-8 text-[#5C4033] mr-2" />
            <h1 className="text-3xl font-bold text-[#5C4033]">VeriCert</h1>
          </div>
          <h2 className="text-2xl font-bold text-center mb-4">Sign Up</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
              <input
                id="username"
                name="username"
                type="text"
                placeholder="Enter your username"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#5C4033] focus:border-[#5C4033]"
                onChange={(e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#5C4033] focus:border-[#5C4033]"
                onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#5C4033] focus:border-[#5C4033]"
                onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
              <select
                id="role"
                name="role"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#5C4033] focus:border-[#5C4033]"
                value={role}
                onChange={(e: ChangeEvent<HTMLSelectElement>) => setRole(e.target.value)}
                required
              >
                <option value="none">None</option>
                <option value="organization">Organization</option>
              </select>
              
            </div>

            <motion.button 
              type="submit"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="w-full bg-[#5C4033] text-white py-2 px-4 rounded-md hover:bg-[#4E3227] transition"
            >
              Sign Up
            </motion.button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-4">
            Already have an account? <Link to="/login" className="text-[#5C4033] hover:underline">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;