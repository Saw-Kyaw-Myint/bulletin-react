import { useMutation } from "@tanstack/react-query";
import { loginApi } from "../api/auth";
import { jwtDecode } from "jwt-decode";
import { useCookies } from "react-cookie";
import useAuthStore from "../store/useAuthStore";
import { useEffect } from "react";
import { saveTokenAndAuth } from "../lib/auth";
import { TOKEN } from "../constants/commons";

export const useAuthInit = () => {
  const [cookies, , removeCookie] = useCookies(["access_token"]);
  const { setUser, removeAuthUser } = useAuthStore();

  useEffect(() => {
    const token = cookies.access_token;

    if (!token) {
      removeAuthUser();
      return;
    }

    try {
      const decoded = jwtDecode(token);
      if (decoded.exp * 1000 < Date.now()) {
        removeCookie("access_token");
        removeAuthUser();
        return;
      }

      setUser(decoded.user);
    } catch (err) {
      removeAuthUser();
    }
  }, []);
};

export const useLogin = () => {
  return useMutation({
    mutationFn: loginApi,
    onSuccess: (data) => {
      saveTokenAndAuth(TOKEN.ACCESS_TOKEN, data.access_token);
      saveTokenAndAuth(TOKEN.REFRESH_TOKEN, data.refresh_token, false);
    },
    onError: (error) => {
      console.error(
        "Login failed:",
        error.response?.data?.message ?? error.message,
      );
    },
  });
};
