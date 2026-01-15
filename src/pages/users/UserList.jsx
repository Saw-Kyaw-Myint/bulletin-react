import Layout from "../../components/Layout";
import React, { useEffect, useState } from "react";
import { Settings, Lock, Unlock, Trash2, Edit3, Key } from "lucide-react";
import DatePicker from "../../components/DatePicker";
import DataTable from "../../components/DataTable";
import ConfirmModal from "../../components/ConfirmModel";
import Loading from "../../components/Loading";
import SearchActionButtons from "../../components/SearchActionButton";
import FormSelect from "../../components/Form/FormSelect";
import FormInput from "../../components/Form/FormInput";
import { useNavigate } from "react-router-dom";

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
    { value: "admin", label: "Administrator" },
    { value: "moderator", label: "Moderator" },
    { value: "user", label: "User" },
    { value: "guest", label: "Guest" },
  ];

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [searchForm, setSearchForm] = useState({
    name: "",
    email: "",
    role: "",
    startDate: "",
    endDate: "",
  });

  // Mock user data
  const mockUsers = [
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      role: "admin",
      status: "active",
      createdDate: "01/12/2025",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      role: "moderator",
      status: "inactive",
      createdDate: "01/10/2025",
    },
    {
      id: 3,
      name: "Bob Johnson",
      email: "bob.johnson@example.com",
      role: "user",
      status: "active",
      createdDate: "01/08/2025",
    },
    {
      id: 4,
      name: "Alice Brown",
      email: "alice.brown@example.com",
      role: "guest",
      status: "inactive",
      createdDate: "01/05/2025",
    },
    {
      id: 5,
      name: "Charlie Wilson",
      email: "charlie.wilson@example.com",
      role: "user",
      status: "active",
      createdDate: "12/20/2024",
    },
  ];

  const [selectAll, setSelectAll] = useState(false);
  const [selectedRows, setSelectedRows] = useState(new Set());
  const [openSettings, setOpenSettings] = useState(null);
  const [showConfirmUnlock, setShowConfirmUnlock] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500); // Simulate 1.5 seconds of loading

    return () => clearTimeout(timer);
  }, []);

  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearchForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearchReset = () => {
    setSearchForm({
      name: "",
      email: "",
      role: "",
      startDate: "",
      endDate: "",
    });
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log("Search submitted:", searchForm);
  };

  const handleSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);
    const newSelectedRows = new Set();
    if (newSelectAll) {
      mockUsers.forEach((user) => newSelectedRows.add(user.id));
    }
    setSelectedRows(newSelectedRows);
  };

  const handleRowSelect = (userId) => {
    const newSelectedRows = new Set(selectedRows);
    if (newSelectedRows.has(userId)) {
      newSelectedRows.delete(userId);
    } else {
      newSelectedRows.add(userId);
    }
    setSelectedRows(newSelectedRows);
    setSelectAll(newSelectedRows.size === mockUsers.length);
  };

  const handleLockUnlock = () => {
    if (selectedRows.size > 0) {
      setShowConfirmUnlock(true);
    }
  };

  const confirmUnlock = () => {
    console.log("Lock/Unlock selected users:", Array.from(selectedRows));
    setShowConfirmUnlock(false);
  };

  const cancelUnlock = () => {
    setShowConfirmUnlock(false);
  };

  const handleDelete = () => {
    if (selectedRows.size > 0) {
      setShowConfirmDelete(true);
    }
  };

  const confirmDelete = () => {
    console.log("Delete selected users:", Array.from(selectedRows));
    setSelectedRows(new Set());
    setSelectAll(false);
    setShowConfirmDelete(false);
  };

  const cancelDelete = () => {
    setShowConfirmDelete(false);
  };

  const toggleSettings = (userId) => {
    setOpenSettings(openSettings === userId ? null : userId);
  };

  const handleEdit = (userId) => {
    console.log("Edit user:", userId);
    setOpenSettings(null);
  };

  const handleChangePassword = (userId) => {
    navigate("/user/change-password");
    setOpenSettings(null);
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
                {" "}
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
                        type="email"
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
                          value={searchForm.startDate}
                          onChange={(e) =>
                            setSearchForm((prev) => ({
                              ...prev,
                              startDate: e.target.value,
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
                          value={searchForm.endDate}
                          onChange={(e) =>
                            setSearchForm((prev) => ({
                              ...prev,
                              endDate: e.target.value,
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
                        disabled={selectedRows.size === 0}
                        className={`px-4 py-2 ${
                          selectedRows.size === 0
                            ? "bg-yellow-600/50 cursor-not-allowed"
                            : "bg-yellow-600 hover:bg-yellow-700"
                        } text-white rounded-lg transition-colors duration-200 flex items-center space-x-2`}
                      >
                        {mockUsers.some(
                          (user) =>
                            selectedRows.has(user.id) &&
                            user.status === "active"
                        ) ? (
                          <>
                            <Lock size={16} />
                            <span>Lock</span>
                          </>
                        ) : (
                          <>
                            <Unlock size={16} />
                            <span>Unlock</span>
                          </>
                        )}
                      </button>

                      <button
                        onClick={handleDelete}
                        disabled={selectedRows.size === 0}
                        className={`px-4 py-2 ${
                          selectedRows.size === 0
                            ? "bg-red-600/50 cursor-not-allowed"
                            : "bg-red-600 hover:bg-red-700"
                        } text-white rounded-lg transition-colors duration-200 flex items-center space-x-2`}
                      >
                        <Trash2 size={16} />
                        <span>Delete</span>
                      </button>
                    </div>

                    <div className="flex items-center space-x-4">
                      <span className="text-white">1-10/37 items</span>
                      <div className="flex space-x-1">
                        <button className="p-2 bg-blue-500/30 text-white rounded-lg hover:bg-blue-500/50 transition-colors">
                          &lt;
                        </button>
                        <button className="p-2 bg-blue-500/30 text-white rounded-lg hover:bg-blue-500/50 transition-colors">
                          &gt;
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Users Table */}
                <DataTable
                  headers={userTableHeaders}
                  data={mockUsers}
                  selectAll={selectAll}
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
                          checked={selectedRows.has(user.id)}
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
                          {user.role}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            user.status === "active"
                              ? "bg-green-500/30 text-green-300"
                              : "bg-red-500/30 text-red-300"
                          }`}
                        >
                          {user.status}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-white">
                        {user.createdDate}
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
      <ConfirmModal
        open={showConfirmUnlock}
        title="Confirm Lock/Unlock"
        description={`Are you sure you want to
                  ${
                    mockUsers.some(
                      (user) =>
                        selectedRows.has(user.id) && user.status === "active"
                    )
                      ? "lock"
                      : "unlock"
                  }
                  ${selectedRows.size} selected
                  ${
                    selectedRows.size !== 1 ? "users?" : "user?"
                  } This action cannot be
                  undone.`}
        onCancel={cancelUnlock}
        onConfirm={confirmUnlock}
        confirmText={
          mockUsers.some(
            (user) => selectedRows.has(user.id) && user.status === "active"
          )
            ? "Lock"
            : "Unlock"
        }
        cancelText="Cancel"
      />

      {/* Confirm Delete Modal */}
      <ConfirmModal
        open={showConfirmDelete}
        title="Confirm Deletion"
        description={`Are you sure you want to delete ${
          selectedRows.size
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
