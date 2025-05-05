import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MovieCard from "../../components/MovieCard/MovieCard";
import movieService from "../../services/movieService"; // для API
import "/src/pages/HomePage/HomePage.css";
import Slider from "../../components/Slider/Slider"; // Імпорт компонента Slider

export default function HomePage() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    movieService.getAll().then(setMovies);
  }, []);

  return (
    <main className="homepage">
      <Slider />

      <section className="homepage__section">
        <h2 className="homepage__title">Зараз у кіно</h2>
        <div className="homepage__grid">
          {movies.map((movie) => (
            <div key={movie.id} className="homepage__grid-item">
              <MovieCard movie={movie}>
                <Link to={`/movies/${movie.id}`} className="movie-card__button">
                  Детальніше
                </Link>
              </MovieCard>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
