import React, { useState } from "react";
import {
  FileText,
  Search,
  RefreshCw,
  Edit,
  Plus,
  Upload,
  Download,
  Trash2,
  AlertTriangle,
} from "lucide-react";
import { motion } from "framer-motion";
import Layout from "../../components/Layout";
import DatePicker from "../../components/DatePicker";
import useAuthStore from "../../store/useAuthStore";
import { useNavigate } from "react-router-dom";

export default function PostList({ user }) {
  const [searchForm, setSearchForm] = useState({
    postName: "",
    postDescription: "",
    postStatus: "",
    postDate: "",
  });
  const [selectAll, setSelectAll] = useState(false);
  const [selectedRows, setSelectedRows] = useState(new Set());
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const navigate = useNavigate();

  // Mock post data
  const mockPosts = [
    {
      id: 1,
      title: "Welcome to Our Platform",
      description: "Introduction to our new bulletin board system",
      status: "active",
      date: "01/12/2025",
    },
    {
      id: 2,
      title: "System Maintenance Notice",
      description: "Scheduled maintenance this weekend",
      status: "active",
      date: "01/10/2025",
    },
    {
      id: 3,
      title: "New Feature Announcement",
      description: "Exciting new features coming soon",
      status: "inactive",
      date: "01/08/2025",
    },
    {
      id: 4,
      title: "Community Guidelines Update",
      description: "Updated community guidelines and policies",
      status: "active",
      date: "01/05/2025",
    },
    {
      id: 5,
      title: "Holiday Schedule",
      description: "Office closure during holiday season",
      status: "inactive",
      date: "12/20/2024",
    },
  ];

  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearchForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearchReset = () => {
    setSearchForm({
      postName: "",
      postDescription: "",
      postStatus: "",
      postDate: "",
    });
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log("Search submitted:", searchForm);
  };

  const handleSelectAll = (event) => {
    event.stopPropagation();
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);
    const newSelectedRows = new Set();
    if (newSelectAll) {
      mockPosts.forEach((post) => newSelectedRows.add(post.id));
    }
    setSelectedRows(newSelectedRows);
  };

  const handleRowSelect = (postId) => {
    const newSelectedRows = new Set(selectedRows);
    if (newSelectedRows.has(postId)) {
      newSelectedRows.delete(postId);
    } else {
      newSelectedRows.add(postId);
    }
    setSelectedRows(newSelectedRows);
    setSelectAll(newSelectedRows.size === mockPosts.length);
  };

  const handleCreate = () => {
    console.log("Create new post");
  };

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check if file is not Excel format
      if (
        file.type !== "application/vnd.ms-excel" &&
        file.type !==
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      ) {
        console.log("Uploaded file:", file.name);
        // Process the file here
      } else {
        alert(
          "Excel files are not allowed. Please upload a different file format."
        );
      }
    }
  };

  const handleDownload = () => {
    console.log("Download posts");
  };

  const handleDelete = () => {
    console.log("v", selectedRows.size);
    if (selectedRows.size > 0) {
      setShowConfirmDelete(true);
    }
  };

  const confirmDelete = () => {
    console.log("Deleting selected posts:", Array.from(selectedRows));
    setSelectedRows(new Set());
    setSelectAll(false);
    setShowConfirmDelete(true);
  };

  const cancelDelete = () => {
    setShowConfirmDelete(false);
  };

  return (
    <Layout activeRoute="post-list">
      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          {/* Search Form */}
          <form
            onSubmit={handleSearchSubmit}
            className="relative z-10  bg-white/10 backdrop-blur-lg rounded-xl p-6 mb-6 border border-white/20"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
              {/* Post Name */}
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Post Name {user}
                </label>
                <input
                  type="text"
                  name="postName"
                  value={searchForm.postName}
                  onChange={handleSearchChange}
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300"
                  placeholder="Enter post name"
                />
              </div>

              {/* Post Description */}
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Description
                </label>
                <input
                  type="text"
                  name="postDescription"
                  value={searchForm.postDescription}
                  onChange={handleSearchChange}
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300"
                  placeholder="Enter description"
                />
              </div>

              {/* Post Status */}
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Status
                </label>
                <select
                  name="postStatus"
                  value={searchForm.postStatus}
                  onChange={handleSearchChange}
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300 appearance-none"
                >
                  <option value="" className="bg-gray-800">
                    All Status
                  </option>
                  <option value="active" className="bg-gray-800">
                    Active
                  </option>
                  <option value="inactive" className="bg-gray-800">
                    Inactive
                  </option>
                </select>
              </div>

              {/* Post Date */}
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Post Date
                </label>
                <DatePicker
                  name="postDate"
                  value={searchForm.postDate}
                  onChange={handleSearchChange}
                  placeholder="Select date"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex  items-end mb-1 space-x-2">
                <button
                  type="button"
                  onClick={handleSearchReset}
                  className="px-4 py-2.5 cursor-pointer bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors duration-200 flex items-center justify-center w-full"
                >
                  <RefreshCw size={16} />
                </button>
                <button
                  type="submit"
                  className="px-4 py-2.5 cursor-pointer bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-lg transition-all duration-300 w-full flex items-center justify-center"
                >
                  <Search size={16} />
                </button>
              </div>
            </div>
          </form>

          {/* Table Actions */}
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <div className="flex space-x-2">
                <button
                  onClick={handleCreate}
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors duration-200 flex items-center space-x-2"
                >
                  <Plus size={16} />
                  <span>Create</span>
                </button>

                {/* File Upload Button */}
                <label className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors duration-200 flex items-center space-x-2 cursor-pointer">
                  <Upload size={16} />
                  <span>Upload</span>
                  <input
                    type="file"
                    accept=".jpg,.jpeg,.png,.gif,.pdf,.doc,.docx,.txt,.zip,.rar"
                    onChange={handleUpload}
                    className="hidden"
                  />
                </label>

                {/* Download Button - Disabled if no rows selected */}
                <button
                  onClick={handleDownload}
                  disabled={selectedRows.size === 0}
                  className={`px-4 py-2 ${
                    selectedRows.size === 0
                      ? "bg-green-600/50 cursor-not-allowed"
                      : "bg-green-600 hover:bg-green-700"
                  } text-white rounded-lg transition-colors duration-200 flex items-center space-x-2`}
                >
                  <Download size={16} />
                  <span>Download</span>
                </button>

                {/* Delete Button - Disabled if no rows selected */}
                <button
                  onClick={handleDelete}
                  disabled={selectedRows.size === 0}
                  className={`px-4 py-2 ${
                    selectedRows.size === 0
                      ? "bg-red-600/50 cursor-not-allowed"
                      : "bg-red-600 hover:bg-red-700 cursor-pointer "
                  } text-white  rounded-lg transition-colors duration-200 flex items-center space-x-2`}
                >
                  <Trash2 size={16} />
                  <span>Delete</span>
                </button>
              </div>

              <div className="flex items-center space-x-4">
                <span className="text-white">1-10/37 items</span>
                <div className="flex space-x-1">
                  <button className="p-2 bg-blue-500/30 cursor-pointer text-white rounded-lg hover:bg-blue-500/50 transition-colors">
                    &lt;
                  </button>
                  <button className="p-2 bg-blue-500/30 cursor-pointer text-white rounded-lg hover:bg-blue-500/50 transition-colors">
                    &gt;
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Posts Table */}
          <div className="relative !z-0">
            <div className="bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-white/0.5 backdrop-blur-lg">
                    <tr className="border-b border-white/20">
                      <th className="px-6 py-4 text-left">
                        <input
                          type="checkbox"
                          checked={selectAll}
                          onChange={handleSelectAll}
                          className="w-4 h-4 text-purple-600 bg-white/10 border-white/30 rounded focus:ring-purple-500 focus:ring-2"
                        />
                      </th>
                      <th className="px-6 py-4 text-left text-white font-semibold">
                        ID
                      </th>
                      <th className="px-6 py-4 text-left text-white font-semibold">
                        Post Title
                      </th>
                      <th className="px-6 py-4 text-left text-white font-semibold">
                        Description
                      </th>
                      <th className="px-6 py-4 text-left text-white font-semibold">
                        Status
                      </th>
                      <th className="px-6 py-4 text-left text-white font-semibold">
                        Post Date
                      </th>
                      <th className="px-6 py-4 text-left text-white font-semibold">
                        Edit
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockPosts.map((post) => (
                      <motion.tr
                        key={post.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        onClick={() => navigate(`/post/${post.id}`)}
                        className="border-b cursor-pointer border-white/10 hover:bg-white/5 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <input
                            type="checkbox"
                            checked={selectedRows.has(post.id)}
                            onClick={(e) => e.stopPropagation()}
                            onChange={(e) => {
                              handleRowSelect(post.id);
                            }}
                            className="w-4 h-4 text-purple-600 cursor-pointer bg-white/10 border-white/30 rounded focus:ring-purple-500 focus:ring-2"
                          />
                        </td>
                        <td className="px-6 py-4 text-white">{post.id}</td>
                        <td className="px-6 py-4 text-white font-medium">
                          {post.title}
                        </td>
                        <td className="px-6 py-4 text-purple-200">
                          {post.description}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              post.status === "active"
                                ? "bg-green-500/30 text-green-300"
                                : "bg-red-500/30 text-red-300"
                            }`}
                          >
                            {post.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-white">{post.date}</td>
                        <td className="px-6 py-4">
                          <button className="p-2 cursor-pointer text-purple-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                            <Edit size={16} />
                          </button>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Empty state or pagination could go here */}
              {mockPosts.length === 0 && (
                <div className="text-center py-12">
                  <FileText className="w-12 h-12 text-purple-300 mx-auto mb-4" />
                  <p className="text-white text-lg">No posts found</p>
                  <p className="text-purple-200">
                    Try adjusting your search criteria
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Confirm Delete Modal */}
      {showConfirmDelete && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 max-w-md w-full mx-4">
            <div className="flex items-start space-x-4">
              <AlertTriangle className="w-6 h-6 text-yellow-400 mt-1 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-2">
                  Confirm Deletion
                </h3>
                <p className="text-purple-200 mb-4">
                  Are you sure you want to delete {selectedRows.size} selected
                  post{selectedRows.size !== 1 ? "s" : ""}? This action cannot
                  be undone.
                </p>
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={cancelDelete}
                    className="px-4 py-2 text-white cursor-pointer bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmDelete}
                    className="px-4 py-2 bg-red-600 cursor-pointer hover:bg-red-700 text-white rounded-lg transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
