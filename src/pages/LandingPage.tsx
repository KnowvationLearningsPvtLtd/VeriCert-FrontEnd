import { Link } from "react-router-dom";
import { BarChart3, Users2, Building2 } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Pie,
  PieChart as RePieChart,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const barData = [
  { name: "Certificates", value: 48230 },
  { name: "Verified Users", value: 12670 },
  { name: "Issuers", value: 315 },
];

const pieData = [
  { name: "Students", value: 55 },
  { name: "Organizations", value: 30 },
  { name: "Professionals", value: 15 },
];

const COLORS = ["#3b82f6", "#10b981", "#8b5cf6"];

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 text-gray-800">
      {/* ===== Navbar ===== */}
      <nav className="flex justify-between items-center px-6 py-4 shadow bg-white">
        <div className="text-2xl font-bold text-blue-600">VeriCert</div>
        <ul className="hidden md:flex space-x-6 text-sm font-medium">
          <li><a href="#home" className="hover:text-blue-600">Home</a></li>
          <li><a href="#about" className="hover:text-blue-600">About</a></li>
          <li><a href="#services" className="hover:text-blue-600">Services</a></li>
          <li><a href="#courses" className="hover:text-blue-600">Courses</a></li>
          <li><a href="#contact" className="hover:text-blue-600">Contact</a></li>
        </ul>
        <div className="space-x-3">
          <Link to="/signup">
            <button className="bg-blue-600 text-white px-4 py-1 rounded-md hover:bg-blue-700">Register</button>
          </Link>
          <Link to="/login">
            <button className="border border-blue-600 text-blue-600 px-4 py-1 rounded-md hover:bg-blue-100">Log in</button>
          </Link>
        </div>
      </nav>

      {/* ===== Hero Section ===== */}
      <section id="home" className="py-16 px-6 md:px-20 grid md:grid-cols-2 items-center">
        <div>
          <h1 className="text-5xl font-bold mb-4 text-blue-700">VERICERT</h1>
          <p className="text-gray-600 mb-6">
            Easily manage, issue, and verify certificates with real-time insights and trust.
          </p>
          <Link to="/signup">
            <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">Get Started</button>
          </Link>
        </div>
      </section>

      {/* ===== Analytics Overview with Icons ===== */}
      <section className="bg-white py-14 px-6 md:px-20" id="services">
        <h2 className="text-3xl font-bold text-center mb-8 text-blue-600">Key Metrics</h2>
        <div className="grid md:grid-cols-3 gap-6 text-center">
          <div className="bg-blue-50 rounded-xl p-6 shadow">
            <BarChart3 className="mx-auto mb-2 text-blue-600" size={32} />
            <h3 className="text-lg font-bold">Total Certificates</h3>
            <p className="text-2xl font-semibold text-blue-700">48,230</p>
          </div>
          <div className="bg-green-50 rounded-xl p-6 shadow">
            <Users2 className="mx-auto mb-2 text-green-600" size={32} />
            <h3 className="text-lg font-bold">Verified Users</h3>
            <p className="text-2xl font-semibold text-green-600">12,670</p>
          </div>
          <div className="bg-purple-50 rounded-xl p-6 shadow">
            <Building2 className="mx-auto mb-2 text-purple-600" size={32} />
            <h3 className="text-lg font-bold">Active Issuers</h3>
            <p className="text-2xl font-semibold text-purple-600">315</p>
          </div>
        </div>
      </section>

      {/* ===== Charts Section ===== */}
      <section className="bg-gray-50 py-14 px-6 md:px-20">
        <h2 className="text-3xl font-bold text-center mb-8 text-blue-600">Analytics</h2>
        <div className="grid md:grid-cols-2 gap-10">
          {/* Bar Chart */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-bold mb-4">Stats Overview</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={barData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Pie Chart */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-bold mb-4">User Types</h3>
            <ResponsiveContainer width="100%" height={250}>
              <RePieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </RePieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      {/* ===== Courses Section ===== */}
      <section id="courses" className="py-14 px-6 md:px-20 text-center">
        <h2 className="text-3xl font-bold mb-6 text-blue-600">Courses & Resources</h2>
        <p className="text-gray-600">Partnered with institutions to provide certificate-based learning programs.</p>
      </section>

      {/* ===== Contact Section ===== */}
      <section id="contact" className="bg-blue-50 py-14 px-6 md:px-20 text-center">
        <h2 className="text-3xl font-bold mb-4 text-blue-600">Contact Us</h2>
        <p>Email: <a className="text-blue-800 underline" href="mailto:support@vericert.com">support@vericert.com</a></p>
        <p className="text-gray-600 mt-2">We’re here to help you verify smarter.</p>
      </section>

      {/* ===== Footer ===== */}
      <footer className="text-center py-6 text-sm text-gray-500">
        © {new Date().getFullYear()} VeriCert. All rights reserved.
      </footer>
    </div>
  );
};

export default LandingPage;
