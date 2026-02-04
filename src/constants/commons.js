export const Role = {
  1: "User",
  0: "Admin",
};
console.log("log log");

export const RoleText = {
  User: 1,
  Admin: 0,
};

export const imagePath = `${import.meta.env.VITE_API_URL}/images`;

export const userRolesOptions = [
  { value: 0, label: "Admin" },
  { value: 1, label: "User" },
];

export const UserStatus = {
  1: "Lock",
  0: "Unlock",
};

export const UserStatusText = {
  Lock: 1,
  Unlock: 0,
};

export const TOKEN = {
  ACCESS_TOKEN: "access_token",
  REFRESH_TOKEN: "refresh_token",
};

export const PostStatus = {
  0: "inactive",
  1: "active",
};

export const PostStatusText = {
  Inactive: 0,
  Active: 1,
};
