import { Route, Routes, Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import Home from "../pages/Home";
import Posts from "../pages/Posts";
import Users from "../pages/Users";
import MainLayout from "../layout/MainLayout";
import Login from "../pages/Login";

export default function SiteRoutes() {
  type ProtectedRouteProps = {
    children: ReactNode;
  };

  function ProtectedRoute({ children }: ProtectedRouteProps) {
    const authed = !!localStorage.getItem("token");
    return authed ? <>{children}</> : <Navigate to="/login" replace />;
  }

  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Home />} />
        <Route path="posts" element={<Posts />} />
        <Route path="users" element={<Users />} />
      </Route>
    </Routes>
  );
}
