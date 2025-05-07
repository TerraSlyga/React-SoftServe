import "./MovieInfo.css";

const MovieInfo = ({ movie }) => {
  return (
    <div className="movie-info">
      <div className="movie-info-item">
        <span className="info-label">Рік виходу:</span>
        <span className="info-value">{movie.year}</span>
      </div>

      <div className="movie-info-item">
        <span className="info-label">Жанр:</span>
        <span className="info-value">{movie.genre}</span>
      </div>

      <div className="movie-info-item">
        <span className="info-label">Режисер:</span>
        <span className="info-value">{movie.director}</span>
      </div>

      <div className="movie-info-item">
        <span className="info-label">Рейтинг поки що:</span>
        <span className="info-value">{movie.rating} / 10</span>
      </div>

      <div className="movie-info-item">
        <span className="info-label">Вік:</span>
        <span className="info-value">{movie.ageRating || "0+"}</span>
      </div>

      <div className="movie-info-item">
        <span className="info-label">Мова дубляжу:</span>
        <span className="info-value">{movie.language || "українська"}</span>
      </div>

      <div className="movie-info-item">
        <span className="info-label">Тривалість:</span>
        <span className="info-value">{movie.duration || "90"} хв</span>
      </div>
    </div>
  );
};

export default MovieInfo;
