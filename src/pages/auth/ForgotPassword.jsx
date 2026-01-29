import React, { useState } from "react";
import { Mail, ArrowLeft, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import Logo from "../../components/Logo";
import { Link } from "react-router-dom";
import { forgotPassword } from "../../hooks/useAuth";
import ErrorMessage from "../../components/ErrorMessage";

export default function App() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const mutation = forgotPassword();

  const handleSubmit = (e) => {
    setSubmitted(false);
    setErrorMessage(null);
    e.preventDefault();
    const payload = { ...(email && { email }) };
    mutation.mutate(payload, {
      onSuccess: (data) => {
        setSuccessMessage(data?.msg);
        setSubmitted(true);
      },
      onError: (error) => {
        setErrorMessage(error.response.data.errors || "Forgot Password Fail.");
      },
    });
  };

  const goBack = () => {
    setSubmitted(false);
    setEmail("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 flex items-center justify-center p-4">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
      </div>

      {/* Main content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          onClick={goBack}
          className="flex items-center space-x-2 text-purple-200 hover:text-white mb-8 transition-colors duration-200"
        >
          <ArrowLeft size={20} />
          <Link to="/">Back to login</Link>
        </motion.button>

        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <Logo />

          {submitted && (
            <>
              <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
              <p className="text-green-200 font-bold">{successMessage}</p>
            </>
          )}
        </div>

        {/* Reset Password Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Field */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="relative"
          >
            <div className="relative">
              <Mail className="absolute z-10 left-4 top-1/2 transform -translate-y-1/2 text-purple-300 w-5 h-5" />
              <input
                type="text"
                value={email}
                onChange={(e) => {
                  setSubmitted(false);
                  setEmail(e.target.value);
                }}
                disabled={mutation?.isPending}
                placeholder="Enter your email"
                className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl text-white placeholder-purple-200 focus:outline-none focus:ring-2 disabled:cursor-not-allowed focus:ring-purple-400 focus:border-transparent transition-all duration-300"
              />
            </div>
            <ErrorMessage message={errorMessage?.email || errorMessage} />
          </motion.div>

          {/* Reset Password Button */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            type="submit"
            disabled={mutation?.isPending}
            className="w-full bg-gradient-to-r cursor-pointer from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 disabled:hover:scale-100 disabled:bg-white/10 shadow-lg hover:shadow-purple-500/25 disabled:cursor-not-allowed"
          >
            Send Reset Link
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
