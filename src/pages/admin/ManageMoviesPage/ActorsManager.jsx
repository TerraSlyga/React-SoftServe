import { useState, useEffect } from "react";
import Select from "react-select";
import movieService from "../../../services/movieService";

export default function ActorsManager({ actors, setActors }) {
  const [availableActors, setAvailableActors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [newActor, setNewActor] = useState("");

  useEffect(() => {
    const loadActors = async () => {
      setLoading(true);
      try {
        const data = await movieService.getAllActors();
        const options = data.map((actor) => ({
          value: actor.name,
          label: actor.name,
          id: actor.id,
        }));
        setAvailableActors(options);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadActors();
  }, []);

  const handleChange = (selectedOptions) => {
    setActors(
      selectedOptions.map((opt) => ({
        id: opt.id,
        name: opt.value,
      }))
    );
  };

  const selectedOptions = actors.map((a) => ({
    value: a.name,
    label: a.name,
    id: a.id,
  }));

  return (
    <div className="actors-manager">
      <h3>Актори</h3>
      {loading && <p>Завантаження акторів...</p>}
      {error && <p className="error">{error}</p>}

      {!loading && !error && (
        <>
          <Select
            classNamePrefix="react-select"
            isMulti
            options={availableActors}
            value={selectedOptions}
            onChange={handleChange}
            placeholder="Оберіть акторів..."
          />
        </>
      )}
    </div>
  );
}
