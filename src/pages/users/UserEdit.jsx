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

import { userRolesOptions } from "../../constants/commons";
import { getUser, updateUser } from "../../hooks/useUser";
import { dateFormat, formatDateToISO } from "../../utils/date";
import useAuthStore from "../../store/useAuthStore";

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
    role: 1,
    phone: "",
    dob: "",
    address: "",
    profile: null,
  });

  const [previewImage, setPreviewImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState({});

  // When API data is loaded, populate formData
  useEffect(() => {
    if (data) {
      setFormData({
        user_id: user?.id,
        name: data.name || "",
        email: data.email || "",
        password: "",
        confirm_password: "",
        role: Number(data.role) || 1,
        phone: data.phone || "",
        dob: data.dob ? formatDateToISO(data.dob) : "",
        address: data.address || "",
        profile: null,
      });
      setPreviewImage(
        `${import.meta.env.VITE_API_URL}/images/${data?.profile_path}` || null
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
        role: data.role || 1,
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
    <Layout activeRoute="user-list">
      <main className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          <form
            onSubmit={handleSubmit}
            className="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20"
          >
            <div className="mb-6">
              <h2 className="text-xl font-bold text-white flex items-center">
                <UserPlus size={20} className="mr-2" />
                Edit User
              </h2>
              <p className="text-purple-200 text-sm mt-1">Edit user account</p>
            </div>

            {/* Profile */}
            <div className="flex flex-col justify-center items-center mb-8">
              <div className="relative">
                <input
                  type="file"
                  name="profile"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                  id="profile-upload"
                />
                <label
                  htmlFor="profile-upload"
                  className="cursor-pointer w-32 h-32 rounded-full overflow-hidden border-3 border-white/30 flex items-center justify-center bg-white/10 hover:bg-white/20 transition-colors"
                >
                  {previewImage ? (
                    <img
                      src={previewImage}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Image size={32} className="text-purple-300" />
                  )}
                </label>
              </div>
              <ErrorMessage message={errorMessage?.profile} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left Column */}
              <div className="space-y-6">
                {["name", "email", "password", "confirm_password"].map(
                  (field) => (
                    <div key={field}>
                      <label className="block text-white text-sm font-medium mb-2 flex items-center">
                        {field === "name" && (
                          <User size={16} className="mr-2" />
                        )}
                        {field === "email" && (
                          <Mail size={16} className="mr-2" />
                        )}
                        {field.includes("password") && (
                          <Lock size={16} className="mr-2" />
                        )}
                        {field.replace("_", " ").toUpperCase()}
                      </label>
                      <input
                        type={field.includes("password") ? "password" : "text"}
                        name={field}
                        value={formData[field]}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300"
                        placeholder={`Enter ${field.replace("_", " ")}`}
                      />
                      <ErrorMessage message={errorMessage?.[field]} />
                    </div>
                  )
                )}
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {["role", "phone", "dob", "address"].map((field) => (
                  <div key={field}>
                    <label className="block text-white text-sm font-medium mb-2 flex items-center">
                      {field === "role" && (
                        <Settings size={16} className="mr-2" />
                      )}
                      {field === "phone" && (
                        <Phone size={16} className="mr-2" />
                      )}
                      {field === "dob" && (
                        <Calendar size={16} className="mr-2" />
                      )}
                      {field === "address" && (
                        <MapPin size={16} className="mr-2" />
                      )}
                      {field.replace("_", " ").toUpperCase()}
                    </label>

                    {field === "role" ? (
                      <FormSelect
                        name="role"
                        value={formData.role}
                        onChange={handleInputChange}
                        options={userRolesOptions}
                        className="!py-3"
                      />
                    ) : field === "dob" ? (
                      <DatePicker
                        name="dob"
                        value={formData.dob}
                        onChange={handleInputChange}
                        placeholder="Select date of birth"
                      />
                    ) : field === "address" ? (
                      <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        rows={3}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300 resize-none"
                        placeholder="Enter full address"
                      />
                    ) : (
                      <input
                        type="text"
                        name={field}
                        value={formData[field]}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300"
                        placeholder={`Enter ${field}`}
                      />
                    )}
                    <ErrorMessage message={errorMessage?.[field]} />
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end space-x-4 mt-8 pt-6 border-t border-white/20">
              <button
                type="button"
                onClick={handleReset}
                className="px-6 py-2.5 cursor-pointer text-white bg-white/10 hover:bg-white/20 rounded-lg transition-colors duration-200 flex items-center space-x-2"
              >
                <RefreshCw size={16} />
                <span>Reset</span>
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 bg-gradient-to-r cursor-pointer from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/25"
              >
                Update User
              </button>
            </div>
          </form>
        </div>
      </main>
    </Layout>
  );
};

export default UserEdit;
