import { Outlet } from "react-router-dom";
import Sidebar from "../shared/Sidebar";
import { menuItems } from "../pages/tenant/data/data";

function TenantLayout() {
  // console.log("Inside tenant");
  return (
    <div className="flex h-screen">
      <Sidebar menuItems={menuItems} />
      <div className="flex-1 bg-purpleDarkScale-100 overflow-y-auto">
        <div className="p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default TenantLayout;
