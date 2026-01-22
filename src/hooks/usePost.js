import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deletePostsApi, getPostApi, postListApi } from "../api/post";

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
