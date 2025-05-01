import "./MovieCard.css";

export default function MovieCard({ movie, children }) {
  return (
    <div className="movie-card">
      <img
        src={movie.poster}
        alt={movie.title}
        className="movie-card__poster"
      />
      <div className="movie-card__info">
        <h3 className="movie-card__title">{movie.title}</h3>
        <p className="movie-card__rating">⭐ {movie.rating}</p>
        <p className="movie-card__desc">{movie.description}</p>
        {children}
      </div>
    </div>
  );
}
