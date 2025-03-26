import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import UserLayout from "./features/dashboard/components/UserLayout";
import IssuerLayout from "./features/dashboard/components/IssuerLayout";
import UserDashboard from "./pages/UserDashboard";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";
import IssuerDashboard from "./pages/IssuerDashboard";
import IssuerCertificates from "./pages/IssuerCertificates";
import IssuerApprovals from "./pages/IssuerApprovals";
import CertificateSettings from "./pages/CertificateSettings";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 🟢 User Routes */}
        <Route path="/user" element={<UserLayout />}>
          <Route path="dashboard" element={<UserDashboard />} />
          <Route path="certificates" element={<CertificateSettings />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="settings" element={<Settings />} />
          <Route path="profile" element={<Profile />} />
          <Route path="*" element={<Navigate to="/user/dashboard" />} />
        </Route>

        {/* 🔵 Issuer Routes */}
        <Route path="/issuer" element={<IssuerLayout />}>
          <Route path="dashboard" element={<IssuerDashboard />} />
          <Route path="certificates" element={<IssuerCertificates />} />
          <Route path="approvals" element={<IssuerApprovals />} />
          <Route path="*" element={<Navigate to="/issuer/dashboard" />} />
        </Route>

        {/* Default Redirect */}
        <Route path="*" element={<Navigate to="/user/dashboard" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
