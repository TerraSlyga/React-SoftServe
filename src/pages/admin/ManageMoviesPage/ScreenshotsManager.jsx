export default function ScreenshotsManager({ screenshots, setScreenshots }) {
  const handleChange = (index, value) => {
    const updated = [...screenshots];
    updated[index] = { ...updated[index], url: value };
    setScreenshots(updated);
  };

  const addScreenshot = () => {
    setScreenshots([...screenshots, { url: "" }]);
  };

  const removeScreenshot = (index) => {
    const updated = screenshots.filter((_, i) => i !== index);
    setScreenshots(updated);
  };

  return (
    <div className="screenshots-manager">
      <h3>Скріншоти</h3>
      {screenshots.map((screenshot, index) => (
        <div key={screenshot.id || index}>
          <input
            type="text"
            placeholder="URL скріншота"
            value={screenshot.url}
            onChange={(e) => handleChange(index, e.target.value)}
          />
          <button type="button" onClick={() => removeScreenshot(index)}>
            Видалити
          </button>
        </div>
      ))}
      <button type="button" onClick={addScreenshot}>
        Додати скріншот
      </button>
    </div>
  );
}
