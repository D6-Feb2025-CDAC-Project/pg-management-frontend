import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const auth = useSelector((state) => state.auth);

  if (auth.isLoggedIn) {
    // Redirect based on role
    if (auth.user.role === "ROLE_ADMIN") {
      return <Navigate to="/admin/dashboard" replace />;
    } else if (auth.user.role === "ROLE_USER") {
      return <Navigate to="/tenant/dashboard" replace />;
    } else {
      // Default redirect if role is unknown
      return <Navigate to="/guest/dashboard" replace />;
    }
  }

  return children;
};

export default PublicRoute;
