import { useState } from "react";
import { Menu } from "@headlessui/react";
import { Search, Bell, User, LogOut, Settings } from "lucide-react";

type Notification = {
  id: number;
  text: string;
};

const Navbar: React.FC = () => {
  const [notifications] = useState<Notification[]>([
    { id: 1, text: "New certificate issued" },
    { id: 2, text: "User requested verification" },
    { id: 3, text: "New user registered" },
  ]);

  return (
    <div className="flex items-center justify-between bg-gray-800 text-white p-4 shadow-md">
      {/* Search Bar */}
      <div className="flex items-center bg-gray-700 px-4 py-2 rounded-lg w-1/3">
        <Search size={20} className="text-gray-400" />
        <input
          type="text"
          placeholder="Search..."
          className="bg-transparent border-none outline-none text-white px-2 w-full"
        />
      </div>

      {/* Notification & Profile */}
      <div className="flex items-center gap-6">
        {/* Notification Dropdown */}
        <Menu as="div" className="relative">
          <Menu.Button className="relative">
            <Bell size={24} />
            {notifications.length > 0 && (
              <span className="absolute -top-1 -right-2 bg-red-500 text-xs px-2 py-0.5 rounded-full">
                {notifications.length}
              </span>
            )}
          </Menu.Button>
          <Menu.Items className="absolute right-0 mt-2 w-56 bg-white text-black shadow-lg rounded-lg overflow-hidden">
            {notifications.length > 0 ? (
              notifications.map((n) => (
                <Menu.Item key={n.id}>
                  {({ active }) => (
                    <div
                      className={`p-2 border-b ${
                        active ? "bg-gray-100" : ""
                      }`}
                    >
                      {n.text}
                    </div>
                  )}
                </Menu.Item>
              ))
            ) : (
              <div className="p-2 text-gray-500">No notifications</div>
            )}
          </Menu.Items>
        </Menu>

        {/* Profile Dropdown */}
        <Menu as="div" className="relative">
          <Menu.Button className="flex items-center gap-2 cursor-pointer">
            <User size={24} />
            <span className="hidden md:inline">John Doe</span>
          </Menu.Button>
          <Menu.Items className="absolute right-0 mt-2 w-48 bg-white text-black shadow-lg rounded-lg overflow-hidden">
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`flex items-center p-2 w-full ${
                    active ? "bg-gray-100" : ""
                  }`}
                >
                  <Settings size={18} className="mr-2" /> Settings
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`flex items-center p-2 w-full ${
                    active ? "bg-gray-100" : ""
                  }`}
                >
                  <LogOut size={18} className="mr-2" /> Logout
                </button>
              )}
            </Menu.Item>
          </Menu.Items>
        </Menu>
      </div>
    </div>
  );
};

export default Navbar;
