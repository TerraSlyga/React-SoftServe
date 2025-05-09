import { useState, useEffect } from "react";
import Select from "react-select";
import movieService from "../../../services/movieService";

export default function GenresManager({ genres, setGenres }) {
  const [availableGenres, setAvailableGenres] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadGenres = async () => {
      setLoading(true);
      try {
        const data = await movieService.getAllGenres();
        const options = data.map((g) => ({
          value: g.genre,
          label: g.genre,
          id: g.id,
        }));
        setAvailableGenres(options);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadGenres();
  }, []);

  const handleGenreChange = (selectedOptions) => {
    setGenres(
      selectedOptions.map((opt) => ({
        id: opt.id,
        genre: opt.value,
      }))
    );
  };

  const selectedOptions = genres.map((g) => ({
    value: g.genre,
    label: g.genre,
    id: g.id,
  }));

  return (
    <div className="genres-manager">
      <h3>Жанри</h3>
      {loading && <p>Завантаження жанрів...</p>}
      {error && <p className="error">{error}</p>}

      {!loading && !error && (
        <Select
          classNamePrefix="react-select"
          isMulti
          options={availableGenres}
          value={selectedOptions}
          onChange={handleGenreChange}
          placeholder="Оберіть жанри..."
        />
      )}
    </div>
  );
}
