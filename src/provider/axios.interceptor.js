import { TOKEN } from "../constants/commons";
import useAuthStore from "../store/useAuthStore";
import client from "./axios";
import { Cookies } from "react-cookie";

const cookies = new Cookies();

client.interceptors.request.use(
  (config) => {
    const token = cookies.get(TOKEN.ACCESS_TOKEN);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/* ---------------- RESPONSE ---------------- */
client.interceptors.response.use(
  (response) => response,

  (error) => {
    const status = error?.response?.status;

    if (status == 401) {
      alert("401 Unauthorized → logging out");
      cookies.remove(TOKEN.ACCESS_TOKEN, { path: "/" });
      useAuthStore.getState().logout();
      window.location.href = "/";
    }

    return Promise.reject(error);
  }
);
