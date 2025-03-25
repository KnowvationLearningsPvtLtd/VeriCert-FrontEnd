import { RecoilRoot } from "recoil"
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { ProtectedRoute } from "./ProtectedRoute";



// pnpm 



export const Router = () => {
    return (
        <RecoilRoot>
            <BrowserRouter>
                <Routes>
                    <Route  path="/"/>
                    <Route path="/register"/>
                    {/* <Route element={<ProtectedRoute />}/> */}
                </Routes>            
            </BrowserRouter>
        </RecoilRoot>
    )
}