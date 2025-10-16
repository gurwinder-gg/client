// src/components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import useAuthStore from "../store/authStore";

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user, fetchUser } = useAuthStore();

  // Fetch user if not already loaded
  if (!user) fetchUser();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
