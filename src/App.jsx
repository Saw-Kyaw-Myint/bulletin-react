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

const App = () => {
  useAuthInit();

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/posts" element={<PostList />} />
        <Route path="/post/create" element={<PostCreate />} />
        <Route path="/post/:id" element={<PostDetail />} />
        <Route path="/user/create" element={<UserCreate />} />
      </Route>
    </Routes>
  );
};

export default App;
