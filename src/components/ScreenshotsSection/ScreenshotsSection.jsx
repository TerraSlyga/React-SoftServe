import "./ScreenshotsSection.css";

const ScreenshotsSection = ({ screenshots }) => {
  // Якщо немає скріншотів, створюємо заглушки
  const screenshotsToShow =
    screenshots.length > 0
      ? screenshots
      : Array(6).fill({ url: null, alt: "Screenshot placeholder" });

  return (
    <div className="screenshots-section">
      <h2 className="section-title">Скріншоти з фільму</h2>
      <div className="screenshots-grid">
        {screenshotsToShow.map((screenshot, index) => (
          <div key={index} className="screenshot-item">
            {screenshot.url ? (
              <img
                src={screenshot.url || "/placeholder.svg"}
                alt={screenshot.alt || `Screenshot ${index + 1}`}
                className="screenshot-image"
              />
            ) : (
              <div className="screenshot-placeholder">
                <span>Screenshot {index + 1}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScreenshotsSection;
