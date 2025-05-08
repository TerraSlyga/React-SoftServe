import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout/MainLayout";
import HomePage from "../pages/HomePage/HomePage";
import MovieDetailsPage from "../pages/MovieDetailsPage/MovieDetailsPage"; // Додати деталі фільму
import SearchPage from "../pages/SearchPage/SearchPage"; // Пошук фільмів
import SessionsPage from "../pages/SessionsPage/SessionsPage"; // Сеанси
import FavoritesPage from "../pages/FavoritesPage/FavoritesPage"; // Обрані
import LoginPage from "../pages/LoginPage/LoginPage"; // Вхід
import RegisterPage from "../pages/RegisterPage/RegisterPage"; // Реєстрація
import Profile from "../pages/profile/UserProfile";

// Створення нових компонентів для адмінпанелі
import AdminDashboard from "../pages/admin/AdminDashboardPage"; // Панель адміністратора
import MoviesPage from "../pages/admin/ManageMoviesPage"; // Управління фільмами
import StatisticsPage from "../pages/admin/StatisticsPage"; // Статистика
import SessionsAdminPage from "../pages/admin/SessionsAdminPage"; // Управління сеансами

// Захист адмін-маршрутів
import AdminRoute from "../router/AdminRoute"; // Захищена адмін-сторінка

export default function AppRouter() {
  return (
    <Routes>
      {/* Звичайні маршрути для користувачів */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/movies/:id" element={<MovieDetailsPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/sessions" element={<SessionsPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/profile" element={<Profile />} />
      </Route>

      {/* Захищені маршрути для адміністратора */}
      <Route element={<AdminRoute />}>
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/movies" element={<MoviesPage />} />
        <Route path="/admin/statistics" element={<StatisticsPage />} />
        <Route path="/admin/sessions" element={<SessionsAdminPage />} />
      </Route>
    </Routes>
  );
}
