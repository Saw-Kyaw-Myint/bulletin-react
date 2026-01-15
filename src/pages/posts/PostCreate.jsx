import React, { useState } from "react";
import { FileText, Settings, RefreshCw, Save } from "lucide-react";
import { motion } from "framer-motion";
import Layout from "../../components/Layout";

const PostCreate = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: true, // true = active, false = inactive
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleStatusToggle = () => {
    setFormData((prev) => ({ ...prev, status: !prev.status }));
  };

  const handleReset = () => {
    setFormData({
      title: "",
      description: "",
      status: true,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Post created:", formData);
    // Handle form submission logic here
  };

  return (
    <Layout activeRoute="post-create">
      <main className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          <form
            onSubmit={handleSubmit}
            className="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20"
          >
            <div className="space-y-8">
              {/* Title */}
              <div>
                <label className="block text-white text-sm font-medium mb-2 flex items-center">
                  <FileText size={16} className="mr-2" />
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300"
                  placeholder="Enter post title"
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-white text-sm font-medium mb-2 flex items-center">
                  <FileText size={16} className="mr-2" />
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="6"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300 resize-none"
                  placeholder="Enter post description"
                  required
                />
              </div>

              {/* Status Toggle */}
              <div>
                <label className="block text-white text-sm font-medium mb-2 flex items-center">
                  <Settings size={16} className="mr-2" />
                  Status
                </label>
                <div className="flex items-center space-x-3">
                  <button
                    type="button"
                    onClick={handleStatusToggle}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                      formData.status ? "bg-green-500" : "bg-red-500"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        formData.status ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                  <span className="text-white">
                    {formData.status ? "Active" : "Inactive"}
                  </span>
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
                className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/25 flex items-center space-x-2"
              >
                <Save size={16} />
                <span>Save</span>
              </button>
            </div>
          </form>
        </div>
      </main>
    </Layout>
  );
};

export default PostCreate;
