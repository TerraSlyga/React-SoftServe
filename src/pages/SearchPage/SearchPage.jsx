import { useState } from "react";
import { useNavigate } from "react-router-dom";
import movieService from "../../services/movieService"; // Підключаємо movieService для запитів до API
import "./SearchPage.css";

export default function SearchPage() {
  const [query, setQuery] = useState({
    title: "",
    genre: "",
    year: "",
    rating: "",
  });
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // Обробник для введення пошукового запиту
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setQuery((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Обробник для виконання пошуку
  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const data = await movieService.searchMovies(query);
      setResults(data);
    } catch (err) {
      setError("Помилка при пошуку фільмів");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-page">
      <h1>Пошук фільмів</h1>

      {/* Форма пошуку */}
      <form onSubmit={handleSearch} className="search-form">
        <div className="form-group">
          <label htmlFor="title">Назва фільму:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={query.title}
            onChange={handleInputChange}
            placeholder="Назва фільму"
          />
        </div>

        <div className="form-group">
          <label htmlFor="genre">Жанр:</label>
          <input
            type="text"
            id="genre"
            name="genre"
            value={query.genre}
            onChange={handleInputChange}
            placeholder="Жанр"
          />
        </div>

        <div className="form-group">
          <label htmlFor="year">Рік:</label>
          <input
            type="text"
            id="year"
            name="year"
            value={query.year}
            onChange={handleInputChange}
            placeholder="Рік"
          />
        </div>

        <div className="form-group">
          <label htmlFor="rating">Рейтинг:</label>
          <input
            type="text"
            id="rating"
            name="rating"
            value={query.rating}
            onChange={handleInputChange}
            placeholder="Рейтинг"
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Шукаю..." : "Пошук"}
        </button>
      </form>

      {/* Якщо є помилка */}
      {error && <div className="error-message">{error}</div>}

      {/* Якщо є результати пошуку */}
      <div className="search-results">
        {results.length > 0 ? (
          <div className="movie-list">
            {results.map((movie) => (
              <div key={movie.id} className="movie-card">
                <img
                  src={movie.poster}
                  alt={movie.title}
                  className="movie-poster"
                  onClick={() => navigate(`/movies/${movie.id}`)} // Перехід на сторінку фільму
                />
                <div className="movie-info">
                  <h3>{movie.title}</h3>
                  <p>{movie.year}</p>
                  <p>Рейтинг: {movie.rating}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>Фільми не знайдено</div>
        )}
      </div>
    </div>
  );
}
