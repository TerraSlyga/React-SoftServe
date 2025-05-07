import "./MovieHeader.css";

const MovieHeader = ({ title, year, poster, description }) => {
  return (
    <div className="movie-header">
      <div className="movie-header-content">
        <div className="movie-header-poster">
          <img
            src={poster || "/placeholder.svg"}
            alt={title}
            className="movie-poster-img"
          />
        </div>
        <div className="movie-header-info">
          <h1 className="movie-title">
            {title} <span className="movie-year">({year})</span>
          </h1>
          <div className="movie-description">{description}</div>
        </div>
      </div>
    </div>
  );
};

export default MovieHeader;
