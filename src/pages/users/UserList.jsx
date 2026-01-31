import Layout from "../../components/Layout";
import React, { useEffect, useState } from "react";
import { Settings, Lock, Unlock, Trash2, Edit3, Key } from "lucide-react";
import DatePicker from "../../components/DatePicker";
import DataTable from "../../components/DataTable";
import ConfirmModel from "../../components/ConfirmModel";
import Loading from "../../components/Loading";
import SearchActionButtons from "../../components/SearchActionButton";
import FormSelect from "../../components/Form/FormSelect";
import FormInput from "../../components/Form/FormInput";
import { useNavigate } from "react-router-dom";
import {
  deleteUsers,
  lockUser,
  unlockUser,
  userList,
} from "../../hooks/useUser";
import { Role, UserStatus } from "../../constants/commons";
import { dateFormat } from "../../utils/date";

const UsersList = () => {
  const userTableHeaders = [
    "ID",
    "Name",
    "Email",
    "Role",
    "Status",
    "Created Date",
    "Settings",
  ];

  const roleOptions = [
    { value: "", label: "All Roles" },
    { value: 0, label: "Admin" },
    { value: 1, label: "User" },
  ];

  const [searchForm, setSearchForm] = useState({
    name: "",
    email: "",
    role: "",
    start_date: null,
    end_date: null,
  });

  const [selectAll, setSelectAll] = useState(false);
  const [selectedRows, setSelectedRows] = useState(new Set());
  const [excludeRows, setExcludeRows] = useState(new Set());
  const [openSettings, setOpenSettings] = useState(null);
  const [showConfirmUnlock, setShowConfirmUnlock] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [params, setParams] = useState(null);
  const { data: usersData, isLoading } = userList({ page, ...params });

  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearchForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearchReset = () => {
    setSearchForm({
      name: "",
      email: "",
      role: "",
      start_date: "",
      end_date: "",
    });

    setParams(null);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setParams(searchForm);
  };
  const isSelectAllChecked = React.useMemo(() => {
    if (!selectAll || !usersData?.data) return false;
    // return posts.data.every((post) => !excludeRows.has(post.id));
    return excludeRows.size < 1;
  }, [selectAll, excludeRows, usersData?.data]);

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

  const handleRowSelect = (userId) => {
    if (selectAll) {
      const newExclude = new Set(excludeRows);
      if (newExclude.has(userId)) {
        newExclude.delete(userId);
      } else {
        newExclude.add(userId);
      }
      setExcludeRows(newExclude);
    } else {
      const newSelectedRows = new Set(selectedRows);
      if (newSelectedRows.has(userId)) {
        newSelectedRows.delete(userId);
      } else {
        newSelectedRows.add(userId);
      }
      setSelectedRows(newSelectedRows);
    }
  };

  const isRowSelected = (userId) => {
    if (selectAll) return !excludeRows.has(userId);
    return selectedRows.has(userId);
  };

  const handleLockUnlock = () => {
    if (selectedRows.size > 0) {
      setShowConfirmUnlock(true);
    }
  };

  const cancelUnlock = () => {
    setShowConfirmUnlock(false);
  };

  const handleDelete = () => {
    if (selectedRows.size > 0 || selectAll) {
      setShowConfirmDelete(true);
    }
  };

  const cancelDelete = () => {
    setShowConfirmDelete(false);
  };

  const toggleSettings = (userId) => {
    setOpenSettings(openSettings === userId ? null : userId);
  };

  const handleEdit = (userId) => {
    navigate(`/user/edit/${userId}`);
    setOpenSettings(null);
  };

  const handleChangePassword = (userId) => {
    navigate("/user/change-password");
    setOpenSettings(null);
  };

  const { mutate: lockUserFn, isLoading: isLockUserLoading } = lockUser();
  const { mutate: unLockUserFn, isLoading: isUnlockUserLoading } = unlockUser();
  const { mutate: deleteUserFn, isLoading: isDeleteUserLoading } =
    deleteUsers();

  const isLockFunction = usersData?.data.some(
    (user) => selectedRows.has(user.id) && user.lock_flg == true,
  );

  const resetSelectedRows = () => {
    setSelectedRows(new Set());
    setSelectAll(false);
  };

  const confirmUnlock = async () => {
    if (selectedRows.size > 10) {
      alert("Please Select 10 Users.");
      setShowConfirmUnlock(false);
      return;
    }
    if (!isLockFunction) {
      try {
        const payload = { user_ids: Array.from(selectedRows) };
        await lockUserFn(payload);
        resetSelectedRows();
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        const payload = { user_ids: Array.from(selectedRows) };
        await unLockUserFn(payload);
        resetSelectedRows();
      } catch (error) {
        console.error(error);
      }
    }
    setShowConfirmUnlock(false);
  };

  const confirmDelete = async () => {
    try {
      const payload = selectAll
        ? { all: true, exclude_ids: Array.from(excludeRows) }
        : { user_ids: Array.from(selectedRows) };
      await deleteUserFn(payload);
      resetSelectedRows();
      setSelectAll(false);
    } catch (error) {
      console.error(error);
    }
    setShowConfirmDelete(false);
  };

  return (
    <div>
      <Layout activeRoute="user-list">
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            {isLoading ? (
              <Loading />
            ) : (
              <>
                {/* Search Form */}
                <div className="relative z-10">
                  <form
                    onSubmit={handleSearchSubmit}
                    className="bg-white/10 backdrop-blur-lg rounded-xl p-6 mb-6 border border-white/20"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 mb-4">
                      {/* Name */}
                      <FormInput
                        label="Name"
                        type="text"
                        name="name"
                        value={searchForm.name}
                        onChange={handleSearchChange}
                        placeholder="Enter name"
                      />

                      {/* Email */}
                      <FormInput
                        label="Email"
                        type="text"
                        name="email"
                        value={searchForm.email}
                        onChange={handleSearchChange}
                        placeholder="Enter email"
                      />

                      {/* Role */}
                      <FormSelect
                        label="Role"
                        name="role"
                        value={searchForm.role}
                        onChange={handleSearchChange}
                        options={roleOptions}
                      />
                      {/* Start Date */}
                      <div>
                        <label className="block text-white text-sm font-medium mb-2">
                          Start Date
                        </label>
                        <DatePicker
                          name="startDate"
                          value={searchForm.start_date}
                          onChange={(e) =>
                            setSearchForm((prev) => ({
                              ...prev,
                              start_date: e.target.value,
                            }))
                          }
                          placeholder="Select start date"
                          label="Start Date"
                        />
                      </div>

                      {/* End Date */}
                      <div>
                        <label className="block text-white text-sm font-medium mb-2">
                          End Date
                        </label>
                        <DatePicker
                          name="endDate"
                          value={searchForm.end_date}
                          onChange={(e) =>
                            setSearchForm((prev) => ({
                              ...prev,
                              end_date: e.target.value,
                            }))
                          }
                          placeholder="Select end date"
                          label="End Date"
                        />
                      </div>

                      {/* Action Buttons */}
                      <SearchActionButtons onReset={handleSearchReset} />
                    </div>
                  </form>
                </div>
                {/* Table Actions */}
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex space-x-2">
                      <button
                        onClick={handleLockUnlock}
                        disabled={
                          selectedRows.size === 0 ||
                          isLockUserLoading ||
                          isUnlockUserLoading
                        }
                        className={`px-4 py-2 ${
                          selectedRows.size === 0
                            ? "bg-yellow-600/50 cursor-not-allowed"
                            : "bg-yellow-600 hover:bg-yellow-700"
                        } text-white cursor-pointer rounded-lg transition-colors duration-200 flex items-center space-x-2 disabled:cursor-not-allowed`}
                      >
                        {isLockFunction ? (
                          <>
                            <Lock size={16} />
                            <span>UnLock</span>
                          </>
                        ) : (
                          <>
                            <Unlock size={16} />
                            <span>Lock</span>
                          </>
                        )}
                      </button>

                      <button
                        onClick={handleDelete}
                        disabled={
                          (selectedRows.size === 0 && !selectAll) ||
                          isDeleteUserLoading
                        }
                        className={`px-4 py-2 ${
                          selectedRows.size === 0 && !selectAll
                            ? "bg-red-600/50 cursor-not-allowed"
                            : "bg-red-600 hover:bg-red-700"
                        } text-white cursor-pointer rounded-lg transition-colors duration-200 flex items-center space-x-2 disabled:cursor-not-allowed`}
                      >
                        <Trash2 size={16} />
                        <span>Delete</span>
                      </button>
                    </div>

                    <div className="flex items-center space-x-4">
                      <span className="text-white">
                        {`${usersData?.meta.page}-${usersData?.meta.pages}/${usersData?.meta?.total}`}{" "}
                        items
                      </span>
                      <div className="flex space-x-1">
                        <button
                          className="p-2 bg-purple-500/60 cursor-pointer text-white rounded-lg hover:bg-purple-500/50 transition-colors disabled:cursor-not-allowed disabled:hover:bg-purple-900 disabled:bg-purple-900"
                          disabled={
                            usersData.meta.page == 1 || !usersData.meta.pages
                          }
                          onClick={() => setPage(usersData.meta.page - 1)}
                        >
                          &lt;
                        </button>
                        <button
                          className="p-2 bg-purple-500/60 cursor-pointer text-white rounded-lg hover:bg-purple-500/50 transition-colors disabled:cursor-not-allowed disabled:hover:bg-purple-900 disabled:bg-purple-900"
                          onClick={() => setPage(usersData.meta.page + 1)}
                          disabled={
                            page == usersData.meta.pages ||
                            !usersData.meta.pages
                          }
                        >
                          &gt;
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Users Table */}
                <DataTable
                  headers={userTableHeaders}
                  data={usersData.data}
                  selectAll={isSelectAllChecked}
                  onSelectAll={handleSelectAll}
                  emptyState={
                    <div className="text-center py-12">
                      <p className="text-white text-lg">No users found</p>
                    </div>
                  }
                  renderRow={(user) => (
                    <>
                      <td className="px-6 py-4">
                        <input
                          type="checkbox"
                          checked={isRowSelected(user.id)}
                          onClick={(e) => e.stopPropagation()}
                          onChange={(e) => handleRowSelect(user.id)}
                          className="w-4 h-4 text-purple-600 ml-4 bg-white/10 border-white/30 rounded"
                        />
                      </td>

                      <td
                        className="px-6 py-4 text-white hover:underline cursor-pointer"
                        onClick={() => navigate(`/user/${user.id}`)}
                      >
                        {user.id}
                      </td>

                      <td
                        className="px-6 py-4 text-white font-medium hover:underline cursor-pointer"
                        onClick={() => navigate(`/user/${user.id}`)}
                      >
                        {user.name}
                      </td>

                      <td
                        className="px-6 py-4 text-purple-200 hover:underline cursor-pointer"
                        onClick={() => navigate(`/user/${user.id}`)}
                      >
                        {user.email}
                      </td>

                      <td className="px-6 py-4">
                        <span className="px-2 py-1 bg-blue-500/30 text-blue-300 rounded-full text-xs">
                          {Role[user.role]}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            user.lock_flg
                              ? "bg-green-500/30 text-green-300"
                              : "bg-red-500/30 text-red-300"
                          }`}
                        >
                          {UserStatus[user.lock_flg]}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-white">
                        {dateFormat(user.created_at)}
                      </td>

                      <td className="px-6 py-4">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleSettings(user.id);
                          }}
                          className="p-2 text-purple-300 cursor-pointer hover:text-white"
                        >
                          <Settings
                            size={16}
                            className={`transition-transform duration-300 ${
                              openSettings === user.id ? "rotate-90" : ""
                            }`}
                          />
                        </button>
                        {/* Settings Dropdown */}
                        {openSettings === user.id && (
                          <div className="absolute right-0 mt-2 w-48 bg-white/10 backdrop-blur-lg rounded-lg border border-white/20 shadow-lg z-10">
                            <div className="py-1">
                              <button
                                onClick={() => handleEdit(user.id)}
                                className="w-full flex items-center px-4 py-2 text-white hover:bg-white/20 transition-colors"
                              >
                                <Edit3 size={16} className="mr-2" />
                                Edit
                              </button>
                              <button
                                onClick={() => handleChangePassword(user.id)}
                                className="w-full flex items-center px-4 py-2 text-white hover:bg-white/20 transition-colors"
                              >
                                <Key size={16} className="mr-2" />
                                Change Password
                              </button>
                            </div>
                          </div>
                        )}
                      </td>
                    </>
                  )}
                />
              </>
            )}
          </div>
        </main>
      </Layout>
      {/* Confirm Unlock Modal */}
      <ConfirmModel
        open={showConfirmUnlock}
        title="Confirm Lock/Unlock"
        description={`Are you sure you want to
                  ${isLockFunction ? "unlock" : "lock"}
                  ${selectedRows.size} selected
                  ${
                    selectedRows.size !== 1 ? "users?" : "user?"
                  } This action cannot be
                  undone.`}
        onCancel={cancelUnlock}
        onConfirm={confirmUnlock}
        confirmText={isLockFunction ? "Unlock" : "Lock"}
        cancelText="Cancel"
      />

      {/* Confirm Delete Modal */}
      <ConfirmModel
        open={showConfirmDelete}
        title="Confirm Deletion"
        description={`Are you sure you want to delete ${
          selectAll ? "all " : selectedRows.size
        } selected user${
          selectedRows.size !== 1 ? "s" : ""
        }? This action cannot be undone.`}
        onCancel={cancelDelete}
        onConfirm={confirmDelete}
        confirmText="Delete"
        cancelText="Cancel"
      />
    </div>
  );
};

export default UsersList;
