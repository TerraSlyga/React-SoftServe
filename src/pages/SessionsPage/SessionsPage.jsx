import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./SessionsPage.css";
import sessionService from "../../services/sessionService";
import { transformSessions } from "../../utils/transformSessions"; // імпорт функції трансформації сесій

export default function SessionsPage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeDateIndices, setActiveDateIndices] = useState({});

  useEffect(() => {
    loadMovies();
  }, []);

  useEffect(() => {
    if (movies.length > 0) {
      const initialActiveDates = {};
      movies.forEach((movie) => {
        initialActiveDates[movie.id] = 0; // Перша дата активна за замовчуванням
      });
      setActiveDateIndices(initialActiveDates);
    }
  }, [movies]);

  const loadMovies = async () => {
    try {
      setLoading(true);
      // Завантажуємо всі сесії та фільми через sessionService
      const allSessions = await sessionService.getAllSessions();
      const moviesWithSessions = allSessions.map((movie) => ({
        ...movie,
        sessions: transformSessions(movie.sessions), // трансформуємо сесії для кожного фільму
      }));
      console.log(moviesWithSessions);
      setMovies(moviesWithSessions);
    } catch {
      setError("Не вдалося завантажити дані");
    } finally {
      setLoading(false);
    }
  };

  const toggleActiveDate = (movieId, dateIndex) => {
    setActiveDateIndices((prev) => ({
      ...prev,
      [movieId]: prev[movieId] === dateIndex ? -1 : dateIndex,
    }));
  };

  if (loading) return <div>Завантаження...</div>;
  if (error) return <div>{error}</div>;

  return (
    <section className="sessionpage__section">
      <div className="sessions-page">
        <h1 className="sessions-page__title">Ціни та сеанси</h1>
        <div className="sessions-page__content">
          {movies.map((selectedMovie) => (
            <div key={selectedMovie.id} className="sessions-page__container">
              <div className="sessions-page__poster-section">
                <div className="sessions-page__poster">
                  <img
                    src={selectedMovie.posterPath}
                    alt={`Постер фільму ${selectedMovie.title}`}
                  />
                  <div className="sessions-page__title-text">
                    {selectedMovie.title}
                  </div>
                  <div className="sessions-page__rating">
                    Рейтинг {selectedMovie.rating}
                  </div>
                  <div className="sessions-page__button-container">
                    <Link
                      to={`/movies/${selectedMovie.id}`}
                      className="movie-card__button"
                    >
                      Детальніше
                    </Link>
                  </div>
                </div>
              </div>

              <div className="sessions-page__grid">
                <div className="sessions-page__date-headers">
                  {selectedMovie.sessions.map((session, dateIndex) => (
                    <div
                      key={session.date}
                      className={`sessions-page__date-header ${
                        activeDateIndices[selectedMovie.id] === dateIndex
                          ? "active"
                          : ""
                      }`}
                      onClick={() =>
                        toggleActiveDate(selectedMovie.id, dateIndex)
                      }
                    >
                      {session.date}
                    </div>
                  ))}
                </div>

                <div className="sessions-page__desktop-grid">
                  {Array.from({
                    length: Math.max(
                      ...selectedMovie.sessions.map(
                        (session) => session.times.length
                      )
                    ),
                  }).map((_, timeIndex) => (
                    <div
                      key={timeIndex}
                      className="sessions-page__time-price-row"
                    >
                      {selectedMovie.sessions.map((session) => (
                        <div
                          key={session.date}
                          className="sessions-page__time-price-cell"
                        >
                          {session.times[timeIndex] ? (
                            <>
                              <div className="sessions-page__session-time">
                                {session.times[timeIndex].time}
                              </div>
                              <div className="sessions-page__session-price">
                                {session.times[timeIndex].price}
                              </div>
                            </>
                          ) : (
                            <div className="sessions-page__session-empty"></div>
                          )}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>

                <div className="sessions-page__mobile-grid">
                  {selectedMovie.sessions.map((session, dateIndex) => (
                    <div
                      key={session.date}
                      className={`sessions-page__mobile-date-sessions ${
                        activeDateIndices[selectedMovie.id] === dateIndex
                          ? "active"
                          : ""
                      }`}
                    >
                      {session.times.map((timeSlot, timeIndex) => (
                        <div
                          key={timeIndex}
                          className="sessions-page__time-price-cell mobile"
                        >
                          <div className="sessions-page__session-time">
                            {timeSlot.time}
                          </div>
                          <div className="sessions-page__session-price">
                            {timeSlot.price}
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>

                <div className="sessions-page__buy-button-container">
                  <button className="sessions-page__buy-button">
                    Купити квитки
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
