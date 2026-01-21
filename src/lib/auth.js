import { jwtDecode } from "jwt-decode";
import { Cookies } from "react-cookie";
import useAuthStore from "../store/useAuthStore";
import { TOKEN } from "../constants/commons";
import { logOutApi } from "../api/auth";
import client from "../provider/axios";

const cookies = new Cookies();

export const saveTokenAndAuth = (tokeName, token, saveAuth = true) => {
  const decodedAccess = jwtDecode(token);
  const accessTokenExpiresAt = new Date(decodedAccess.exp * 1000);
  const { setUser } = useAuthStore.getState();

  cookies.set(tokeName, token, {
    expires: accessTokenExpiresAt,
    secure: true,
    sameSite: "strict",
  });

  if (saveAuth && decodedAccess.user) {
    setUser(decodedAccess.user);
  }
};

export const logout = (deleteSession = true) => {
  cookies.remove(TOKEN.ACCESS_TOKEN);
  cookies.remove(TOKEN.REFRESH_TOKEN);
  const { removeAuthUser } = useAuthStore.getState();
  if (deleteSession) {
    removeAuthUser();
  }
};
export const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
};

export const forceLogout = async () => {
  const refresh_token = getCookie(TOKEN.REFRESH_TOKEN);
  try {
    const options = {
      headers: {
        Authorization: `Bearer ${refresh_token}`,
        "X-Refresh-Token": refresh_token,
      },
    };

    const res = await client.post("/logout", {}, options);
    logout();
  } catch (error) {
    console.log("Force Logout Error => ", error);
    logout();
  }
};
