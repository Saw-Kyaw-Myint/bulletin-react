import React, { useState, useEffect } from "react";
import { Lock, RefreshCw, Save, Eye, EyeOff } from "lucide-react";
import Loading from "../../components/Loading";
import Layout from "../../components/Layout";
import { resetPassword } from "../../hooks/useAuth";
import { useNavigate, useSearchParams } from "react-router-dom";
import ErrorMessage from "../../components/ErrorMessage";
import { AUTH } from "../../constants/routes";

const ChangePassword = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    password: "",
    confirm_password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const mutation = resetPassword();
  const [searchParams] = useSearchParams();
  const [errorMessage, setErrorMessage] = useState(null);
  const token = searchParams.get("token");
  const navigate = useNavigate();

  // Simulate loading state
  useEffect(() => {
    if (!token) {
      navigate(AUTH.FORGOT_PASSWORD);
    }
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setErrorMessage(null);
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleReset = () => {
    setFormData({
      password: "",
      confirm_password: "",
    });
    setShowPassword(false);
    setErrorMessage(null);
    setShowConfirmPassword(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    const payload = {
      ...(formData.password && { password: formData.password }),
      ...(formData.confirm_password && {
        confirm_password: formData.confirm_password,
      }),
      ...(token && { token }),
    };
    mutation.mutate(payload, {
      onSuccess: (data) => {
        alert(data?.msg);
        navigate("/");
        handleReset();
      },
      onError: (error) => {
        setErrorMessage(error.response.data.errors || "Forgot Password Fail.");
      },
    });
  };

  return (
    <Layout activeRoute="user-list">
      <main className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-2xl mx-auto">
          {isLoading ? (
            <Loading />
          ) : (
            <form
              onSubmit={handleSubmit}
              className="bg-white/10 backdrop-blur-lg mt-10 rounded-xl p-8 border border-white/20"
            >
              {/* Card Title */}
              <div className="mb-6">
                <h2 className="text-xl font-bold text-white flex items-center">
                  <Lock size={20} className="mr-2" />
                  Change Password
                </h2>
                <p className="text-purple-200 text-sm mt-1">
                  Update your account password
                </p>
              </div>

              <div className="space-y-6">
                <ErrorMessage message={errorMessage?.token} />
                {/* Current Password */}
                <div>
                  <label className="block text-white text-sm font-medium mb-2 flex items-center">
                    <Lock size={16} className="mr-2" />
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="w-full pl-4 pr-12 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300"
                      placeholder="Enter new password"
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
                      placeholder="Confirm new password"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-purple-300 hover:text-white transition-colors"
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={20} />
                      ) : (
                        <Eye size={20} />
                      )}
                    </button>
                  </div>
                  <ErrorMessage message={errorMessage?.confirm_password} />
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-4 pt-4 border-t border-white/20">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="px-6 py-3 text-white cursor-pointer bg-white/10 hover:bg-white/20 rounded-lg transition-colors duration-200 flex items-center space-x-2"
                  >
                    <RefreshCw size={16} />
                    <span>Reset</span>
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-gradient-to-r cursor-pointer from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/25 flex items-center space-x-2"
                  >
                    <Save size={16} />
                    <span>Save</span>
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </main>
    </Layout>
  );
};

export default ChangePassword;
