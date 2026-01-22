import Layout from "../../components/Layout";
import React, { useEffect, useState } from "react";
import Loading from "../../components/Loading";

import { getUser, updateUser } from "../../hooks/useUser";
import { formatDateToISO } from "../../utils/date";
import useAuthStore from "../../store/useAuthStore";
import UserEditForm from "../../components/Form/UserEditForm";

const ProfileEdit = () => {
  const { user } = useAuthStore();
  const { data, isLoading, isError, error } = getUser(user.id);
  const mutation = updateUser(user.id);
  const { setUser } = useAuthStore.getState();

  const [formData, setFormData] = useState({
    user_id: user?.id,
    name: "",
    email: "",
    password: "",
    confirm_password: "",
    role: "",
    phone: "",
    dob: "",
    address: "",
    profile: null,
  });

  const [previewImage, setPreviewImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState({});

  useEffect(() => {
    if (data) {
      setFormData({
        user_id: user?.id,
        name: data.name || "",
        email: data.email || "",
        password: "",
        confirm_password: "",
        role: Number(data.role) ? 1 : 0,
        phone: data.phone || "",
        dob: data.dob ? formatDateToISO(data.dob) : "",
        address: data.address || "",
        profile: null,
      });
      setPreviewImage(
        `${import.meta.env.VITE_API_URL}/images/${data?.profile_path}` || null,
      );
    }
  }, [data]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrorMessage((prev) => ({ ...prev, [name]: null }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, profile: file }));
      const reader = new FileReader();
      reader.onload = (e) => setPreviewImage(e.target.result);
      reader.readAsDataURL(file);
      setErrorMessage((prev) => ({ ...prev, profile: null }));
    }
  };

  const handleReset = () => {
    if (data) {
      setFormData({
        name: data.name || "",
        email: data.email || "",
        password: "",
        confirm_password: "",
        role: data.role ? 1 : 0 == 0 ? 0 : "",
        phone: data.phone || "",
        dob: data.dob || "",
        address: data.address || "",
        profile: null,
      });
      setPreviewImage(data.profile || null);
      setErrorMessage({});
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== "") {
        form.append(key, value);
      }
      form.append("confirm_password", formData.confirm_password ?? "");
    });

    mutation.mutate(form, {
      onSuccess: (res) => {
        if (res.user) {
          setUser(res.user);
        }
        alert(res?.message || "User updated successfully");
      },
      onError: (err) => {
        const backendErrors = err?.response?.data?.errors || {};
        setErrorMessage(backendErrors);
      },
    });
  };

  if (isLoading) return <Loading />;
  if (isError)
    return (
      <p className="text-red-500">Failed to load user: {error?.message}</p>
    );

  return (
    <Layout>
      <main className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-3xl mx-auto">
          <UserEditForm
            formName="Update Profile"
            formData={formData}
            handleInputChange={handleInputChange}
            handleFileChange={handleFileChange}
            handleSubmit={handleSubmit}
            handleReset={handleReset}
            previewImage={previewImage}
            errorMessage={errorMessage}
          />
        </div>
      </main>
    </Layout>
  );
};

export default ProfileEdit;
