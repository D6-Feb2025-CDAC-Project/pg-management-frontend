import { Route, Routes, Navigate } from "react-router-dom";

import Login from "./components/pages/tenant-authentication/Login";
import PasswordReset from "./components/pages/tenant-authentication/PasswordReset";

import GuestLayout from "./components/shared/GuestLayout";
import TenantLayout from "./components/shared/TenantLayout";
import AuthLayout from "./components/shared/AuthLayout";
import AdminLayout from "./components/shared/AdminLayout";

import GuestDashboard from "./components/pages/guest/GuestDashboard";
import SingleRooms from "./components/pages/guest/SingleRooms";
import DoubleRooms from "./components/pages/guest/DoubleRooms";
import TripleRooms from "./components/pages/guest/TripleRooms";
import Amenities from "./components/pages/guest/Amenities";
import Rooms from "./components/pages/guest/Rooms";

import TenantDashboard from "./components/pages/tenant/Dashboard";
import Payment from "./components/pages/tenant/Payment";
import LeaveRequest from "./components/pages/tenant/Leavepg";
import TenantNotices from "./components/pages/tenant/Notices";
import TenantComplaints from "./components/pages/tenant/Complaints";

import AdminDashboard from "./components/pages/admin/Dashboard";
import AdminRooms from "./components/pages/admin/Rooms";
import AddProperty from "./components/pages/admin/AddProperty";
import EditProperty from "./components/pages/admin/EditProperty";
import Tenants from "./components/pages/admin/Tenants";
import AdminComplaints from "./components/pages/admin/Complaints";
import LeaveNotices from "./components/pages/admin/LeaveNotices";
import AdminNotices from "./components/pages/admin/Notices";

import "./index.css";
import PendingBookings from "./components/pages/sub-components/PendingBookings";
import RoomDetails from "./components/pages/guest/RoomDetails";

function App() {
  return (
    <Routes>
      // Guest routes
      <Route path="/guest" element={<GuestLayout />}>
        <Route path="dashboard" element={<GuestDashboard />} />
        <Route path="amenities" element={<Amenities />} />
        <Route path="rooms" element={<Rooms />} />
        <Route path="/guest/rooms/single" element={<SingleRooms />} />
        <Route path="/guest/rooms/double" element={<DoubleRooms />} />
        <Route path="/guest/rooms/triple" element={<TripleRooms />} />
        <Route index element={<Navigate to="/guest/dashboard" replace />} />
      </Route>
      // room details route only with footer
      <Route path="/guest/room-details" element={<RoomDetails />} />
      // Tenant auth routes
      <Route path="/user" element={<AuthLayout />}>
        <Route path="login" element={<Login />} />
        <Route path="password-reset" element={<PasswordReset />} />
        <Route index element={<Navigate to="/user/login" replace />} />
      </Route>
      // tenant routes
      <Route path="/tenant" element={<TenantLayout />}>
        <Route path="dashboard" element={<TenantDashboard />} />
        <Route path="payment" element={<Payment />} />
        <Route path="leave-pg" element={<LeaveRequest />} />
        <Route path="complaints" element={<TenantComplaints />} />
        <Route path="notices" element={<TenantNotices />} />
        <Route index element={<Navigate to="/tenant/dashboard" replace />} />
      </Route>
      // admin auth Routes
      <Route path="/superUser" element={<AuthLayout />}>
        {/* <Route path="login" element={<Login />} />
        <Route index element={<Navigate to="/admin/login" replace />} /> */}
      </Route>
      // admin routes
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="rooms" element={<AdminRooms />} />
         <Route path="add-property" element={<AddProperty />} />
         <Route path="edit-property/:roomNo" element={<EditProperty />} />
        <Route path="tenants" element={<Tenants />} />
        <Route path="complaints" element={<AdminComplaints />} />
        <Route path="leave-notices" element={<LeaveNotices />} />
        <Route path="notices" element={<AdminNotices />} />
        <Route path="pending-bookings" element={<PendingBookings />} />
        <Route index element={<Navigate to="/admin/dashboard" replace />} />
      </Route>
    </Routes>
  );
}

export default App;
