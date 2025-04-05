import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
  isAuthenticated: boolean;
  allowedRoles: string[];
  userRole?: string;
  children: React.ReactNode;
}

const PrivateRoute = ({
  isAuthenticated,
  allowedRoles,
  userRole,
  children,
}: PrivateRouteProps) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (userRole && !allowedRoles.includes(userRole.toLowerCase())) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;
