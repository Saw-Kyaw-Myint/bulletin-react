import Layout from "../../components/Layout";
import React, { useState, useEffect } from "react";
import Loading from "../../components/Loading";
import {
  User,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Settings,
  Edit3,
  Download,
  Trash2,
} from "lucide-react";

const UserDetail = () => {
  const [isLoading, setIsLoading] = useState(true);
  // Mock user detail data
  const userDetail = {
    profilePicture: "https://placehold.co/150x150/6366f1/white?text=JD",
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    dateOfBirth: "15/06/1985",
    address: "123 Main Street, Anytown, ST 12345, United States",
    createdDate: "01/12/2025",
    createdUser: "Admin User",
    updatedDate: "01/15/2025",
    updatedUser: "System Administrator",
    role: "Administrator",
  };
  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Layout activeRoute="user-list">
      <main className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          {isLoading ? (
            <Loading />
          ) : (
            <>
              {/* Action Buttons */}
              <div className="flex justify-end space-x-3 mb-6">
                <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors duration-200 flex items-center space-x-2">
                  <Edit3 size={16} />
                  <span>Edit</span>
                </button>

                <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200 flex items-center space-x-2">
                  <Trash2 size={16} />
                  <span>Delete</span>
                </button>
              </div>

              {/* User Detail Card */}
              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20">
                {/* Profile Picture and Basic Info */}
                <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8 mb-8">
                  <div className="w-24 h-24 rounded-full overflow-hidden border-3 border-white/30">
                    <img
                      src={userDetail.profilePicture}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="text-center md:text-left">
                    <h2 className="text-2xl font-bold text-white mb-2">
                      {userDetail.name}
                    </h2>
                    <span className="px-3 py-1 bg-blue-500/30 text-blue-300 rounded-full text-sm font-medium">
                      {userDetail.role}
                    </span>
                  </div>
                </div>

                {/* Personal Information Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {/* Left Column */}
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <Mail
                        className="text-purple-300 mt-1 flex-shrink-0"
                        size={18}
                      />
                      <div>
                        <p className="text-purple-300 text-xs font-medium">
                          Email
                        </p>
                        <p className="text-white">{userDetail.email}</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3 mt-10">
                      <Phone
                        className="text-purple-300 mt-1 flex-shrink-0"
                        size={18}
                      />
                      <div>
                        <p className="text-purple-300 text-xs font-medium">
                          Phone
                        </p>
                        <p className="text-white">{userDetail.phone}</p>
                      </div>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <MapPin
                        className="text-purple-300 mt-1 flex-shrink-0"
                        size={18}
                      />
                      <div>
                        <p className="text-purple-300 text-xs font-medium">
                          Address
                        </p>
                        <p className="text-white">{userDetail.address}</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3 mt-10">
                      <Calendar
                        className="text-purple-300 mt-1 flex-shrink-0"
                        size={18}
                      />
                      <div>
                        <p className="text-purple-300 text-xs font-medium">
                          Date of Birth
                        </p>
                        <p className="text-white">{userDetail.dateOfBirth}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Metadata Section */}
                <div className="border-t border-white/20 pt-6">
                  <h3 className="text-white text-lg font-semibold mb-4 flex items-center">
                    <Settings size={18} className="mr-2" />
                    System Information
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Created Information */}
                    <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                      <h4 className="text-white text-sm font-semibold mb-3">
                        Created Information
                      </h4>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3">
                          <Calendar
                            size={16}
                            className="text-purple-300 flex-shrink-0"
                          />
                          <div>
                            <p className="text-purple-300 text-xs">
                              Created Date
                            </p>
                            <p className="text-white">
                              {userDetail.createdDate}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <User
                            size={16}
                            className="text-purple-300 flex-shrink-0"
                          />
                          <div>
                            <p className="text-purple-300 text-xs">
                              Created By
                            </p>
                            <p className="text-white">
                              {userDetail.createdUser}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Updated Information */}
                    <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                      <h4 className="text-white text-sm font-semibold mb-3">
                        Updated Information
                      </h4>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3">
                          <Calendar
                            size={16}
                            className="text-purple-300 flex-shrink-0"
                          />
                          <div>
                            <p className="text-purple-300 text-xs">
                              Updated Date
                            </p>
                            <p className="text-white">
                              {userDetail.updatedDate}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <User
                            size={16}
                            className="text-purple-300 flex-shrink-0"
                          />
                          <div>
                            <p className="text-purple-300 text-xs">
                              Updated By
                            </p>
                            <p className="text-white">
                              {userDetail.updatedUser}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </main>
    </Layout>
  );
};

export default UserDetail;
