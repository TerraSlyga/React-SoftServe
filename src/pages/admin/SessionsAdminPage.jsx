import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSessions, deleteSession } from "../../store/sessionsSlice.js";
import { Link } from "react-router-dom";

export default function SessionsAdminPage() {
  const dispatch = useDispatch();
  const { sessions, loading, error } = useSelector((state) => state.sessions);

  // Для додавання нового сеансу
  const [newSession, setNewSession] = useState({
    movieId: "",
    date: "",
    time: "",
    price: "",
  });

  useEffect(() => {
    // Завантажуємо сеанси фільмів при завантаженні сторінки
    dispatch(fetchSessions());
  }, [dispatch]);

  // Обробка зміни введених даних для нового сеансу
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewSession({
      ...newSession,
      [name]: value,
    });
  };

  // Обробка додавання нового сеансу
  const handleAddSession = (e) => {
    e.preventDefault();
    // Тут додавати логіку для додавання сеансу
    // dispatch(addSession(newSession));
    setNewSession({
      movieId: "",
      date: "",
      time: "",
      price: "",
    });
  };

  // Обробка видалення сеансу
  const handleDeleteSession = (sessionId) => {
    if (window.confirm("Ви дійсно хочете видалити цей сеанс?")) {
      dispatch(deleteSession(sessionId));
    }
  };

  return (
    <div>
      <h1>Управління сеансами</h1>

      {/* Форма для додавання нового сеансу */}
      <form onSubmit={handleAddSession}>
        <h2>Додати новий сеанс</h2>
        <div>
          <label htmlFor="movieId">Фільм</label>
          <input
            type="text"
            id="movieId"
            name="movieId"
            value={newSession.movieId}
            onChange={handleChange}
            placeholder="Введіть ID фільму"
            required
          />
        </div>
        <div>
          <label htmlFor="date">Дата</label>
          <input
            type="date"
            id="date"
            name="date"
            value={newSession.date}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="time">Час</label>
          <input
            type="time"
            id="time"
            name="time"
            value={newSession.time}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="price">Ціна квитка</label>
          <input
            type="number"
            id="price"
            name="price"
            value={newSession.price}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Додати сеанс</button>
      </form>

      {/* Перегляд списку сеансів */}
      <h2>Список сеансів</h2>
      {loading && <p>Завантаження...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Фільм</th>
            <th>Дата</th>
            <th>Час</th>
            <th>Ціна</th>
            <th>Дії</th>
          </tr>
        </thead>
        <tbody>
          {sessions && sessions.length > 0 ? (
            sessions.map((session) => (
              <tr key={session.id}>
                <td>{session.id}</td>
                <td>{session.movieId}</td>
                <td>{session.date}</td>
                <td>{session.time}</td>
                <td>{session.price} грн</td>
                <td>
                  <button onClick={() => handleDeleteSession(session.id)}>
                    Видалити
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">Немає сеансів</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
