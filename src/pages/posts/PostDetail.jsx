import {
  FileText,
  User,
  Calendar,
  Settings,
  ArrowLeft,
  Edit3,
  Download,
  Trash2,
} from "lucide-react";
import Layout from "../../components/Layout";

const PostDetail = () => {
  // Mock post detail data
  const postDetail = {
    title: "Welcome to Our Platform",
    description:
      "This is a comprehensive introduction to our new bulletin board system. The platform provides a robust and user-friendly interface for managing posts, users, and various administrative tasks. You can create, edit, delete, and manage all your content through this intuitive dashboard.",
    status: "active",
    createdDate: "01/12/2025",
    createdUser: "John Doe",
    updatedDate: "01/15/2025",
    updatedUser: "Jane Smith",
  };

  return (
    <Layout>
      <main className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
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

          {/* Post Detail Card */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20">
            {/* Title */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-2">
                {postDetail.title}
              </h2>
              <div className="flex items-center space-x-4">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    postDetail.status === "active"
                      ? "bg-green-500/30 text-green-300"
                      : "bg-red-500/30 text-red-300"
                  }`}
                >
                  {postDetail.status.charAt(0).toUpperCase() +
                    postDetail.status.slice(1)}
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h3 className="text-white text-sm font-medium mb-3 flex items-center">
                <FileText size={16} className="mr-2" />
                Description
              </h3>
              <p className="text-purple-200 leading-relaxed whitespace-pre-wrap">
                {postDetail.description}
              </p>
            </div>

            {/* Metadata Grid */}
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
                      <p className="text-purple-300 text-xs">Created Date</p>
                      <p className="text-white">{postDetail.createdDate}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <User size={16} className="text-purple-300 flex-shrink-0" />
                    <div>
                      <p className="text-purple-300 text-xs">Created By</p>
                      <p className="text-white">{postDetail.createdUser}</p>
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
                      <p className="text-purple-300 text-xs">Updated Date</p>
                      <p className="text-white">{postDetail.updatedDate}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <User size={16} className="text-purple-300 flex-shrink-0" />
                    <div>
                      <p className="text-purple-300 text-xs">Updated By</p>
                      <p className="text-white">{postDetail.updatedUser}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default PostDetail;
