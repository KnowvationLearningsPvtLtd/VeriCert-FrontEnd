import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import UserLayout from "./src/features/dashboard/components/UserLayout";
import IssuerLayout from "./src/features/dashboard/components/IssuerLayout";
import UserDashboard from "./src/pages/UserDashboard";
import Analytics from "./src/pages/Analytics";
import Settings from "./src/pages/Settings";
import Profile from "./src/pages/Profile";
import IssuerDashboard from "./src/pages/IssuerDashboard";
import IssuerCertificates from "./src/pages/IssuerCertificates";
import IssuerApprovals from "./src/pages/IssuerApprovals";
import CertificateSettings from "./src/pages/CertificateSettings";

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

