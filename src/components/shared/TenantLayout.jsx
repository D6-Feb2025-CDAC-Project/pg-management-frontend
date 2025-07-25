import { Outlet } from 'react-router-dom';
import Sidebar from '../pages/tenant/Sidebar';

function TenantLayout() {
    console.log("Inside tenant");
    return (
        <div className="flex h-screen">
            <Sidebar />
            <div className="flex-1 bg-purple-200 overflow-y-auto">
                <div className="p-4">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default TenantLayout
