import { Link } from "react-router-dom";
import "./MovieCard.css";

const MovieCard = ({ movie }) => {
  return (
    <Link to={`/movies/${movie.id}`} className="movie-card">
      <div className="movie-card-poster">
        <img
          src={movie.poster || "/placeholder.svg"}
          alt={movie.title}
          className="movie-poster-img"
        />
        <div className="movie-card-rating">
          <span className="rating-star">★</span>
          <span className="rating-value">{movie.rating}</span>
        </div>
      </div>
      <div className="movie-card-info">
        <h3 className="movie-card-title">{movie.title}</h3>
        <p className="movie-card-genre">{movie.genre}</p>
      </div>
    </Link>
  );
};

export default MovieCard;
