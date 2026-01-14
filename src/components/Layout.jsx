import React, { useState } from "react";
import { format, parseISO } from "date-fns";
import {
  Users,
  FileText,
  UserPlus,
  LogOut,
  User,
  Calendar,
  Settings,
  Menu,
  X,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import { motion } from "framer-motion";
import Logo from "./Logo";
import useAuthStore from "../store/useAuthStore";
import { Role } from "../constants/commons";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export default function Layout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeMenu, setActiveMenu] = useState("post-list");
  const { logout, user } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);
  const [cookie, removeCookie] = useCookies(["access_token"]);
  const navigate = useNavigate();

  // Mock data for dashboard
  const stats = [
    {
      title: "Total Posts",
      value: "247",
      icon: FileText,
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Active Users",
      value: "1,289",
      icon: Users,
      color: "from-purple-500 to-pink-500",
    },
    {
      title: "New Registrations",
      value: "42",
      icon: UserPlus,
      color: "from-green-500 to-emerald-500",
    },
    {
      title: "Last Login",
      value: "01/01/2025",
      icon: Calendar,
      color: "from-yellow-500 to-orange-500",
    },
  ];

  const menuItems = [
    { id: "post-list", label: "Post List", icon: FileText, count: 7 },
    { id: "post-create", label: "Post Create", icon: FileText, count: 8 },
    { id: "user-list", label: "User List", icon: Users, count: 9 },
    { id: "user-create", label: "User Create", icon: UserPlus, count: 10 },
  ];

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleLogout = () => {
    removeCookie("access_token", { path: "/" });
    removeCookie("refresh_token", { path: "/" });
    logout();
    navigate("/", { replace: true });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800">
      {/* Background decorative elements */}
      <div className="absolute !z-0 inset-0 overflow-hidden">
        <div className="absolute !z-0 -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute !z-0 -bottom-40 -left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse animation-delay-2000"></div>
        <div className="absolute !z-0 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
      </div>

      {/* Header */}
      <header className="bg-white/10 backdrop-blur-lg border-b relative z-50 border-white/20 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
            >
              {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <Logo className="h-16 -mt-3" />
          </div>

          <div className="flex items-center space-x-6">
            <div className="text-white text-sm">
              <span className="opacity-70 font-bold italic">Last Login : </span>
              {useAuthStore.getState().user?.last_login_at
                ? format(
                    parseISO(useAuthStore.getState().user?.last_login_at),
                    "dd-MM-yyyy"
                  )
                : ""}
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-white text-sm">
                {Role[useAuthStore.getState().user?.role] ?? ""}
              </span>
            </div>

            <div className="relative">
              {/* User name + dropdown icon */}
              <div
                className="flex items-center space-x-2 cursor-pointer select-none"
                onClick={toggleDropdown}
              >
                <span className="text-gray-900 font-bold text-lg">
                  {user?.name ?? ""}
                </span>
                {isOpen ? (
                  <ChevronUp
                    size={16}
                    className="text-gray-800 font-bold px-1 py-1  bg-white/10 backdrop-blur-xl border-white/20  rounded-full"
                  />
                ) : (
                  <ChevronDown
                    size={16}
                    className="text-gray-800  font-bold px-1 py-1  rounded-full bg-white/10 backdrop-blur-xl border-white/20 "
                  />
                )}
              </div>

              {/* Dropdown menu */}
              {isOpen && (
                <div className="absolute transition duration-300 z-50 right-0 mt-2 w-48 bg-white/10 backdrop-blur-lg rounded-lg border border-white/20 shadow-lg">
                  <div className="py-2">
                    <button className="w-full flex items-center px-4 py-2 text-white hover:bg-white/10 transition-colors">
                      <User size={16} className="mr-2" />
                      Profile
                    </button>
                    <button
                      className="w-full flex items-center px-4 py-2 text-white hover:bg-red-400/30 transition-colors"
                      onClick={handleLogout}
                    >
                      <LogOut size={16} className="mr-2" />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-64px)]">
        {/* Sidebar */}
        <motion.aside
          initial={{ x: -300 }}
          animate={{ x: isSidebarOpen ? 0 : -300 }}
          transition={{ type: "spring", damping: 20 }}
          className={`bg-white/10 backdrop-blur-lg border-r border-white/20 w-64 ${
            isSidebarOpen ? "block" : "hidden"
          }`}
        >
          <nav className="mt-8 px-4">
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => setActiveMenu(item.id)}
                    className={`flex items-center w-full px-4 py-3 text-white rounded-lg transition-all duration-200 ${
                      activeMenu === item.id
                        ? "bg-blue-500/30 border-l-4 border-blue-500"
                        : "hover:bg-white/10"
                    }`}
                  >
                    <item.icon size={20} className="mr-3" />
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </motion.aside>

        {children}
      </div>
    </div>
  );
}
