import { Outlet } from "react-router-dom";
import { menuItems } from "../pages/admin/data/data";
import Sidebar from "../shared/Sidebar";

function AdminLayout() {
  console.log("Inside tenant");
  return (
    <div className="flex h-screen">
      <Sidebar menuItems={menuItems} />
      <div className="flex-1 bg-purple-200 overflow-y-auto">
        <div className="p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;
