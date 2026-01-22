import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deletePostsApi, postListApi } from "../api/post";

export const postList = (params) => {
  return useQuery({
    queryKey: ["posts", params],
    queryFn: () => postListApi(params),
    keepPreviousData: true,
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
