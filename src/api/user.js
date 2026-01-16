import { USER } from "../constants/routes";
import client from "../provider/axios";

export const userListApi = async (params = {}) => {
  const response = await client.get(USER.LIST, { params });
  return response.data;
};

export const userLockApi = async (payload) => {
  const response = await client.post(USER.LOCK, payload);
  return response.data;
};

export const userUnlockApi = async (payload) => {
  const response = await client.post(USER.UNLOCK, payload);
  return response.data;
};

export const deleteUsersApi = async (payload) => {
  const response = await client.post(USER.DELETE, payload);
  return response.data;
};
