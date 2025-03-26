import { authState } from "@/store/authAtom"
import { Navigate, Outlet } from "react-router-dom"
import { useRecoilValue } from "recoil"







export const ProtectedRoute = () => {
    const authUser = useRecoilValue(authState)

    return authUser ? <Outlet /> : <Navigate to="/login" />
}