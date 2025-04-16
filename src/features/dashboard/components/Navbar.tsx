import { useState } from "react";
import { Menu } from "@headlessui/react";
import { Search, Bell, User, LogOut, Settings } from "lucide-react";
import Logout from "./Logout";
import { useRecoilValue } from "recoil";
import { authState } from "../../../store/authAtom";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

type Notification = {
  id: number;
  text: string;
};

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const [notifications] = useState<Notification[]>([
    { id: 1, text: "New certificate issued" },
    { id: 2, text: "User requested verification" },
    { id: 3, text: "New user registered" },
  ]);
  const [showLogout, setShowLogout] = useState(false);
  const auth = useRecoilValue(authState);
  const username = auth?.user?.username || "User";

  return (
    <div className="flex items-center justify-between bg-[#5C4033] text-white p-4 shadow-md">
      {/* Search Bar */}
      <div className="flex items-center bg-[#111010] px-4 py-2 rounded-lg w-full max-w-md">
        <Search size={20} className="text-black-300" />
        <input
          type="text"
          placeholder="Search..."
          className="bg-transparent border-none outline-none text-white px-2 w-full placeholder:text-gray-300"
        />
      </div>

      {/* Notification & Profile */}
      <div className="flex items-center gap-6">
        {/* Notifications */}
        <Menu as="div" className="relative">
          <Menu.Button
            as={motion.button}
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="relative hover:text-grey-200 transition"
          >
            <Bell size={24} />
            {notifications.length > 0 && (
              <span className="absolute -top-1 -right-2 bg-red-500 text-xs px-2 py-0.5 rounded-full">
                {notifications.length}
              </span>
            )}
          </Menu.Button>
          <Menu.Items className="absolute right-0 mt-2 w-64 bg-white text-black shadow-lg rounded-lg overflow-hidden z-50">
            {notifications.length > 0 ? (
              notifications.map((n) => (
                <Menu.Item key={n.id}>
                  {({ active }) => (
                    <div
                      className={`p-3 border-b text-sm font-medium ${
                        active ? "bg-gray-100" : ""
                      }`}
                    >
                      {n.text}
                    </div>
                  )}
                </Menu.Item>
              ))
            ) : (
              <div className="p-3 text-gray-500 text-sm">No notifications</div>
            )}
          </Menu.Items>
        </Menu>

        {/* Profile Dropdown */}
        <Menu as="div" className="relative">
          <Menu.Button
            as={motion.button}
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="flex items-center gap-2 cursor-pointer hover:text-grey-200 transition"
          >
            <User size={28} />
            <span className="hidden md:inline font-medium">{username}</span>
          </Menu.Button>
          <Menu.Items className="absolute right-0 mt-2 w-48 bg-white text-black shadow-lg rounded-lg overflow-hidden z-50">
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`flex items-center p-3 w-full text-sm ${
                    active ? "bg-gray-100" : ""
                  }`}
                  onClick={() => navigate("/user/profile")}
                >
                  <Settings size={18} className="mr-2" />
                  Settings
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`flex items-center p-3 w-full text-sm ${
                    active ? "bg-gray-100" : ""
                  }`}
                  onClick={() => setShowLogout(true)}
                >
                  <LogOut size={18} className="mr-2" />
                  Logout
                </button>
              )}
            </Menu.Item>
          </Menu.Items>
        </Menu>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogout && <Logout />}
    </div>
  );
};

export default Navbar;
