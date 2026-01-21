import React, { useEffect, useState } from "react";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Logo from "../../components/Logo";
import { Link, Router } from "react-router-dom";
import ErrorMessage from "../../components/ErrorMessage";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../store/useAuthStore";
import { useLogin } from "../../hooks/useAuth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const mutation = useLogin();
  const navigate = useNavigate();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      return navigate("/posts");
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...(email && { email }),
      ...(password && { password }),
      ...(remember && { remember }),
    };
    mutation.mutate(payload, {
      onSuccess: (data) => {
        navigate("/posts");
      },
      onError: (error) => {
        setErrorMessage(error.response.data.errors || "Login failed");
      },
    });
  };

  return (
    <div className="min-h-screen background-purple flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Logo/Brand */}
        <Logo className="mb-8" />

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Field */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="relative"
          >
            <div className="relative">
              <Mail className="absolute z-10 left-4 top-1/2 transform -translate-y-1/2 icon-purple w-5 h-5" />
              <input
                type="text"
                value={email}
                onChange={(e) => {
                  setErrorMessage(null);
                  setEmail(e.target.value);
                }}
                placeholder="Enter your email"
                className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300"
              />
            </div>
            <ErrorMessage message={errorMessage?.email} />
          </motion.div>

          {/* Password Field */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="relative"
          >
            <div className="relative">
              <Lock className="absolute z-10 left-4 top-1/2 transform -translate-y-1/2 icon-purple w-5 h-5" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => {
                  setErrorMessage(null);
                  setPassword(e.target.value);
                }}
                placeholder="Enter your password"
                className="w-full pl-12 pr-12 py-4 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 icon-purple hover:text-cyan-600 cursor-pointer transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <ErrorMessage message={errorMessage?.password} />
          </motion.div>

          {/* Remember Me and Forgot Password */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="flex items-center justify-between"
          >
            <label className="flex items-center space-x-3 cursor-pointer">
              <div className="relative">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="sr-only"
                />
                <div
                  className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-200 ${
                    remember
                      ? "bg-purple-500 border-purple-500"
                      : "border-white/30 hover:border-white/50"
                  }`}
                >
                  {remember && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-3 h-3 bg-white rounded-sm"
                    />
                  )}
                </div>
              </div>
              <span className="text-white text-sm font-medium">
                Remember me
              </span>
            </label>

            <Link
              to="/forgot-password"
              type="button"
              className="text-purple-200 hover:text-white text-sm font-medium transition-colors duration-200"
            >
              Forgot password?
            </Link>
          </motion.div>

          {/* Sign In Button */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            type="submit"
            className="button-purple w-full py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg "
          >
            <div className="flex items-center justify-center space-x-2">
              <span>Sign In</span>
              <ArrowRight size={20} />
            </div>
          </motion.button>
        </form>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-center mt-8"
        >
          <p className="text-purple-200 text-sm">
            Don't have an account?{" "}
            <button className="text-white font-medium cursor-pointer hover:icon-purple transition-colors">
              Sign up
            </button>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
