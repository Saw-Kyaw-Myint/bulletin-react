import { useMutation } from "@tanstack/react-query";
import { login } from "../api/authApi";
import { jwtDecode } from "jwt-decode";
import { useCookies } from "react-cookie";
import useAuthStore from "../store/useAuthStore";
import { useEffect } from "react";

export const useLogin = () => {
  const [, setCookie] = useCookies(["access_token", "refresh_token"]);
  const setUser = useAuthStore((state) => state.setUser);

  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      // 1️⃣ Decode tokens
      const decodedAccess = jwtDecode(data.access_token);
      const decodedRefresh = jwtDecode(data.refresh_token);

      // 2️⃣ Extract expiry (UNIX timestamp in seconds)
      const accessTokenExpiresAt = new Date(decodedAccess.exp * 1000);
      const refreshTokenExpiresAt = new Date(decodedRefresh.exp * 1000);

      // 3️⃣ Store RAW tokens in cookies
      setCookie("access_token", data.access_token, {
        expires: accessTokenExpiresAt,
        secure: true,
        sameSite: "strict",
      });

      setCookie("refresh_token", data.refresh_token, {
        expires: refreshTokenExpiresAt,
        secure: true,
        sameSite: "strict",
      });

      setUser(decodedAccess.user);
    },
    onError: (error) => {
      console.error(
        "Login failed:",
        error.response?.data?.message || error.message
      );
    },
  });
};

export const useAuthInit = () => {
  const [cookies, , removeCookie] = useCookies(["access_token"]);
  const { setUser, logout } = useAuthStore();

  useEffect(() => {
    const token = cookies.access_token;

    if (!token) {
      logout();
      return;
    }

    try {
      const decoded = jwtDecode(token);

      // token expire check
      if (decoded.exp * 1000 < Date.now()) {
        removeCookie("access_token");
        logout();
        return;
      }

      setUser(decoded.user);
    } catch (err) {
      logout();
    }
  }, []);
};
