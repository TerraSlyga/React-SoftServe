import { use, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import movieService from "../../services/movieService";
import "./SearchPage.css";
import MovieCard from "../../components/MovieCard/MovieCard";
import { Link } from "react-router-dom";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import findIcon from "/src/assets/icons8.svg";

export default function SearchPage() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [genre, setGenre] = useState([]);

  const [query, setQuery] = useState({
    title: "",
    genre: [],
    yearRange: [1950, 2025],
    ratingRange: [0, 10],
  });

  useEffect(() => {
    movieService.getAll().then(setResults);
    movieService.getAllGenres().then(setGenre);
  }, []);

  const handleInputChange = (e) => {
    const { name, value, options } = e.target;

    if (name === "genre") {
      const selectedGenres = Array.from(options)
        .filter((option) => option.selected)
        .map((option) => option.value);

      setQuery((prevState) => ({
        ...prevState,
        genre: selectedGenres,
      }));
    } else {
      setQuery((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const filteredMovies = await movieService.searchMovies(query);
      console.log(filteredMovies);
      setResults(filteredMovies);
    } catch (err) {
      setError("Помилка при пошуку фільмів");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-page">
      <h1>Пошук фільмів</h1>

      <div className="search-page__wrapper">
        <form onSubmit={handleSearch} className="search-form">
          <div className="form-group__wrapper">
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
          </div>

          <div className="form-group">
            <label className="searchpage__genre">Жанри:</label>
            <div className="genre-tags">
              {genre.map((g) => (
                <button
                  type="button"
                  key={g.genre}
                  className={`genre-tag ${
                    query.genre.includes(g.genre) ? "active" : ""
                  }`}
                  onClick={() => {
                    const alreadySelected = query.genre.includes(g.genre);
                    setQuery((prevState) => ({
                      ...prevState,
                      genre: alreadySelected
                        ? prevState.genre.filter((item) => item !== g.genre)
                        : [...prevState.genre, g.genre],
                    }));
                  }}
                >
                  {g.genre}
                </button>
              ))}
            </div>
          </div>

          {/* 🎯 Діапазон років */}
          <div className="form-group">
            <label>Оберіть рік:</label>
            <div className="year-range-labels">
              <span>{query.yearRange[0]}</span>
              <span>{query.yearRange[1]}</span>
            </div>
            <Slider
              range
              min={1950}
              max={2025}
              step={1}
              value={query.yearRange}
              allowCross={false}
              onChange={(value) =>
                setQuery((prev) => ({
                  ...prev,
                  yearRange: value,
                }))
              }
            />
          </div>

          {/* 🌟 Діапазон рейтингу */}
          <div className="form-group">
            <label>Оберіть рейтинг:</label>
            <div className="year-range-labels">
              <span>{query.ratingRange[0].toFixed(1)}</span>
              <span>{query.ratingRange[1].toFixed(1)}</span>
            </div>
            <Slider
              range
              min={0}
              max={10}
              step={0.1}
              value={query.ratingRange}
              allowCross={false}
              onChange={(value) =>
                setQuery((prev) => ({
                  ...prev,
                  ratingRange: value,
                }))
              }
            />
          </div>

          <button type="submit" className="search-button">
            <img src={findIcon} className="form-group__img" alt="search" />
          </button>
        </form>

        <div className="search-results">
          {results.length > 0 ? (
            <div className="searchpage__grid">
              {results.map((movie) => (
                <div key={movie.id} className="searchpage__grid-item">
                  <MovieCard movie={movie}>
                    <Link
                      to={`/movies/${movie.id}`}
                      className="movie-card__button"
                    >
                      Детальніше
                    </Link>
                  </MovieCard>
                </div>
              ))}
            </div>
          ) : (
            <div>Фільми не знайдено</div>
          )}
        </div>
      </div>
    </div>
  );
}
