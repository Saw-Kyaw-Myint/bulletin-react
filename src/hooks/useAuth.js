import { useMutation } from "@tanstack/react-query";
import {
  forgotPasswordApi,
  loginApi,
  refreshApi,
  resetPasswordApi,
} from "../api/auth";
import { jwtDecode } from "jwt-decode";
import { useCookies } from "react-cookie";
import useAuthStore from "../store/useAuthStore";
import { useEffect } from "react";
import { saveTokenAndAuth } from "../lib/auth";
import { TOKEN } from "../constants/commons";
import { useNavigate } from "react-router-dom";

export const useAuthInit = () => {
  const navigate = useNavigate();

  const [accessCookies, , removeAccessCookie] = useCookies(["access_token"]);
  const [refreshCookies, , removeRefreshCookie] = useCookies(["refresh_token"]);

  const { user, setUser, removeAuthUser } = useAuthStore();

  const callRefreshApi = async (refreshToken) => {
    try {
      const response = await refreshApi(refreshToken);

      saveTokenAndAuth(TOKEN.ACCESS_TOKEN, response.access_token);
      saveTokenAndAuth(TOKEN.REFRESH_TOKEN, response.refresh_token, false);

      return true;
    } catch (error) {
      return false;
    }
  };

  useEffect(() => {
    const initAuth = async () => {
      const accessToken = accessCookies.access_token;
      const refreshToken = refreshCookies.refresh_token;

      // 🔹 No access token
      if (!accessToken) {
        if (refreshToken) {
          const refreshed = await callRefreshApi(refreshToken);

          if (refreshed) {
            navigate("/posts");
            return;
          }
        }

        removeAuthUser();
        return;
      }

      // 🔹 Access token exists
      try {
        const decoded = jwtDecode(accessToken);

        if (decoded.exp * 1000 < Date.now()) {
          removeAccessCookie("access_token");
          removeAuthUser();
          return;
        }
        if (!user) {
          setUser(decoded.user);
        }
      } catch (error) {
        removeAccessCookie("access_token");
        removeAuthUser();
      }
    };

    initAuth();
  }, [
    accessCookies,
    refreshCookies,
    navigate,
    removeAccessCookie,
    removeRefreshCookie,
    setUser,
    removeAuthUser,
  ]);
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

export const forgotPassword = () => {
  return useMutation({
    mutationFn: forgotPasswordApi,
    onSuccess: (data) => {
      console.log("Forgot Password Success.");
    },
    onError: (error) => {
      console.error(
        "Forgot Password Fail:",
        error.response?.data?.message ?? error.message,
      );
    },
  });
};

export const resetPassword = () => {
  return useMutation({
    mutationFn: resetPasswordApi,
    onSuccess: (data) => {
      console.log("Reset Password Success.");
    },
    onError: (error) => {
      console.error(
        "Reset Password Fail:",
        error.response?.data?.message ?? error.message,
      );
    },
  });
};
