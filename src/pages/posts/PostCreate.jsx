import Layout from "../../components/Layout";
import { createPost } from "../../hooks/usePost";
import PostForm from "../../components/Form/PostForm";
import { useState } from "react";
import { createPostApi } from "../../api/post";
import { useQueryClient } from "@tanstack/react-query";
import { confirmApi } from "../../lib/common";

const PostCreate = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const mutation = createPost();
  const queryClient = useQueryClient();

  const handleSubmit = (formData, setError) => {
    const payload = {
      ...(formData.title && { title: formData.title }),
      ...(formData.description && { description: formData.description }),
    };
    mutation.mutate(payload, {
      onSuccess: async (res) => {
        if (res?.is_valid_request) {
          await confirmApi({
            apiFn: createPostApi,
            payload,
            queryClient,
            invalidateKeys: [["posts"]],
            onSuccess: () => setIsSuccess(true),
          });
        }
      },
      onError: (err) => {
        setIsSuccess(false);
        setError(err.response?.data?.errors);
      },
    });
  };

  return (
    <Layout activeRoute="post-create">
      <main className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          <PostForm
            onSubmit={handleSubmit}
            submitText="Create"
            isSuccess={isSuccess}
            loading={mutation.isLoading}
          />
        </div>
      </main>
    </Layout>
  );
};

export default PostCreate;
