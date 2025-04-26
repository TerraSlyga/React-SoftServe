import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// Імпорт сторінок
import Home from "../pages/Home/Home";
import MovieDetails from "../pages/MovieDetails/MovieDetails";
import Favorites from "../pages/Favorites/Favorites";
import Sessions from "../pages/Sessions/Sessions";
import Admin from "../pages/Admin/Admin";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import NotFound from "../pages/NotFound/NotFound";

// Імпорт шаблонів
import MainLayout from "../layouts/MainLayout";
import AdminLayout from "../layouts/AdminLayout";

// Імпорт хуку для перевірки авторизації
import useAuth from "../hooks/useAuth";

function AppRoutes() {
  const { user } = useAuth();

  return (
    <Router>
      <Routes>
        {/* Основні шляхи бізнес логіки */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/movies/:id" element={<MovieDetails />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/sessions" element={<Sessions />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* Адмін панель*/}
        <Route element={<AdminLayout />}>
          <Route
            path="/admin"
            element={user?.isAdmin ? <Admin /> : <Navigate to="/login" />}
          />
        </Route>

        {/* Сторінка 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
