import { Outlet } from "react-router-dom";
import IssuerNavbar from "./IssuerNavbar";

const IssuerLayout = () => (
  <div className="flex flex-col h-screen">
    <IssuerNavbar />
    <div className="p-6 bg-gray-100 flex-1 overflow-auto">
      <Outlet />
    </div>
  </div>
);

export default IssuerLayout;
