import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./FavoritesPage.css";
import MovieCard from "../../components/MovieCard/MovieCard";
import RemoveFromFavoritesWrapper from "../../components/RemoveFromFavoritesWrapper/RemoveFromFavoritesWrapper";
import movieService from "../../services/movieService"; // для API
import { useSelector } from "react-redux";

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);
  const { isLoggedIn, user } = useSelector((state) => state.auth);

  useEffect(() => {
    movieService.getFavorites(user.id).then(setFavorites);
  }, []);

  const removeFromFavorites = (id) => {
    const updatedFavorites = favorites.filter((movie) => movie.id !== id);
    setFavorites(updatedFavorites);
  };

  return (
    <section className="favoritespage__section">
      <div className="favoritespage__wrapper">
        <h1>Обрані фільми</h1>

        {favorites.length === 0 ? (
          <p>У вас немає збережених фільмів.</p>
        ) : (
          <div className="favoritespage__grid">
            {favorites.map((movie) => (
              <MovieCard key={movie.id} movie={movie}>
                <div className="favoritespage__grid-item">
                  <Link
                    to={`/movies/${movie.id}`}
                    className="movie-card__button"
                  >
                    Детальніше
                  </Link>
                  <RemoveFromFavoritesWrapper
                    movieId={movie.id}
                    onRemove={removeFromFavorites}
                  />
                </div>
              </MovieCard>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
