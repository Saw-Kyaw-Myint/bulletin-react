import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createPostApi,
  deletePostsApi,
  getPostApi,
  importCSV,
  csvProgressApi,
  postListApi,
  updatePostApi,
} from "../api/post";
import { useEffect } from "react";

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
      queryClient.invalidateQueries({ queryKey: ["post"] });
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
      queryClient.invalidateQueries({ queryKey: ["post"] });
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

export const importCsv = () => {
  return useMutation({
    mutationFn: importCSV,
    onSuccess: () => {
      console.log("Success csv import.");
    },
    onError: (errors) => {
      console.error("Import csv api.", errors);
    },
  });
};

export const csvProgress = (task_id) => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["csvProgress", task_id],
    queryFn: () => csvProgressApi(task_id),
    enabled: !!task_id,
    refetchInterval: (query) => {
      const progress = Number(query.state.data?.progress || 0);
      return progress >= 100 ? false : 1000;
    },
    onError: (error) => {
      console.error("CSV progress error:", error);
    },
  });

  // Watch the `data` to handle progress
  useEffect(() => {
    if (query.data) {
      console.log("Current progress:", query.data.progress);

      if (query.data.progress >= 100) {
        console.log("CSV import finished!");
        queryClient.invalidateQueries({ queryKey: ["posts"] });
      }
    }
  }, [query.data, queryClient]);

  return query;
};
