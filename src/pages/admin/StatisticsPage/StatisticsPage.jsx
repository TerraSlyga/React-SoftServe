import { useEffect, useState } from "react";
import {
  getTotalStatistics,
  getMovieStatistics,
  getStatisticsByPeriod,
} from "../../../services/statisticsService";

export default function StatisticsPage() {
  const [totalStats, setTotalStats] = useState(null);
  const [movieStats, setMovieStats] = useState(null);
  const [periodStats, setPeriodStats] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Завантажуємо загальну статистику
    const fetchTotalStats = async () => {
      try {
        const stats = await getTotalStatistics();
        setTotalStats(stats);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchTotalStats();
  }, []);

  // Функція для отримання статистики по фільму
  const handleGetMovieStats = async (movieId) => {
    try {
      const stats = await getMovieStatistics(movieId);
      setMovieStats(stats);
    } catch (error) {
      setError(error.message);
    }
  };

  // Функція для отримання статистики за період
  const handleGetPeriodStats = async (startDate, endDate) => {
    try {
      const stats = await getStatisticsByPeriod(startDate, endDate);
      setPeriodStats(stats);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="statistics-page">
      <h1>Статистика</h1>
      {error && <p className="error">{error}</p>}
      <div className="total-stats">
        <h2>Загальна статистика</h2>
        {totalStats ? (
          <div>
            <p>Кількість проданих квитків: {totalStats.ticketCount}</p>
            <p>Кількість сеансів: {totalStats.sessionCount}</p>
            {/* Додаткові статистичні дані */}
          </div>
        ) : (
          <p>Завантаження статистики...</p>
        )}
      </div>

      <div className="movie-stats">
        <h2>Статистика по фільму</h2>
        <button onClick={() => handleGetMovieStats(1)}>
          Отримати статистику по фільму
        </button>
        {movieStats && (
          <div>
            <p>Кількість продажів для фільму: {movieStats.sales}</p>
            <p>Середній рейтинг: {movieStats.rating}</p>
          </div>
        )}
      </div>

      <div className="period-stats">
        <h2>Статистика за період</h2>
        <button
          onClick={() => handleGetPeriodStats("2025-01-01", "2025-04-30")}
        >
          Отримати статистику за період
        </button>
        {periodStats && (
          <div>
            <p>Продажі за період: {periodStats.sales}</p>
            <p>Кількість сеансів: {periodStats.sessions}</p>
          </div>
        )}
      </div>
    </div>
  );
}
