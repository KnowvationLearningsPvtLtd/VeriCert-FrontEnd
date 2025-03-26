<<<<<<< HEAD
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserDashboard from "../pages/UserDashboard";
import IssuerDashboard from "../pages/IssuerDashboard";
import Analytics from "../pages/Analytics";
import CertificateSettings from "../pages/CertificateSettings";
import Notifications from "../pages/Notifications";
import Profile from "../pages/Profile";
import Settings from "../pages/Settings";

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/issuer" element={<IssuerDashboard />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/certificates" element={<CertificateSettings />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Router>
  );
=======
import { RecoilRoot } from 'recoil'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
// import { ProtectedRoute } from "./ProtectedRoute";

// pnpm

export const Router = () => {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path="/" />
          <Route path="/register" />
          {/* <Route element={<ProtectedRoute />}/> */}
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  )
>>>>>>> origin/main
}
