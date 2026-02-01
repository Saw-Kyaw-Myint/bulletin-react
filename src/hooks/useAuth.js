import { useMutation } from "@tanstack/react-query";
import {
  forgotPasswordApi,
  loginApi,
  refreshApi,
  registerApi,
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
  const [accessCookies, , removeAccessCookie] = useCookies(["access_token"]);
  const [refreshCookies, , removeRefreshCookie] = useCookies(["refresh_token"]);

  const accessToken = accessCookies.access_token || null;
  const refreshToken = refreshCookies.refresh_token || null;

  const { user, setUser, removeAuthUser } = useAuthStore();

  const callRefreshApi = async (refreshToken) => {
    try {
      const response = await refreshApi(refreshToken);
      saveTokenAndAuth(TOKEN.ACCESS_TOKEN, response.access_token);
      saveTokenAndAuth(TOKEN.REFRESH_TOKEN, response.refresh_token, false);
      return true;
    } catch {
      return false;
    }
  };

  useEffect(() => {
    const initAuth = async () => {
      // fully logged out
      if (!accessToken && !refreshToken) {
        removeAuthUser();
        return;
      }

      // try refresh
      if (!accessToken && refreshToken) {
        const refreshed = await callRefreshApi(refreshToken);

        if (!refreshed) {
          removeRefreshCookie("refresh_token");
          removeAuthUser();
        }
        return;
      }

      // access token exists
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
      } catch {
        removeAccessCookie("access_token");
        removeAuthUser();
      }
    };

    initAuth();
  }, [accessToken, refreshToken]);
};

export const register = () => {
  return useMutation({
    mutationFn: registerApi,
    onError: (error) => {
      console.error(
        "Login failed:",
        error.response?.data?.message ?? error.message,
      );
    },
  });
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
