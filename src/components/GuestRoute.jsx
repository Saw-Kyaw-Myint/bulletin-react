// components/ProtectedRoute.tsx
import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";
import { getCookie } from "../lib/auth";
import { AUTH } from "../constants/routes";
import { TOKEN } from "../constants/commons";

const GuestRoute = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const token = getCookie(TOKEN.ACCESS_TOKEN);
  if (!isAuthenticated && !token) {
    console.log("guest route", true);
  } else {
    console.log("isAuthenticated", isAuthenticated);
    console.log("guest token", true);
  }

  return !isAuthenticated ? <Outlet /> : <Navigate to="/posts" replace />;
};

export default GuestRoute;
