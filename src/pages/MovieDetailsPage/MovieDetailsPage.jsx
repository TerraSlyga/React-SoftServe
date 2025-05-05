import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import movieService from "../../services/movieService"; // Реалізувати запит до API для фільмів
import "./MovieDetailsPage.css";

export default function MovieDetailsPage() {
  const { id } = useParams(); // Отримуємо id фільму з URL
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        // Замість mock, тут буде реальний запит
        const movieData = await movieService.getMovieById(id);
        setMovie(movieData);
      } catch (error) {
        console.error("Помилка при завантаженні фільму:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  if (loading) return <div>Завантаження...</div>;

  if (!movie) return <div>Фільм не знайдено.</div>;

  return (
    <div className="movie-details">
      <div className="movie-details__poster">
        <img src={movie.poster} alt={movie.title} />
      </div>

      <div className="movie-details__info">
        <h1>
          {movie.title} ({movie.year})
        </h1>
        <p>
          <strong>Жанр:</strong> {movie.genre}
        </p>
        <p>
          <strong>Рейтинг:</strong> ⭐ {movie.rating}
        </p>
        <p>
          <strong>Опис:</strong> {movie.description}
        </p>

        <h3>Актори:</h3>
        <ul>
          {movie.actors.map((actor, index) => (
            <li key={index}>{actor}</li>
          ))}
        </ul>

        <div className="movie-details__trailer">
          <h3>Трейлер:</h3>
          <iframe
            title="Трейлер"
            width="100%"
            height="400"
            src={`https://www.youtube.com/embed/${movie.trailerId}`}
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>

        <button className="movie-details__favorite-button">
          Додати до Обраних
        </button>
      </div>
    </div>
  );
}
