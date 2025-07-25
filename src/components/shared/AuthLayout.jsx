import { Outlet } from "react-router";

const AuthLayout = () => {
  console.log("On user layout page");
  return (
    <div className="flex items-center justify-center min-h-screen bg-indigo-100">
      <Outlet />
    </div>
  );
};

export default AuthLayout;
