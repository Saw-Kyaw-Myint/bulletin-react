import React, { useState, useEffect } from "react";
import { User, Mail, Lock, Phone, Save, Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";
import Logo from "../../components/Logo";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "../../components/ErrorMessage";
import { register } from "../../hooks/useAuth";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
  const mutation = register();

  // Simulate loading stat

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...(formData.name && { name: formData.name }),
      ...(formData.email && { email: formData.email }),
      ...(formData.password && { password: formData.password }),
      ...(formData.confirm_password && {
        confirm_password: formData.confirm_password,
      }),
    };
    mutation.mutate(payload, {
      onSuccess: (res) => {
        alert(res.msg);
        navigate("/");
      },
      onError: (error) => {
        setErrorMessage(error.response.data.errors || "Login failed");
      },
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 flex items-center justify-center p-4">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Logo/Brand */}
        <Logo />
        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
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
              placeholder="Enter your full name"
            />
            <ErrorMessage message={errorMessage?.name} />
          </div>

          {/* Email */}
          <div>
            <label className="block text-white text-sm font-medium mb-2 flex items-center">
              <Mail size={16} className="mr-2" />
              Email
            </label>
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300"
              placeholder="Enter your email address"
            />
            <ErrorMessage message={errorMessage?.email} />
          </div>

          {/* Phone */}
          {/* <div>
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
              placeholder="Enter your phone number"
              required
            />
          </div> */}

          {/* Password */}
          <div>
            <label className="block text-white text-sm font-medium mb-2 flex items-center">
              <Lock size={16} className="mr-2" />
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full pl-4 pr-12 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300"
                placeholder="Create a password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-purple-300 hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <ErrorMessage message={errorMessage?.password} />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-white text-sm font-medium mb-2 flex items-center">
              <Lock size={16} className="mr-2" />
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirm_password"
                value={formData.confirm_password}
                onChange={handleInputChange}
                className="w-full pl-4 pr-12 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300"
                placeholder="Confirm your password"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-purple-300 hover:text-white transition-colors"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <ErrorMessage message={errorMessage?.confirm_password} />
          </div>

          {/* Register Button */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            type="submit"
            className="w-full bg-gradient-to-r cursor-pointer from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/25"
          >
            <div className="flex items-center justify-center space-x-2">
              <span>Register</span>
              <Save size={20} />
            </div>
          </motion.button>
        </form>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-8"
        >
          <p className="text-purple-200 text-sm">
            Already have an account?{" "}
            <button
              onClick={() => navigate("/")}
              className="text-white cursor-pointer font-medium hover:text-purple-300 transition-colors"
            >
              Sign in
            </button>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
