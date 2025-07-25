import { Route, Routes, Navigate } from "react-router-dom";
import AuthLayout from "./components/shared/AuthLayout";
import Login from "./components/pages/Login";
import PasswordReset from "./components/pages/PasswordReset";

import GuestDashboard from "./components/pages/guest/GuestDashboard";
import "./index.css";
import Amenities from "./components/pages/guest/Amenities";
import GuestLayout from "./components/shared/GuestLayout";
import Registration from "./components/pages/guest/Registration";

function App() {
  return (
    <Routes>
      {/* <Route path='/home' element={<LandingPage />} /> */}
      <Route path="/auth" element={<AuthLayout />}>
        <Route path="login" element={<Login />} />
        <Route path="password-reset" element={<PasswordReset />} />
        <Route path="registration" element={<Registration />} />
        <Route index element={<Navigate to="/auth/login" replace />} />
      </Route>
      <Route path="/tenant" element={<UserLayout />}>
        <Route index element={<Navigate to="/tenant/dashboard" replace />} />
      </Route>

      <Route path="/guest" element={<GuestLayout />}>
        <Route path="dashboard" element={<GuestDashboard />} />
        <Route path="amenities" element={<Amenities />} />
        <Route index element={<Navigate to="/guest/dashboard" replace />} />
      </Route>
    </Routes>
  );
}

export default App;
