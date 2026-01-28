import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { FileText, Edit, Plus, Upload, Download, Trash2 } from "lucide-react";
import Layout from "../../components/Layout";
import DatePicker from "../../components/DatePicker";
import { useNavigate } from "react-router-dom";
import FormInput from "../../components/Form/FormInput";
import FormSelect from "../../components/Form/FormSelect";
import SearchActionButtons from "../../components/SearchActionButton";
import ConfirmModal from "../../components/ConfirmModel";
import DataTable from "../../components/DataTable";
import Loading from "../../components/Loading";
import {
  csvProgress,
  deletePosts,
  importCsv,
  postList,
} from "../../hooks/usePost";
import { PostStatus } from "../../constants/commons";
import { dateFormat } from "../../utils/date";
import { truncateText } from "../../lib/common";
import { POST } from "../../constants/routes";
import { exportCSV } from "../../api/post";
import UploadToast from "../../components/UploadToast";
import useAuthStore from "../../store/useAuthStore";

export default function PostList() {
  const statusOptions = [
    { value: "", label: "All Status" },
    { value: 1, label: "Active" },
    { value: 0, label: "Inactive" },
  ];

  const postTableHeaders = [
    "ID",
    "Post Title",
    "Description",
    "Status",
    "Post Date",
    ...(useAuthStore.getState()?.user ? ["Edit"] : []),
  ];

  const [searchForm, setSearchForm] = useState({
    name: "",
    description: "",
    status: "",
    date: "",
  });
  const [selectAll, setSelectAll] = useState(false);
  const [selectedRows, setSelectedRows] = useState(new Set());
  const [excludeRows, setExcludeRows] = useState(new Set());
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [page, setPage] = useState(1);
  const [params, setParams] = useState(null);
  const [taskId, setTaskId] = useState(null);
  const fileInputRef = useRef(null);

  const navigate = useNavigate();
  const mutation = importCsv();
  const { mutate: deleteUserFn, isLoading: isDeleteUserLoading } =
    deletePosts();

  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearchForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearchReset = () => {
    setSearchForm({
      name: "",
      description: "",
      status: "",
      date: "",
    });
    setParams(null);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setParams(searchForm);
  };

  const handleRowSelect = (postId) => {
    if (selectAll) {
      const newExclude = new Set(excludeRows);
      if (newExclude.has(postId)) {
        newExclude.delete(postId);
      } else {
        newExclude.add(postId);
      }
      setExcludeRows(newExclude);
    } else {
      const newSelected = new Set(selectedRows);
      if (newSelected.has(postId)) {
        newSelected.delete(postId);
      } else {
        newSelected.add(postId);
      }
      setSelectedRows(newSelected);
    }
  };

  const isRowSelected = (postId) => {
    if (selectAll) return !excludeRows.has(postId);
    return selectedRows.has(postId);
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
        const data = new FormData();
        data.append("file", file);

        mutation.mutate(data, {
          onSuccess: (res) => {
            alert(res?.msg);
            setTaskId(res?.task_id ?? 0);
          },
          onError: (error) => {
            console.error("CSV Import Fail.", error);
            // setErrorMessage(error.response.errors || "Csv Import Fail.");
          },
          onSettled: () => {
            if (fileInputRef.current) {
              fileInputRef.current.value = "";
            }
          },
        });
      } else {
        alert(
          "Excel files are not allowed. Please upload a different file format.",
        );
      }
    }
  };

  const handleDownload = async () => {
    try {
      const fileName = window.prompt("Enter file name for CSV", "posts");

      if (!fileName) {
        return;
      }
      if (Array.from(selectedRows).length || selectAll) {
        const payload = selectAll
          ? { all: true, exclude_ids: Array.from(excludeRows) }
          : { post_ids: Array.from(selectedRows) };
        const response = await exportCSV(payload);

        const blob = new Blob([response], {
          type: "text/csv;charset=utf-8;",
        });

        const url = window.URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = `${fileName}.csv`;
        document.body.appendChild(a);
        a.click();

        a.remove();
        window.URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = () => {
    if (selectedRows.size > 0 || selectAll) {
      setShowConfirmDelete(true);
    }
  };

  const confirmDelete = async () => {
    try {
      const payload = selectAll
        ? { all: true, exclude_ids: Array.from(excludeRows) }
        : { post_ids: Array.from(selectedRows) };
      await deleteUserFn(payload);
      setSelectedRows(new Set());
      setSelectAll(false);
    } catch (error) {
      console.error(error);
    } finally {
      setShowConfirmDelete(false);
    }
  };

  const cancelDelete = () => {
    setShowConfirmDelete(false);
  };

  const { data: posts, isLoading } = postList({ page, ...params });
  const { data: uploadProgress } = csvProgress(taskId);

  const finishUpload = (uploadProgress?.progress ?? 0) >= 100;

  const isSelectAllChecked = React.useMemo(() => {
    if (!selectAll || !posts?.data) return false;
    // return posts.data.every((post) => !excludeRows.has(post.id));
    return excludeRows.size < 1;
  }, [selectAll, excludeRows, posts?.data]);

  const handleSelectAll = (event) => {
    event.stopPropagation();
    const newSelectAll = !isSelectAllChecked;
    setSelectAll(newSelectAll);

    if (newSelectAll) {
      setSelectedRows(new Set());
      setExcludeRows(new Set());
    } else {
      setSelectedRows(new Set());
      setExcludeRows(new Set());
    }
  };

  return (
    <Layout activeRoute="post-list">
      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          {isLoading ? (
            <Loading />
          ) : (
            <>
              {/* Search Form */}
              {useAuthStore.getState()?.user && (
                <form
                  onSubmit={handleSearchSubmit}
                  className="relative z-10  bg-white/10 backdrop-blur-lg rounded-xl p-6 mb-6 border border-white/20"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
                    {/* Post Name */}
                    <FormInput
                      label="Post Name"
                      type="text"
                      name="name"
                      value={searchForm.name}
                      onChange={handleSearchChange}
                      placeholder="Enter post name"
                    />

                    {/* Post Description */}
                    <FormInput
                      label="Description"
                      type="text"
                      name="description"
                      value={searchForm.description}
                      onChange={handleSearchChange}
                      placeholder="Enter description"
                    />

                    {/* Post Status */}
                    <FormSelect
                      label="Status"
                      name="status"
                      value={searchForm.status}
                      onChange={handleSearchChange}
                      options={statusOptions}
                    />

                    {/* Post Date */}
                    <div>
                      <label className="block text-white text-sm font-medium mb-2">
                        Post Date
                      </label>
                      <DatePicker
                        name="date"
                        value={searchForm.date}
                        onChange={handleSearchChange}
                        placeholder="Select date"
                      />
                    </div>

                    {/* Action Buttons */}
                    <SearchActionButtons onReset={handleSearchReset} />
                  </div>
                </form>
              )}

              {/* Table Actions */}
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex space-x-2">
                    {useAuthStore.getState()?.user && (
                      <button
                        onClick={() => navigate(`/post/create`)}
                        className="px-4 py-2 cursor-pointer bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors duration-200 flex items-center space-x-2"
                      >
                        <Plus size={16} />
                        <span>Create</span>
                      </button>
                    )}

                    {/* File Upload Button */}
                    {useAuthStore.getState()?.user && (
                      <label className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors duration-200 flex items-center space-x-2 cursor-pointer">
                        <Upload size={16} />
                        <span>Upload</span>
                        <input
                          type="file"
                          accept=".csv"
                          ref={fileInputRef}
                          onChange={handleUpload}
                          className="hidden"
                        />
                      </label>
                    )}

                    {/* Download Button - Disabled if no rows selected */}
                    <button
                      onClick={handleDownload}
                      disabled={selectedRows.size == 0 && !selectAll}
                      className={`px-4 py-2 ${
                        selectedRows.size == 0 && !selectAll
                          ? "bg-green-600/50 cursor-not-allowed"
                          : "bg-green-600 hover:bg-green-700"
                      } text-white cursor-pointer rounded-lg transition-colors duration-200 flex items-center space-x-2`}
                    >
                      <Download size={16} />
                      <span>Download</span>
                    </button>

                    {/* Delete Button - Disabled if no rows selected */}
                    {useAuthStore.getState()?.user && (
                      <button
                        onClick={handleDelete}
                        disabled={selectedRows.size == 0 && !selectAll}
                        className={`px-4 py-2 ${
                          selectedRows.size == 0 && !selectAll
                            ? "bg-red-600/50 cursor-not-allowed"
                            : "bg-red-600 hover:bg-red-700 cursor-pointer "
                        } text-white  rounded-lg transition-colors duration-200 flex items-center space-x-2`}
                      >
                        <Trash2 size={16} />
                        <span>Delete</span>
                      </button>
                    )}
                  </div>

                  <div className="flex items-center space-x-4">
                    <span className="text-white">
                      {`${posts?.meta.page}-${posts?.meta.pages}/${posts?.meta?.total}`}{" "}
                      items
                    </span>
                    <div className="flex space-x-1">
                      <button
                        className="p-2 bg-purple-500/60 cursor-pointer text-white rounded-lg hover:bg-purple-500/50 transition-colors disabled:cursor-not-allowed disabled:hover:bg-purple-900 disabled:bg-purple-900"
                        disabled={posts.meta.page == 1 || !posts.meta.pages}
                        onClick={() => setPage(posts.meta.page - 1)}
                      >
                        &lt;
                      </button>
                      <button
                        className="p-2 bg-purple-500/60 cursor-pointer text-white rounded-lg hover:bg-purple-500/50 transition-colors disabled:cursor-not-allowed disabled:hover:bg-purple-900 disabled:bg-purple-900"
                        onClick={() => setPage(posts.meta.page + 1)}
                        disabled={page == posts.meta.pages || !posts.meta.pages}
                      >
                        &gt;
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Posts Table */}
              <DataTable
                headers={postTableHeaders}
                data={posts?.data}
                selectAll={isSelectAllChecked}
                onSelectAll={handleSelectAll}
                emptyState={
                  <div className="text-center py-12">
                    <FileText className="w-12 h-12 text-purple-300 mx-auto mb-4" />
                    <p className="text-white text-lg">No posts found</p>
                    <p className="text-purple-200">
                      Try adjusting your search criteria
                    </p>
                  </div>
                }
                renderRow={(post) => {
                  return (
                    <>
                      <td className="px-6 py-4 flex justify-center">
                        <input
                          type="checkbox"
                          checked={isRowSelected(post.id)}
                          onClick={(e) => e.stopPropagation()}
                          onChange={() => handleRowSelect(post.id)}
                          className="w-4 h-4 text-purple-600 cursor-pointer flex bg-white/10 border-white/30 rounded focus:ring-purple-500 focus:ring-2"
                        />
                      </td>

                      <td
                        className="px-6 py-4 text-white cursor-pointer hover:underline"
                        onClick={() => navigate(`/post/${post.id}`)}
                      >
                        {post.id}
                      </td>

                      <td
                        className="px-6 py-4 text-white font-medium cursor-pointer hover:underline"
                        onClick={() => navigate(`/post/${post.id}`)}
                      >
                        {truncateText(post?.title, 25)}
                      </td>

                      <td
                        className="px-6 py-4 text-purple-200 hover:underline cursor-pointer"
                        onClick={() => navigate(`/post/${post.id}`)}
                      >
                        {truncateText(post.description)}
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            post.status
                              ? "bg-green-500/30 text-green-300"
                              : "bg-red-500/30 text-red-300"
                          }`}
                        >
                          {PostStatus[post.status]}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-white">
                        {dateFormat(post.created_at)}
                      </td>

                      {useAuthStore.getState()?.user && (
                        <td className="px-6 py-4">
                          <button
                            onClick={() => navigate(`${POST.EDIT}/${post.id}`)}
                            className="p-2 cursor-pointer text-purple-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                          >
                            <Edit size={16} />
                          </button>
                        </td>
                      )}
                    </>
                  );
                }}
              />
            </>
          )}
        </div>
      </main>

      {/* Confirm Delete Modal */}
      <ConfirmModal
        open={showConfirmDelete}
        title="Confirm Deletion"
        description={`Are you sure you want to delete ${
          selectedRows.size
        } selected post${
          selectedRows.size !== 1 ? "s" : ""
        }? This action cannot be undone.`}
        onCancel={cancelDelete}
        onConfirm={confirmDelete}
        confirmText="Delete"
        cancelText="Cancel"
      />

      {taskId && (
        <UploadToast
          uploadProgress={uploadProgress}
          finishUpload={finishUpload}
          setTaskId={setTaskId}
        />
      )}
    </Layout>
  );
}
