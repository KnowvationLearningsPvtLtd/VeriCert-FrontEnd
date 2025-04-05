import { Navigate, useLocation } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { authState } from "../store/authAtom";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: Props) => {
  const { isAuthenticated } = useRecoilValue(authState);
  const location = useLocation();

  console.log("ProtectedRoute - isAuthenticated:", isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
