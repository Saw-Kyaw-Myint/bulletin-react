import Layout from "../../components/Layout";
import { createPost, getPost, updatePost } from "../../hooks/usePost";
import PostForm from "../../components/Form/PostForm";
import { useParams } from "react-router-dom";
import { confirmApi } from "../../lib/common";
import { updatePostApi } from "../../api/post";
import { useQueryClient } from "@tanstack/react-query";

const PostEdit = () => {
  const params = useParams();
  const mutation = updatePost(params.id);
  const { data, isLoading } = getPost(params.id);
  const queryClient = useQueryClient();

  const handleSubmit = (formData, setError) => {
    const payload = {
      ...(formData.title && { title: formData.title }),
      ...(formData.description && { description: formData.description }),
      ...{
        status: formData.status ? 1 : 0,
      },
    };
    mutation.mutate(payload, {
      onSuccess: async (res) => {
        if (res?.is_valid_request) {
          await confirmApi({
            apiFn: updatePostApi,
            update_id: params.id,
            payload,
            queryClient,
            invalidateKeys: [["posts"]],
          });
        }
      },
      onError: (err) => {
        setError(err.response?.data?.errors);
      },
    });
  };

  return (
    <Layout>
      <main className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          <PostForm
            initialValues={data}
            mode="edit"
            onSubmit={handleSubmit}
            submitText="Update"
            loading={mutation.isLoading}
          />
        </div>
      </main>
    </Layout>
  );
};

export default PostEdit;
