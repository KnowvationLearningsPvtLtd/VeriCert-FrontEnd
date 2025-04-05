import { useRecoilValue } from "recoil";
import { authState } from "../../../store/authAtom"; // Adjust path if needed
import { Navigate, useLocation } from "react-router-dom";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const AuthGuard = ({ children }: Props) => {
  const auth = useRecoilValue(authState);
  const location = useLocation();

  if (!auth || auth.isAuthenticated === false) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default AuthGuard;
