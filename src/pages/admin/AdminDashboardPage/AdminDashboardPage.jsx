import { Link } from "react-router-dom";
import "./AdminDashboardPage.css";

export default function AdminDashboardPage() {
  return (
    <div className="admin-dashboard">
      <h1>Адміністративна панель</h1>
      <div className="dashboard-options">
        <Link to="/admin/movies">Керування фільмами</Link>
        <Link to="/admin/sessions">Керування сеансами</Link>
        <Link to="/admin/statistics">Статистика продажів</Link>
      </div>
    </div>
  );
}
