import React, { useState, FormEvent, ChangeEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSetRecoilState } from "recoil";
import { authState } from "../store/authAtom";
import { CheckCircle } from "lucide-react";
import { AuthUser } from "@/types/authTypes";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();
  const setAuth = useSetRecoilState(authState);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:2000/api/auth/login', { email, password });
      console.log("Login Response:", response.data);
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

        localStorage.setItem(
          "auth",
          JSON.stringify({
            isAuthenticated: true,
            user,
            token: response.data.token,
          })
        );
        
        console.log("Updated Auth State:", {
          isAuthenticated: true,
          user: {
            id: response.data?.user?._id,
            username: response.data?.user?.username,
            email: response.data?.user?.email,
            role: response.data?.user?.role,
          },
          token: response.data?.token,
        });
        
        console.log("Updated Auth State:", user);
       
        // Redirect based on role
        if (user.role === "user") {
          console.log("Navigating to /user/dashboard...");
          navigate("/user/dashboard");
        } else if (user.role === "issuer" || user.role === "organization") {
          console.log("Navigating to /issuer/dashboard...");
          navigate("/issuer/dashboard");
        } else {
          console.log("Invalid role. Redirecting to login.");
          navigate("/login");
        }
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };
        

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-300 via-blue-100 to-blue-300">
      <div className="w-full max-w-md">
        <div className="flex items-center justify-center mb-6">
          <CheckCircle className="h-8 w-8 text-blue-600 mr-2" />
          <h1 className="text-2xl font-bold text-blue-700">VeriCert</h1></div>
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        
        <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input 
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
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
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
              onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
              required
            />
          </div>

          <button 
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>
        
        <p className="text-center text-sm text-gray-600 mt-4">
          Don't have an account? <Link to="/signup" className="text-blue-600 hover:underline">Register</Link>
        </p>
      </div>
    </div>
    </div>
  );
};

export default Login;
