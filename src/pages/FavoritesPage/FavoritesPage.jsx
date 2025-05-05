import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./FavoritesPage.css";

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  const removeFromFavorites = (id) => {
    const updatedFavorites = favorites.filter((movie) => movie.id !== id);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return (
    <div className="favorites-page">
      <h1>Обрані фільми</h1>

      {favorites.length === 0 ? (
        <p>У вас немає збережених фільмів.</p>
      ) : (
        <div className="movie-grid">
          {favorites.map((movie) => (
            <div key={movie.id} className="movie-card">
              <img src={movie.posterUrl} alt={movie.title} />
              <h3>{movie.title}</h3>
              <p>Рік: {movie.year}</p>
              <p>Рейтинг: {movie.rating}</p>
              <div className="actions">
                <Link to={`/movies/${movie.id}`}>Детальніше</Link>
                <button onClick={() => removeFromFavorites(movie.id)}>
                  Видалити
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
