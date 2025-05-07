import "./CastSection.css";

const CastSection = ({ actors }) => {
  return (
    <div className="cast-section">
      <h2 className="section-title">У головних ролях</h2>
      <div className="cast-list">
        {actors.map((actor, index) => (
          <div key={index} className="cast-item">
            <div className="actor-image-container">
              {actor.photo ? (
                <img
                  src={actor.photo || "/placeholder.svg"}
                  alt={actor.name}
                  className="actor-image"
                />
              ) : (
                <div className="actor-placeholder">
                  <span>actor{index + 1}</span>
                </div>
              )}
            </div>
            <div className="actor-name">{actor.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CastSection;
