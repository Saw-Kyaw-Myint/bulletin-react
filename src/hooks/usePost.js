import { useQuery } from "@tanstack/react-query";
import { postListApi } from "../api/post";

export const postList = (params) => {
  return useQuery({
    queryKey: ["posts", params],
    queryFn: () => postListApi(params),
    keepPreviousData: true,
  });
};
