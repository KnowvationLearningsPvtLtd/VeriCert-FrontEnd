import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { authState } from '../store/authAtom';

interface ProtectedRouteProps {
  allowedRoles: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles }) => {
  const auth = useRecoilValue(authState);

  const userRole = auth.user?.role || '';

  if (!auth.isAuthenticated || !allowedRoles.includes(userRole)) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
