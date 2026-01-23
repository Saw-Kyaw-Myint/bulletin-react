import { TOKEN } from "../constants/commons";
import client from "./axios";
import { Cookies } from "react-cookie";
import { logout, saveTokenAndAuth } from "../lib/auth";
import { refreshApi } from "../api/auth";

const cookies = new Cookies();

client.interceptors.request.use(
  (config) => {
    const token = cookies.get(TOKEN.ACCESS_TOKEN);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

/* ---------------- RESPONSE ---------------- */
let isRefreshing = false;
let queue = [];
client.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config;
    const status = error?.response?.status;

    if (status === 401 && !original._retry) {
      original._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          queue.push((token) => {
            original.headers.Authorization = `Bearer ${token}`;
            resolve(api(original));
          });
        });
      }

      isRefreshing = true;
      const refreshToken = getCookie(TOKEN.REFRESH_TOKEN);
      try {
        const response = await refreshApi(refreshToken);
        const newAccessToken = response.access_token;
        const newRefreshToken = response.refresh_token;
        saveTokenAndAuth(TOKEN.ACCESS_TOKEN, newAccessToken);
        saveTokenAndAuth(TOKEN.REFRESH_TOKEN, newRefreshToken, false);

        queue.forEach((cb) => cb(newAccessToken));
        queue = [];

        original.headers.Authorization = `Bearer ${newAccessToken}`;
        return client(original);
      } catch (e) {
        alert("401 Unauthorized → Please Login again.");
        logout();
        window.location.href = "/";
        return Promise.reject(e);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}
