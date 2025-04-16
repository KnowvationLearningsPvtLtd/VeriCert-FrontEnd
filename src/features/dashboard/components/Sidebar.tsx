import { useState, createContext, useContext } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  LayoutDashboard,
  FileText,
  BarChart3,
  Settings,
} from "lucide-react";

// Sidebar Context
const SidebarContext = createContext<{
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
} | null>(null);

const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("Sidebar must be used inside SidebarProvider");
  }
  return context;
};

const SidebarProvider = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(true);
  return (
    <SidebarContext.Provider value={{ open, setOpen }}>
      {children}
    </SidebarContext.Provider>
  );
};

const Sidebar: React.FC = () => {
  return (
    <SidebarProvider>
      <DesktopSidebar />
      <MobileSidebar />
    </SidebarProvider>
  );
};

// Desktop Sidebar
const DesktopSidebar = () => {
  const { open, setOpen } = useSidebar();

  return (
    <motion.div
      className="hidden md:flex flex-col justify-between h-screen bg-[#5C4033] text-white p-4 transition-all duration-300"
      animate={{ width: open ? 250 : 70 }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {/* Top */}
      <div>
        {open && (
          <motion.span
            animate={{ opacity: open ? 1 : 0 }}
            className="text-xl font-bold mb-6 block"
          >
            Certificate Dashboard
          </motion.span>
        )}

        {/* Navigation */}
        <nav className="space-y-2">
          <SidebarLink
            to="/user/dashboard"
            Icon={LayoutDashboard}
            label="Dashboard"
          />
          <SidebarLink
            to="/user/certificates"
            Icon={FileText}
            label="Certificates"
          />
          <SidebarLink
            to="/user/analytics"
            Icon={BarChart3}
            label="Analytics"
          />
          <SidebarLink
            to="/user/settings"
            Icon={Settings}
            label="Settings"
          />
        </nav>
      </div>

      {/* Footer */}
      <motion.div
        animate={{ opacity: open ? 1 : 0 }}
        className="text-white-200 text-sm text-center"
      >
        {open && "© 2025 Your Company"}
      </motion.div>
    </motion.div>
  );
};

// Mobile Sidebar
const MobileSidebar = () => {
  const { open, setOpen } = useSidebar();

  return (
    <div className="md:hidden p-4 bg-[#5C4033] text-white flex justify-between items-center">
      <button onClick={() => setOpen(!open)}>
        <Menu size={24} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-sidebar"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 left-0 h-full w-64 bg-[#5C4033] text-white p-4 z-50 flex flex-col justify-between"
          >
            <div>
              <div className="flex justify-between items-center mb-6">
                <span className="text-xl font-bold">Certificate Dashboard</span>
                <X size={24} onClick={() => setOpen(false)} />
              </div>

              <nav className="space-y-2">
                <SidebarLink
                  to="/user/dashboard"
                  Icon={LayoutDashboard}
                  label="Dashboard"
                />
                <SidebarLink
                  to="/user/certificates"
                  Icon={FileText}
                  label="Certificates"
                />
                <SidebarLink
                  to="/user/analytics"
                  Icon={BarChart3}
                  label="Analytics"
                />
                <SidebarLink
                  to="/user/settings"
                  Icon={Settings}
                  label="Settings"
                />
              </nav>
            </div>

            <div className="text-white-200 text-sm text-center mt-6">
              © 2025 Your Company
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Updated SidebarLink Component (Dynamic Icon Size)
const SidebarLink = ({
  to,
  Icon,
  label,
}: {
  to: string;
  Icon: React.ElementType;
  label: string;
}) => {
  const { open } = useSidebar();
  const iconSize = open ? 20 : 28;

  return (
    <Link
      to={to}
      className="flex items-center gap-4 px-4 py-3 hover:bg-[#41322b] rounded-lg transition-all duration-200"
    >
      <Icon size={iconSize} />
      {open && <span>{label}</span>}
    </Link>
  );
};

export default Sidebar;
