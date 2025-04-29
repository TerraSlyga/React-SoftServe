import { Link } from "react-router-dom";

export default function MovieCard({ movie }) {
  return (
    <div className="card bg-dark text-white h-100">
      <Link to={`/movies/${movie.id}`}>
        <img src={movie.posterUrl} className="card-img-top" alt={movie.title} />
      </Link>
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{movie.title}</h5>
        <p className="card-text">Рік: {movie.year}</p>
        <p className="card-text">⭐ {movie.rating}</p>
        <Link to={`/movies/${movie.id}`} className="btn btn-primary mt-auto">
          Детальніше
        </Link>
      </div>
    </div>
  );
}
