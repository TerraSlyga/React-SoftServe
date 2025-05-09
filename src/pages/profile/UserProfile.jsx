"use client";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";
import "./UserProfile.css";

const UserProfile = () => {
  // Використовуємо useSelector для отримання інформації про автентифікацію
  const { isLoggedIn, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Функція для виходу з акаунту
  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    navigate("/login");
  };

  // Якщо користувач не увійшов
  if (!isLoggedIn) {
    return (
      <div className="user-profile-container">
        <div className="user-profile-not-logged">
          <h2>Ви не увійшли в акаунт</h2>
          <button className="login-button" onClick={() => navigate("/login")}>
            Увійти
          </button>
        </div>
      </div>
    );
  }

  // Використовуємо дані користувача з Redux
  const userData = user;

  return (
    <div className="user-profile-container">
      <div className="user-profile-content">
        <div className="user-profile-card">
          <h1 className="user-name">{userData.username}</h1>
          <p className="user-email">{userData.email}</p>
          <button className="logout-button" onClick={handleLogout}>
            Вийти з акаунту
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
