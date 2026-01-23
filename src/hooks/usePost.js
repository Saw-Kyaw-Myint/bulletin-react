import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createPostApi,
  deletePostsApi,
  getPostApi,
  postListApi,
  updatePostApi,
} from "../api/post";

export const postList = (params) => {
  return useQuery({
    queryKey: ["posts", params],
    queryFn: () => postListApi(params),
    keepPreviousData: true,
  });
};

export const getPost = (id) => {
  return useQuery({
    queryKey: ["post", id],
    queryFn: () => getPostApi(id),
    enabled: !!id,
    onError: (error) => {
      console.error(error);
    },
  });
};

export const createPost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPostApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts", id] });
    },
    onError: (errors) => {
      console.error("create Post api", errors);
    },
  });
};

export const updatePost = (id) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData) => updatePostApi(formData, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: (error) => {
      console.error(error);
    },
  });
};

export const deletePosts = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePostsApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: (errors) => {
      console.error("Delete Post api", errors);
    },
  });
};
