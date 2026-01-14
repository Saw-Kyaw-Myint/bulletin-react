import { Navigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useCheckAuthentication } from "../../hooks/useAuth";
import { useEffect } from "react";
import useAuthStore from "../../store/useAuthStore";
import { jwtDecode } from "jwt-decode";

const AuthMiddleware = ({ children }) => {
  const [cookies] = useCookies(["access_token"]);
  const { setUser, user } = useAuthStore();

  useEffect(() => {
    if (!cookies.access_token) {
      return <Navigate to="/" />;
    }
    const decodedAccess = jwtDecode(cookies.access_token);
    const decode_user = decodedAccess?.user;

    if (decode_user) {
      setUser(decode_user);
    }
  }, [cookies.access_token, setUser]);

  return <>{children}</>;
};

export default AuthMiddleware;
