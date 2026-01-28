import { POST } from "../constants/routes";
import client from "../provider/axios";

export const postListApi = async (params = {}) => {
  const response = await client.get(POST.LIST, { params });
  return response.data;
};

export const getPostApi = async (postId) => {
  const response = await client.get(`${POST.SHOW}/${postId}`);
  return response.data;
};

export const createPostApi = async (payload) => {
  const response = await client.post(POST.CREATE, payload);
  return response.data;
};

export const updatePostApi = async (payload, id) => {
  const response = await client.put(`${POST.UPDATE}/${id}`, payload);
  return response.data;
};

export const deletePostsApi = async (payload) => {
  const response = await client.post(POST.MULTIPLE_DELETE, payload);
  return response.data;
};

export const importCSV = async (payload) => {
  const response = await client.post(POST.IMPORT_CSV, payload, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const csvProgressApi = async (task_id) => {
  const response = await client.get(`${POST.CSV_PROGRESS}/${task_id}`);
  return response.data;
};

export const exportCSV = async (payload) => {
  const response = await client.post(POST.EXPORT_CSV, payload);
  return response.data;
};
