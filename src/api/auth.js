import { AUTH } from "../constants/routes";
import client from "../provider/axios";

export const login = async ({ email, password, remember }) => {
  const response = await client.post(AUTH.LOGIN, { email, password, remember });
  return response.data;
};
