import React from "react";
import { Routes, Route } from "react-router-dom";
import ForgotPassword from "./pages/auth/ForgotPassword";
import PostList from "./pages/posts/PostList";
import { useAuthInit } from "./hooks/useAuth";
import ProtectedRoute from "./components/ProtectedRoute";
import UserCreate from "./pages/users/UserCreate";
import PostCreate from "./pages/posts/PostCreate";
import PostDetail from "./pages/posts/PostDetail";
import Login from "./pages/auth/Login";
import UsersList from "./pages/users/UserList";
import UserDetail from "./pages/users/UserDetail";
import ChangePassword from "./pages/auth/ChangePassword";
import UserEdit from "./pages/users/UserEdit";
import Profile from "./pages/users/Profile";
import ProfileEdit from "./pages/users/ProfilEdit";
import PostEdit from "./pages/posts/PostEdit";

const App = () => {
  useAuthInit();

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ChangePassword />} />
      <Route path="/posts" element={<PostList />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/post/create" element={<PostCreate />} />
        <Route path="/post/:id" element={<PostDetail />} />
        <Route path="/post/edit/:id" element={<PostEdit />} />
        <Route path="/users" element={<UsersList />} />
        <Route path="/user/create" element={<UserCreate />} />
        <Route path="/user/edit/:id" element={<UserEdit />} />
        <Route path="/user/:id" element={<UserDetail />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/edit" element={<ProfileEdit />} />
        <Route path="/user/change-password" element={<ChangePassword />} />
      </Route>
    </Routes>
  );
};

export default App;
