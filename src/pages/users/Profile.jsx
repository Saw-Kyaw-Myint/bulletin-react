import Layout from "../../components/Layout";
import Loading from "../../components/Loading";
import { getUser } from "../../hooks/useUser";
import { Link } from "react-router-dom";
import UserCard from "../../components/UserCard";
import useAuthStore from "../../store/useAuthStore";
import { Edit2 } from "lucide-react";

const Profile = () => {
  const { data: userDetail, isLoading } = getUser(
    useAuthStore.getState().user?.id,
  );

  return (
    <Layout>
      <main className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-3xl mx-auto">
          {isLoading ? (
            <Loading />
          ) : (
            <>
              <div className=" relative z-10">
                <div className="flex justify-end space-x-3 mb-6">
                  <Link
                    to={`/profile/edit`}
                    className="px-4 py-2 bg-blue-600 cursor-pointer hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 flex items-center space-x-2"
                  >
                    <Edit2 size={16} />
                    <span>Update</span>
                  </Link>

                  {/* <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200 flex items-center space-x-2">
                    <Trash2 size={16} />
                    <span>Delete</span>
                  </button> */}
                </div>
              </div>
              <UserCard userDetail={userDetail} />
            </>
          )}
        </div>
      </main>
    </Layout>
  );
};

export default Profile;
