import React, { useState, useEffect } from "react";
import { Lock, RefreshCw, Save, Eye, EyeOff } from "lucide-react";
import Loading from "../../components/Loading";
import Layout from "../../components/Layout";

const ChangePassword = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    password: "",
    password_confirm: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800); // Simulate 1 second of loading

    return () => clearTimeout(timer);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleReset = () => {
    setFormData({
      password: "",
      password_confirm: "",
    });
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Password changed:", formData);
    // Handle form submission logic here
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
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-purple-300 hover:text-white transition-colors"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
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
                      name="password_confirm"
                      value={formData.password_confirm}
                      onChange={handleInputChange}
                      className="w-full pl-4 pr-12 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300"
                      placeholder="Confirm new password"
                      required
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
