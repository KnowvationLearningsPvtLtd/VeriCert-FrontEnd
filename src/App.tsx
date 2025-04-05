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
import Login from "./pages/LoginPage";
import Signup from "./pages/SignupPage";
import ProtectedRoute from "./middleware/ProtectedRoute";
import RoleBasedRoute from "./middleware/RoleBasedRoute";
import AuthGuard from "../src/features/dashboard/components/AuthGuard";
import LandingPage from "../src/pages/LandingPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 🏠 Default Public Landing Page */}
        <Route path="/" element={<LandingPage />} />
      
        {/* 🔓 Public Routes */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* 🟢 User Routes */}
        <Route
          path="/user/*"
          element={
            <AuthGuard>
              <ProtectedRoute>
                <RoleBasedRoute allowedRoles={["user"]}>
                  <UserLayout />
                </RoleBasedRoute>
              </ProtectedRoute>
            </AuthGuard>
          }
        >
          <Route path="dashboard" element={<UserDashboard />} />
          <Route path="certificates" element={<CertificateSettings />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="settings" element={<Settings />} />
          <Route path="profile" element={<Profile />} />
          <Route path="*" element={<Navigate to="/user/dashboard" />} />
        </Route>

        {/* 🔵 Issuer Routes */}
        <Route
          path="/issuer/*"
          element={
            <AuthGuard>
              <ProtectedRoute>
                <RoleBasedRoute allowedRoles={["issuer", "organization"]}>
                  <IssuerLayout />
                </RoleBasedRoute>
              </ProtectedRoute>
            </AuthGuard>
          }
        >
          <Route path="dashboard" element={<IssuerDashboard />} />
          <Route path="certificates" element={<IssuerCertificates />} />
          <Route path="approvals" element={<IssuerApprovals />} />
          <Route path="*" element={<Navigate to="/issuer/dashboard" />} />
        </Route>

        {/* 🌐 Catch-All Redirect to Landing Page */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
