export const AUTH = {
  LOGIN: "/login",
  LOGOUT: "/logout",
  FORGOT_PASSWORD: "/forgot-password",
};

export const USER = {
  LIST: "/users/",
  SHOW: "/users/show",
  CREATE: "/users/create",
  UPDATE: "/users/update",
  LOCK: "/users/lock",
  UNLOCK: "/users/unlock",
  DELETE: "/users/delete",
  MULTIPLE_DELETE: "/users/multiple-delete",
};

export const POST = {
  LIST: "/posts/",
  SHOW: "/posts/show",
  CREATE: "/posts/create",
  UPDATE: "posts/update",
  EDIT: "/post/edit",
  MULTIPLE_DELETE: "/posts/multiple-delete",
  IMPORT_CSV: "/posts/import/csv",
  CSV_PROGRESS: "/posts/csv-progress",
  EXPORT_CSV: "/posts/export/csv",
};
