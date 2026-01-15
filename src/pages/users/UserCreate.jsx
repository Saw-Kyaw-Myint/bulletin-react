import Layout from "../../components/Layout";
import React, { useState } from "react";
import {
  User,
  Mail,
  Lock,
  Phone,
  Calendar,
  MapPin,
  Image,
  ArrowLeft,
  Settings,
  RefreshCw,
} from "lucide-react";
import { motion } from "framer-motion";

import DatePicker from "../../components/DatePicker";

const UserCreate = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirm: "",
    role: "user",
    phone: "",
    dob: "",
    address: "",
    profile: null,
  });
  const [previewImage, setPreviewImage] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, profile: file }));
      const reader = new FileReader();
      reader.onload = (e) => setPreviewImage(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleReset = () => {
    setFormData({
      name: "",
      email: "",
      password: "",
      password_confirm: "",
      role: "user",
      phone: "",
      dob: "",
      address: "",
      profile: null,
    });
    setPreviewImage(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Handle form submission logic here
  };

  const roles = [
    { value: "admin", label: "Administrator" },
    { value: "moderator", label: "Moderator" },
    { value: "user", label: "User" },
    { value: "guest", label: "Guest" },
  ];

  return (
    <Layout activeRoute={"user-create"}>
      <main className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          <form
            onSubmit={handleSubmit}
            className="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20"
          >
            {/* Profile Picture - Top and Centered */}
            <div className="flex justify-center mb-8">
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
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left Column - Basic Info */}
              <div className="space-y-6">
                {/* Name */}
                <div>
                  <label className="block text-white text-sm font-medium mb-2 flex items-center">
                    <User size={16} className="mr-2" />
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300"
                    placeholder="Enter full name"
                    required
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-white text-sm font-medium mb-2 flex items-center">
                    <Mail size={16} className="mr-2" />
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300"
                    placeholder="Enter email address"
                    required
                  />
                </div>

                {/* Password */}
                <div>
                  <label className="block text-white text-sm font-medium mb-2 flex items-center">
                    <Lock size={16} className="mr-2" />
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300"
                    placeholder="Enter password"
                    required
                  />
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-white text-sm font-medium mb-2 flex items-center">
                    <Lock size={16} className="mr-2" />
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    name="password_confirm"
                    value={formData.password_confirm}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300"
                    placeholder="Confirm password"
                    required
                  />
                </div>
              </div>

              {/* Right Column - Additional Info */}
              <div className="space-y-6">
                {/* Role */}
                <div>
                  <label className="block text-white text-sm font-medium mb-2 flex items-center">
                    <Settings size={16} className="mr-2" />
                    Role
                  </label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300 appearance-none"
                  >
                    {roles.map((role) => (
                      <option
                        key={role.value}
                        value={role.value}
                        className="bg-gray-800"
                      >
                        {role.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-white text-sm font-medium mb-2 flex items-center">
                    <Phone size={16} className="mr-2" />
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300"
                    placeholder="Enter phone number"
                  />
                </div>

                {/* Date of Birth */}
                <div>
                  <label className="block text-white text-sm font-medium mb-2 flex items-center">
                    <Calendar size={16} className="mr-2" />
                    Date of Birth
                  </label>
                  <DatePicker
                    name="dob"
                    value={formData.dob}
                    onChange={handleInputChange}
                    placeholder="Select date of birth"
                  />
                </div>

                {/* Address */}
                <div>
                  <label className="block text-white text-sm font-medium mb-2 flex items-center">
                    <MapPin size={16} className="mr-2" />
                    Address
                  </label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300 resize-none"
                    placeholder="Enter full address"
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-4 mt-8 pt-6 border-t border-white/20">
              <button
                type="button"
                onClick={handleReset}
                className="px-6 py-3 text-white bg-white/10 hover:bg-white/20 rounded-lg transition-colors duration-200 flex items-center space-x-2"
              >
                <RefreshCw size={16} />
                <span>Reset</span>
              </button>
              <button
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/25"
              >
                Create User
              </button>
            </div>
          </form>
        </div>
      </main>
    </Layout>
  );
};

export default UserCreate;
