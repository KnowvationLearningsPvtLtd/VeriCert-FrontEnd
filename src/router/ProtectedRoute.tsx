import { authState } from '@/store/authAtom';
import { Navigate, Outlet } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

const ProtectedRoute = () => {
  const authUser = useRecoilValue(authState);

  // ✅ Properly check if user is authenticated
  if (!authUser.isAuthenticated || !authUser.token) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
