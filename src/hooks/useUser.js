import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteUsersApi,
  userCreateApi,
  userListApi,
  userLockApi,
  userUnlockApi,
} from "../api/user";

export const userList = (params) => {
  return useQuery({
    queryKey: ["users", params],
    queryFn: () => userListApi(params),
    keepPreviousData: true,
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
