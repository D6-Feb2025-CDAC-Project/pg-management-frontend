import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children, roles }) {
  const { isLoggedIn, user, token, expiresAt } = useSelector(
    (state) => state.auth
  );

  if (!isLoggedIn || !token || Date.now() > expiresAt) {
    return <Navigate to="/user/login" replace />;
  }

  if (roles && !roles.includes(user.role)) {
    // Redirect to not authorized page or dashboard
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}
