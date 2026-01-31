import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  changePasswordApi,
  deleteUsersApi,
  getUserApi,
  userCreateApi,
  userListApi,
  userLockApi,
  userUnlockApi,
  userUpdateApi,
} from "../api/user";

export const userList = (params) => {
  return useQuery({
    queryKey: ["users", params],
    queryFn: () => userListApi(params),
    keepPreviousData: true,
  });
};

export const getUser = (id) => {
  return useQuery({
    queryKey: ["user", id],
    queryFn: () => getUserApi(id),
    enabled: !!id,
    onError: (error) => {
      console.error(error);
    },
  });
};

export const createUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: userCreateApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error) => {
      console.error(error);
    },
  });
};

export const updateUser = (id) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (formData) => userUpdateApi(formData, id),
    onSuccess: () => {
      // queryClient.invalidateQueries({ queryKey: ["users"] });
      // queryClient.invalidateQueries({ queryKey: ["user", id] });
    },
    onError: (error) => {
      console.error(error);
    },
  });
};

export const lockUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userLockApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },

    onError: (error) => {
      console.error("Lock user fail.", error);
    },
  });
};

export const unlockUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userUnlockApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },

    onError: (error) => {
      console.error("Unlock user fail", error);
    },
  });
};

export const deleteUsers = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteUsersApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (errors) => {
      console.error("delete User api", errors);
    },
  });
};

export const changePassword = (id) => {
  return useMutation({
    mutationFn: (payload) => changePasswordApi(payload, id),
    onSuccess: (data) => {
      console.log("Reset Password Success.");
    },
    onError: (error) => {
      console.error(
        "Reset Password Fail:",
        error.response?.data?.message ?? error.message,
      );
    },
  });
};
