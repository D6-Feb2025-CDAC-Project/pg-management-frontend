import { Outlet } from 'react-router-dom';
import Sidebar from '../pages/tenant/Sidebar';
import React from 'react'

function TenantLayout() {
    console.log("Inside tenant");
    return (
        <div className="flex">
            <Sidebar />
            <div className="flex-1 min-h-screen bg-purple-200 flex items-center justify-center">
                <Outlet />
            </div>

        </div>
    )
}

export default TenantLayout
