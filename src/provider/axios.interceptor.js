import { jwtDecode } from "jwt-decode";
import { TOKEN } from "../constants/commons";
import useAuthStore from "../store/useAuthStore";
import client from "./axios";
import { Cookies } from "react-cookie";
import { useCookies } from "react-cookie";

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
let isRefreshing = false;

/* ---------------- RESPONSE ---------------- */
client.interceptors.response.use(
  (response) => response,

  async (error) => {
    // const [, setCookie] = useCookies(["access_token"]);
    // const setUser = useAuthStore((state) => state.setUser);
    // const original = error.config;

    // console.log("token error", error);
    // const status = error?.response?.status;

    // if (status == 401 && !original._retry) {
    //   original._retry = true;

    //   if (isRefreshing) {
    //     return new Promise((resolve) => {
    //       original.headers.Authorization = `Bearer ${token}`;
    //       resolve(api(original));
    //     });
    //   }

    //   isRefreshing = true;
    //   try {
    //     const res = await client.post("/refresh");
    //     const newToken = res.data.access_token;
    //     const decodedAccess = jwtDecode(newToken);
    //     const accessTokenExpiresAt = new Date(decodedAccess.exp * 1000);

    //     setCookie("access_token", data.access_token, {
    //       expires: accessTokenExpiresAt,
    //       secure: true,
    //       sameSite: "strict",
    //     });

    //     setUser(decodedAccess.user);

    //     queue.forEach((cb) => cb(newToken));
    //     queue = [];

    //     original.headers.Authorization = `Bearer ${newToken}`;
    //     return api(original);
    //   } catch (e) {
    //     alert("401 Unauthorized → logging out");
    //     cookies.remove(TOKEN.ACCESS_TOKEN, { path: "/" });
    //     useAuthStore.getState().logout();
    //     window.location.href = "/";
    //     return Promise.reject(e);
    //   } finally {
    //     isRefreshing = false;
    //   }
    // }

    return Promise.reject(error);
  },
);
