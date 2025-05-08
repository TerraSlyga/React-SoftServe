import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/authSlice"; // Імпорт вашого action
import { useNavigate } from "react-router-dom";
import "./UserProfile.css"; // Імпортуємо CSS файл для стилів

const UserProfile = () => {
  // Статичні дані користувача

  // Використовуємо useSelector для отримання інформації про автентифікацію
  const { isLoggedIn, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Функція для виходу з акаунту
  const handleLogout = () => {
    dispatch(logout()); // Викликаємо logout action з Redux
    localStorage.removeItem("token"); // Видаляємо токен з localStorage
    navigate("/login"); // Перенаправлення на сторінку входу
  };

  // Якщо користувач не увійшов
  if (!isLoggedIn) {
    return (
      <div className="user-profile">
        <h2>Ви вийшли з акаунту.</h2>
        <button onClick={() => navigate("/login")}>Увійти</button>
      </div>
    );
  }

  // Якщо користувач увійшов
  return (
    <div className="user-profile">
      <div className="profile-header">
        <h1>{user.username}</h1>
        <p>{user.email}</p>
      </div>

      <button className="logout-button" onClick={handleLogout}>
        Вийти з акаунту
      </button>
    </div>
  );
};

export default UserProfile;
