import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, LayoutDashboard, FileText, BarChart3, Settings } from "lucide-react";
import { HomeIcon } from "@heroicons/react/24/outline";

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  return (
    <div className={`h-full min-h-screen bg-gray-900 text-white ${isOpen ? "w-64" : "w-20"} transition-all duration-300 p-4 flex flex-col justify-between`}>

      {/* Top Section (Button & Title) */}
      <div className="p-4">
        <button className="text-white mb-4" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <div className="flex items-center justify-center mb-1">
        <span className="text-xl font-bold flex items-center gap-2">
  <HomeIcon className="h-6 w-6" /> {/* HeroIcons Home */}
  {isOpen && <span className="leading-none">Certificate Dashboard</span>}
</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2">
        <Link to="/user/dashboard" className="flex items-center gap-4 px-4 py-3 hover:bg-gray-800 rounded-lg">
          <LayoutDashboard size={20} /> {isOpen && "Dashboard"}
        </Link>
        <Link to="/user/certificates" className="flex items-center gap-4 px-4 py-3 hover:bg-gray-800 rounded-lg">
          <FileText size={20} /> {isOpen && "Certificates"}
        </Link>
        <Link to="/user/analytics" className="flex items-center gap-4 px-4 py-3 hover:bg-gray-800 rounded-lg">
          <BarChart3 size={20} /> {isOpen && "Analytics"}
        </Link>
        <Link to="/user/settings" className="flex items-center gap-4 px-4 py-3 hover:bg-gray-800 rounded-lg">
          <Settings size={20} /> {isOpen && "Settings"}
        </Link>
      </nav>

      {/* Footer Section */}
      <div className="p-4 text-center text-gray-400 text-sm">
        © 2025 Your Company
      </div>
    </div>
  );
};

export default Sidebar;
