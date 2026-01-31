import Layout from "../../components/Layout";
import React, { useEffect, useState } from "react";
import {
  User,
  Mail,
  Lock,
  Phone,
  Calendar,
  MapPin,
  Image,
  RefreshCw,
  Settings,
  UserPlus,
} from "lucide-react";
import { useParams } from "react-router-dom";

import DatePicker from "../../components/DatePicker";
import Loading from "../../components/Loading";
import FormSelect from "../../components/Form/FormSelect";
import ErrorMessage from "../../components/ErrorMessage";

import { RoleText } from "../../constants/commons";
import { getUser, updateUser } from "../../hooks/useUser";
import { formatDateToISO } from "../../utils/date";
import useAuthStore from "../../store/useAuthStore";
import UserEditForm from "../../components/Form/UserEditForm";
import { confirmApi } from "../../lib/common";
import { useQueryClient } from "@tanstack/react-query";
import { userUpdateApi } from "../../api/user";

const UserEdit = () => {
  const { id } = useParams();
  const { user } = useAuthStore();
  const { data, isLoading, isError, error } = getUser(id);
  const mutation = updateUser(id);

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
  const queryClient = useQueryClient();

  // When API data is loaded, populate formData
  useEffect(() => {
    if (data) {
      setFormData({
        user_id: user?.id,
        name: data?.name || "",
        email: data?.email || "",
        password: "",
        confirm_password: "",
        role: data?.role ? RoleText.User : RoleText.Admin,
        phone: data?.phone || "",
        dob: data?.dob ? formatDateToISO(data.dob) : "",
        address: data?.address || "",
        profile: null,
      });
      if (data.profile_path) {
        setPreviewImage(
          `${import.meta.env.VITE_API_URL}/images/${data?.profile_path}` ||
            null,
        );
      }
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
        role: data.role
          ? RoleText.User
          : RoleText.Admin == 0
            ? RoleText.Admin
            : "",
        phone: data.phone || "",
        dob: data.dob || "",
        address: data.address || "",
        profile: null,
      });
      if (!!data.profile_path) {
        setPreviewImage(
          `${import.meta.env.VITE_API_URL}/images/${data?.profile_path}`,
        );
      } else {
        setPreviewImage(null);
      }
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

    if (formData.profile) {
      form.append("profile", formData.profile);
    } else if (!previewImage) {
      form.append("profile", "");
    }

    mutation.mutate(form, {
      onSuccess: async (res) => {
        if (res?.is_valid_request) {
          form.append("is_valid_request", true);
          await confirmApi({
            apiFn: userUpdateApi,
            update_id: id,
            payload: form,
            queryClient,
            invalidateKeys: [["users"]],
          });
        }
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
    <Layout activeRoute="user-list">
      <main className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          <UserEditForm
            formData={formData}
            handleInputChange={handleInputChange}
            handleFileChange={handleFileChange}
            handleSubmit={handleSubmit}
            handleReset={handleReset}
            resetPreviewImage={(e) => {
              e.stopPropagation();
              setPreviewImage(null);
              setFormData({ ...formData, profile: null });
            }}
            previewImage={previewImage}
            errorMessage={errorMessage}
          />
        </div>
      </main>
    </Layout>
  );
};

export default UserEdit;
