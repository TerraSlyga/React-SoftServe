import "./TrailerSection.css";

const TrailerSection = ({ trailerId }) => {
  return (
    <div className="trailer-section">
      <h2 className="section-title">Trailer and screenshots</h2>
      <div className="trailer-container">
        <iframe
          title="Трейлер"
          width="100%"
          height="400"
          src={`https://www.youtube.com/embed/${trailerId}`}
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default TrailerSection;
