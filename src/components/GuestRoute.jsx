// components/ProtectedRoute.tsx
import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";
import { Role, RoleText } from "../constants/commons";

const GuestRoute = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const user = useAuthStore((state) => state.user);

  return !isAuthenticated ? <Outlet /> : <Navigate to="/posts" replace />;
};

export default GuestRoute;
