// components/ProtectedRoute.tsx
import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";
import { Role, RoleText } from "../constants/commons";

const ProtectedAdminRoute = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const user = useAuthStore((state) => state.user);

  return isAuthenticated && user?.role == RoleText.Admin ? (
    <Outlet />
  ) : (
    <Navigate to="/" replace />
  );
};

export default ProtectedAdminRoute;
