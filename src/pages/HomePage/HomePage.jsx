import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MovieCard from "../../components/MovieCard/MovieCard";
import movieService from "../../services/movieService"; // для API

export default function HomePage() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    movieService.getAll().then(setMovies);
  }, []);

  return (
    <div className="homepage">
      <h1>Актуальні фільми</h1>
      <div className="movies-grid">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie}>
            <Link to={`/movies/${movie.id}`} className="movie-card__button">
              Детальніше
            </Link>
          </MovieCard>
        ))}
      </div>
    </div>
  );
}
