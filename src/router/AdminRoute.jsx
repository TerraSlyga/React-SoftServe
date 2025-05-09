import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import MainLayout from "../layouts/MainLayout/MainLayout";

const AdminRoute = () => {
  const { user } = useSelector((state) => state.auth);

  if (!user || user.role !== "admin") {
    return <Navigate to="/login" replace />;
  }

  return <MainLayout />;
};

export default AdminRoute;
