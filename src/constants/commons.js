export const Role = {
  true: "User",
  false: "Admin",
};

export const imagePath = `${import.meta.env.VITE_API_URL}/images`;

export const userRolesOptions = [
  { value: 0, label: "admin" },
  { value: 1, label: "User" },
];

export const userStatus = {
  true: "Lock",
  false: "Unlock",
};

export const TOKEN = {
  ACCESS_TOKEN: "access_token",
  REFRESH_TOKEN: "refresh_token",
};

export const PostStatus = {
  0: "inactive",
  1: "active",
};
