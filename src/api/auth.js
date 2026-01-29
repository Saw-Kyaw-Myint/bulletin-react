import { AUTH } from "../constants/routes";
import client from "../provider/axios";

export const loginApi = async (payload) => {
  const response = await client.post(AUTH.LOGIN, payload);
  return response.data;
};

export const refreshApi = async (refreshToken) => {
  const options = {
    headers: {
      Authorization: `Bearer ${refreshToken}`,
      "X-Refresh-Token": refreshToken,
    },
  };
  const response = await client.post("/refresh", {}, options);
  return response.data;
};

export const logOutApi = async (refreshToken) => {
  const options = {
    method: "post",
    credentials: true,
    headers: {
      Authorization: `Bearer ${refreshToken}`,
      "X-Refresh-Token": refreshToken,
    },
  };
  const response = await client.post(AUTH.LOGOUT, {}, options);

  return response.data;
};

export const forgotPasswordApi = async (payload) => {
  const response = await client.post(AUTH.FORGOT_PASSWORD, payload);
  return response.data;
};

export const resetPasswordApi = async (payload) => {
  const response = await client.post(AUTH.RESET_PASSWORD, payload);
  return response.data;
};
