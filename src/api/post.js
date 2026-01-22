import { POST } from "../constants/routes";
import client from "../provider/axios";

export const postListApi = async (params = {}) => {
  const response = await client.get(POST.LIST, { params });
  return response.data;
};

export const deletePostsApi = async (payload) => {
  const response = await client.post(POST.MULTIPLE_DELETE, payload);
  return response.data;
};
