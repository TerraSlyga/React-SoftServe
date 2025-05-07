import "./MovieCard.css";

export default function MovieCard({ movie, children }) {
  return (
    <div className="homepage__grid-item">
      <div className="movie-card">
        <div
          className="movie-card__poster-placeholder"
          style={{ backgroundImage: `url(${movie.poster})` }}
        />
        <div className="movie-card__info">
          <h3 className="movie-card__title">{movie.title}</h3>
          <p className="movie-card__rating">★ {movie.rating}/10</p>
          <p className="movie-card__desc">{movie.description}</p>
          <div className="movie-card__button-container">{children}</div>
        </div>
      </div>
    </div>
  );
}
