import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

// Компонент для захисту адмін-сторінок
const AdminRoute = ({ children }) => {
  const { user } = useSelector((state) => state.auth);

  // Якщо користувач не авторизований або не є адміністратором, редирект на сторінку входу
  if (!user || user.role !== "admin") {
    return <Navigate to="/login" />;
  }

  return children; // Якщо користувач адміністратор, рендеримо дочірні компоненти (адмін-сторінки)
};

export default AdminRoute;
