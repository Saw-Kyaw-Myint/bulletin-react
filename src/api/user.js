import { USER } from "../constants/routes";
import client from "../provider/axios";

export const userListApi = async (params = {}) => {
  const response = await client.get(USER.LIST, { params });
  return response.data;
};

export const getUserApi = async (id) => {
  const response = await client.get(`${USER.SHOW}/${id}`);
  return response.data;
};

export const userCreateApi = async (payload) => {
  const response = await client.post(USER.CREATE, payload, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const userUpdateApi = async (payload, id) => {
  const response = await client.post(`${USER.UPDATE}/${id}`, payload, {
    headers: { "Content-Type": "multipart/form-data" },
  });
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
  const response = await client.post(USER.MULTIPLE_DELETE, payload);
  return response.data;
};

export const changePasswordApi = async (payload, id) => {
  const response = await client.post(`${USER.CHANGE_PASSWORD}/${id}`, payload);
  return response.data;
};
