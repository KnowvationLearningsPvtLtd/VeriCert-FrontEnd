// src/middleware/RoleBasedRoute.tsx
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { authState } from "../store/authAtom";

type RoleBasedRouteProps = {
  allowedRoles: string[];
  children: ReactNode;
};

const RoleBasedRoute = ({ allowedRoles, children }: RoleBasedRouteProps) => {
  const { user } = useRecoilValue(authState);
  const role = user?.role;

  console.log("ProtectedRoute - role:", role);
  console.log("Allowed Roles:", allowedRoles);

  return role && allowedRoles.includes(role) ? (
    children
  ) : (
    <Navigate to="/login" />
  );
};

export default RoleBasedRoute;
