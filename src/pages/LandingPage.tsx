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
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import BackgroundLines from "../components/ui/BackgroundLines";
import { FlipWords } from "@/components/ui/FlipWords";

// Reusable hover wrapper component
const HoverWrapper = ({
  children,
  index,
  hoveredIndex,
  setHoveredIndex,
}: {
  children: React.ReactNode;
  index: number;
  hoveredIndex: number | null;
  setHoveredIndex: React.Dispatch<React.SetStateAction<number | null>>;
}) => (
  <div
    className="relative group cursor-pointer"
    onMouseEnter={() => setHoveredIndex(index)}
    onMouseLeave={() => setHoveredIndex(null)}
  >
    <AnimatePresence>
      {hoveredIndex === index && (
        <motion.span
          layoutId="hoverBackground"
          className="absolute inset-0 block bg-neutral-200/60 dark:bg-slate-800/50 rounded-xl z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.2 } }}
          exit={{ opacity: 0, transition: { duration: 0.15 } }}
        />
      )}
    </AnimatePresence>
    <div className="relative z-10">{children}</div>
  </div>
);

// Chart data
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

const COLORS = ["#8B5E3C", "#A67B5B", "#D2B48C"];

const LandingPage = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const metrics = [
    {
      title: "Total Certificates",
      icon: <BarChart3 className="mx-auto mb-2 text-[#5C4033]" size={32} />,
      value: "48,230",
    },
    {
      title: "Verified Users",
      icon: <Users2 className="mx-auto mb-2 text-[#4B3621]" size={32} />,
      value: "12,670",
    },
    {
      title: "Active Issuers",
      icon: <Building2 className="mx-auto mb-2 text-[#8B5E3C]" size={32} />,
      value: "315",
    },
  ];

  return (
    <div className="min-h-screen bg-[#fdfaf5] text-[#4B3621]">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-6 py-4 shadow bg-white">
        <div className="text-2xl font-bold text-[#5C4033]">VeriCert</div>
        <ul className="hidden md:flex space-x-6 text-sm font-medium">
          <li><a href="#home" className="hover:text-[#5C4033]">Home</a></li>
          <li><a href="#about" className="hover:text-[#5C4033]">About</a></li>
          <li><a href="#services" className="hover:text-[#5C4033]">Services</a></li>
          <li><a href="#courses" className="hover:text-[#5C4033]">Courses</a></li>
          <li><a href="#contact" className="hover:text-[#5C4033]">Contact</a></li>
        </ul>
        <div className="space-x-3">
          <Link to="/signup">
            <motion.button
              whileHover={{ scale: 1.1, backgroundColor: "#3e2a1c" }}
              transition={{ type: "spring", stiffness: 300 }}
              className="bg-[#5C4033] text-white px-4 py-1 rounded-md"
            >
              Register
            </motion.button>
          </Link>
          <Link to="/login">
            <motion.button
              whileHover={{ scale: 1.1, backgroundColor: "#f1eae2" }}
              transition={{ type: "spring", stiffness: 300 }}
              className="border border-[#5C4033] text-[#5C4033] px-4 py-1 rounded-md"
            >
              Log in
            </motion.button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative py-16 px-4 sm:px-10 md:px-20 overflow-hidden">
        <BackgroundLines className="flex items-center justify-center w-full flex-col px-4">
          <h1 className="text-center text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight py-4 md:py-8 z-20">
            <span className="transition-all duration-1000 ease-in-out bg-gradient-to-r from-[#5C4033] to-[#8B5E3C] bg-clip-text text-transparent">
              Veri
            </span>
            <span className="transition-all duration-1000 ease-in-out bg-gradient-to-r from-[#996136] to-[#5C4033] bg-clip-text text-transparent">
              Cert
            </span>
          </h1>
          <div className="text-2xl font-semibold">
            Easily{" "}
            <FlipWords
              words={["MANAGE", "ISSUE", "VERIFY"]}
              duration={3000} // Adjust the duration for each flip
              className="text-brown-1000" // Optional: add styling
            />{" "}
            certificates with real-time insights and trust.
          </div>

          <div className="mt-6 z-20">
            <Link to="/signup">
              <motion.button
                whileHover={{ scale: 1.1, backgroundColor: "#3e2a1c" }}
                transition={{ type: "spring", stiffness: 300 }}
                className="bg-[#5C4033] text-white px-6 py-2 rounded"
              >
                Get Started
              </motion.button>
            </Link>
          </div>
        </BackgroundLines>
      </section>

      {/* Metrics Section */}
      <section className="bg-[#f9f5ef] py-14 px-6 md:px-20" id="services">
        <h2 className="text-3xl font-bold text-center mb-8 text-[#5C4033]">Key Metrics</h2>
        <div className="grid md:grid-cols-3 gap-6 text-center">
          {metrics.map((metric, index) => (
            <HoverWrapper
              key={index}
              index={index}
              hoveredIndex={hoveredIndex}
              setHoveredIndex={setHoveredIndex}
            >
              <div className="bg-[#f6efe6] rounded-xl p-6 shadow transition-transform duration-300 group-hover:scale-105">
                {metric.icon}
                <h3 className="text-lg font-bold">{metric.title}</h3>
                <p className="text-2xl font-semibold text-[#5C4033]">{metric.value}</p>
              </div>
            </HoverWrapper>
          ))}
        </div>
      </section>

      {/* Analytics Section */}
      <section className="bg-[#fdf9f4] py-14 px-6 md:px-20">
        <h2 className="text-3xl font-bold text-center mb-8 text-[#5C4033]">Analytics</h2>
        <div className="grid md:grid-cols-2 gap-10">
          {/* Bar Chart */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-bold mb-4">Stats Overview</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={barData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#8B5E3C" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Pie Chart */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-bold mb-4">User Distribution</h3>
            <ResponsiveContainer width="100%" height={250}>
              <RePieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius="50%"
                  outerRadius="70%"
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
      {/* Courses Section */}
      <section id="courses" className="bg-[#f9f5ef] py-14 px-6 md:px-20">
        <h2 className="text-3xl font-bold text-center mb-8 text-[#5C4033]">Courses</h2>
        <p className="text-center max-w-2xl mx-auto text-[#5C4033] text-sm md:text-lg">
          Explore a variety of certification-related courses designed to enhance your credibility and skills.
        </p>
      </section>

      {/* Contact Section */}
      <section id="contact" className="bg-[#fdf9f4] py-14 px-6 md:px-20">
        <h2 className="text-3xl font-bold text-center mb-8 text-[#5C4033]">Contact Us</h2>
        <div className="max-w-xl mx-auto text-center text-[#5C4033]">
          <p>Email: <a href="mailto:support@vericert.com" className="underline">support@vericert.com</a></p>
          <p className="mt-2">Phone: +91 98765 43210</p>
          <p className="mt-2">We'd love to hear from you. Reach out with any questions or feedback!</p>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
