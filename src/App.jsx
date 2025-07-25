import { Route, Routes, Navigate } from 'react-router-dom'
import AuthLayout from './components/shared/AuthLayout'
import Login from './components/pages/Login'
import PasswordReset from './components/pages/PasswordReset'
import Rooms from './components/pages/guest/Rooms'
import SingleRooms from "./components/pages/guest/SingleRooms";
import DoubleRooms from './components/pages/guest/DoubleRooms'
import TripleRooms from './components/pages/guest/TripleRooms'
import GuestLayout from './components/shared/GuestLayout'
import TenantLayout from './components/shared/TenantLayout'
import Dashboard from './components/pages/tenant/Dashboard'
import './index.css'
import Payment from './components/pages/tenant/Payment'
import Leavepg from './components/pages/tenant/Leavepg'
import Notices from './components/pages/tenant/Notices'
import Amenities from "./components/pages/guest/Amenities";
import GuestLayout from "./components/shared/GuestLayout";
import Registration from "./components/pages/guest/Registration";
import GuestDashboard from "./components/pages/guest/GuestDashboard";

function App() {
  return (
    <Routes>
      {/* <Route path='/home' element={<LandingPage />} /> */}

// Guest routes
      <Route path="/guest" element={<GuestLayout />}>
        <Route path="dashboard" element={<GuestDashboard />} />
        <Route path="amenities" element={<Amenities />} />
        <Route path="/guest/rooms" element={<Rooms />} />
        <Route path="/guest/rooms/single" element={<SingleRooms />} />
        <Route path="/guest/rooms/double" element={<DoubleRooms />} />
        <Route path="/guest/rooms/triple" element={<TripleRooms />} />
        <Route index element={<Navigate to="/guest/dashboard" replace />} />

      </Route>
// Tenant auth routes
      <Route path='/auth' element={<AuthLayout />}>
        <Route path='login' element={<Login />} />
        <Route path='password-reset' element={<PasswordReset />} />
        <Route index element={<Navigate to='/auth/login' replace />} />
      </Route>
// tenant routes
      <Route path='/tenant' element={<TenantLayout />}>
        <Route path='dashboard' element={<Dashboard />} />
        <Route path='payment' element={<Payment />} />
        <Route path='leave-pg' element={<Leavepg />} />
        <Route path='notices' element={<Notices />} />
      </Route>

    </Routes>
  );
}

export default App;
