import { Role, imagePath } from "../constants/commons";
import { dateFormat } from "../utils/date";
import { User, Mail, Phone, Calendar, MapPin, Settings } from "lucide-react";

const UserCard = ({ userDetail }) => {
  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20">
      {/* Profile Picture and Basic Info */}
      <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8 mb-8">
        {userDetail?.profile_path && (
          <div className="w-32 h-32 rounded-full overflow-hidden border-3 border-white/30">
            <img
              src={`${imagePath}/${userDetail?.profile_path}`}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-bold text-white mb-2">
            {userDetail.name}
          </h2>
          <span className="px-3 py-1 bg-blue-500/30 text-blue-300 rounded-full text-sm font-medium">
            {Role[userDetail.role]}
          </span>
        </div>
      </div>

      {/* Personal Information Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Left Column */}
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <Mail className="text-purple-300 mt-1 flex-shrink-0" size={18} />
            <div>
              <p className="text-purple-300 text-xs font-medium">Email</p>
              <p className="text-white">{userDetail.email}</p>
            </div>
          </div>

          {userDetail.phone && (
            <div className="flex items-start space-x-3 mt-10">
              <Phone className="text-purple-300 mt-1 flex-shrink-0" size={18} />
              <div>
                <p className="text-purple-300 text-xs font-medium">Phone</p>
                <p className="text-white">{userDetail.phone}</p>
              </div>
            </div>
          )}
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <MapPin className="text-purple-300 mt-1 flex-shrink-0" size={18} />
            <div>
              <p className="text-purple-300 text-xs font-medium">Address</p>
              <p className="text-white">{userDetail.address}</p>
            </div>
          </div>
          {userDetail.dob && (
            <div className="flex items-start space-x-3 mt-10">
              <Calendar
                className="text-purple-300 mt-1 flex-shrink-0"
                size={18}
              />
              <div>
                <p className="text-purple-300 text-xs font-medium">
                  Date of Birth
                </p>
                <p className="text-white">{dateFormat(userDetail.dob)}</p>
              </div>
            </div>
          )}
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
                <Calendar size={16} className="text-purple-300 flex-shrink-0" />
                <div>
                  <p className="text-purple-300 text-xs">Created Date</p>
                  <p className="text-white">
                    {dateFormat(userDetail.created_at)}
                  </p>
                </div>
              </div>
              {userDetail?.created_user_id && (
                <div className="flex items-center space-x-3">
                  <User size={16} className="text-purple-300 flex-shrink-0" />
                  <div>
                    <p className="text-purple-300 text-xs">Created By</p>
                    <p className="text-white">{userDetail?.creator?.name}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Updated Information */}
          <div className="bg-white/5 rounded-lg p-4 border border-white/10">
            <h4 className="text-white text-sm font-semibold mb-3">
              Updated Information
            </h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Calendar size={16} className="text-purple-300 flex-shrink-0" />
                <div>
                  <p className="text-purple-300 text-xs">Updated Date</p>
                  <p className="text-white">
                    {dateFormat(userDetail.updated_at)}
                  </p>
                </div>
              </div>
              {userDetail.updated_user_id && (
                <div className="flex items-center space-x-3">
                  <User size={16} className="text-purple-300 flex-shrink-0" />
                  <div>
                    <p className="text-purple-300 text-xs">Updated By</p>
                    <p className="text-white">{userDetail.updater.name}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default UserCard;
