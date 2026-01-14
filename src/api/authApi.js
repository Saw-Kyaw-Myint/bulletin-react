import client from "./client";

export const login = async ({ email, password, remember }) => {
  const response = await client.post("/login", { email, password, remember });
  return response.data;
};
