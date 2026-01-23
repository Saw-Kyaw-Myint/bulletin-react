import React, { useState, useEffect } from "react";
import { FileText, Notebook, RefreshCw, Save, Settings } from "lucide-react";
import ErrorMessage from "../ErrorMessage";

const PostForm = ({
  mode = "create", // "create" | "edit"
  initialValues,
  onSubmit,
  loading = false,
  submitText = "Save",
}) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "",
  });
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    if (initialValues) {
      setFormData(initialValues);
    }
  }, [initialValues]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrorMessage(null);
  };

  const handleReset = () => {
    setFormData(
      initialValues || {
        title: "",
        description: "",
        status: true,
      },
    );
    setErrorMessage(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData, setErrorMessage);
  };

  const handleStatusToggle = () => {
    setFormData((prev) => ({
      ...prev,
      status: !prev.status,
    }));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20"
    >
      <div className="space-y-8">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-white capitalize flex items-center">
            <Notebook size={20} className="mr-2" />
            {mode} Post
          </h2>
          <p className="text-purple-200 text-sm mt-1 capitalize">{mode} Post</p>
        </div>
        {/* Title */}
        <div>
          <label className="block text-white text-sm font-medium mb-2">
            <FileText size={16} className="inline mr-2" />
            Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white"
          />
          <ErrorMessage message={errorMessage?.title} />
        </div>

        {/* Description */}
        <div>
          <label className="block text-white text-sm font-medium mb-2">
            <FileText size={16} className="inline mr-2" />
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows="6"
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white resize-none"
          />
          <ErrorMessage message={errorMessage?.description} />
        </div>
        {mode === "edit" && (
          <div className="">
            <label className="block text-white text-sm font-medium mb-2 flex items-center">
              <Settings size={16} className="mr-2" />
              Status
            </label>

            <div className="flex items-center space-x-3">
              <button
                type="button"
                onClick={handleStatusToggle}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
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
        )}
      </div>

      {/* Buttons */}
      <div className="flex justify-end space-x-4 mt-8 pt-6 border-t border-white/20">
        <button
          type="button"
          onClick={handleReset}
          className="px-6 py-2.5 cursor-pointer text-white bg-white/10 rounded-lg flex items-center space-x-2"
        >
          <RefreshCw size={16} />
          <span>Reset</span>
        </button>

        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2.5 cursor-pointer bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg flex items-center space-x-2"
        >
          <Save size={16} />
          <span>{submitText}</span>
        </button>
      </div>
    </form>
  );
};

export default PostForm;
