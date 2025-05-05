import { useEffect, useState } from "react";
import sessionService from "../../services/sessionService"; // сервіс для запитів до бекенду
import "./SessionsPage.css";

export default function SessionsPage() {
  const [sessions, setSessions] = useState([]);
  const [filters, setFilters] = useState({
    date: "",
    time: "",
    genre: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    try {
      setLoading(true);
      const data = await sessionService.getAllSessions();
      setSessions(data);
    } catch (err) {
      setError("Не вдалося завантажити сеанси");
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const filteredSessions = sessions.filter((session) => {
    const matchDate = filters.date ? session.date === filters.date : true;
    const matchTime = filters.time
      ? session.time.startsWith(filters.time)
      : true;
    const matchGenre = filters.genre
      ? session.genre.toLowerCase().includes(filters.genre.toLowerCase())
      : true;
    return matchDate && matchTime && matchGenre;
  });

  return (
    <div className="sessions-page">
      <h1>Розклад сеансів</h1>

      <div className="filters">
        <input
          type="date"
          name="date"
          value={filters.date}
          onChange={handleFilterChange}
        />
        <input
          type="time"
          name="time"
          value={filters.time}
          onChange={handleFilterChange}
        />
        <input
          type="text"
          name="genre"
          placeholder="Жанр"
          value={filters.genre}
          onChange={handleFilterChange}
        />
      </div>

      {loading ? (
        <p>Завантаження...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : filteredSessions.length === 0 ? (
        <p>Сеансів не знайдено</p>
      ) : (
        <div className="sessions-list">
          {filteredSessions.map((session) => (
            <div key={session.id} className="session-card">
              <h3>{session.movieTitle}</h3>
              <p>Дата: {session.date}</p>
              <p>Час: {session.time}</p>
              <p>Жанр: {session.genre}</p>
              <p>Ціна: {session.price} грн</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
