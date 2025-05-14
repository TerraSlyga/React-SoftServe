import { useState } from "react";
import { useNavigate } from "react-router-dom";
import movieService from "../../../services/movieService";
import GenresManager from "./GenresManager";
import ActorsManager from "./ActorsManager";
import ScreenshotsManager from "./ScreenshotsManager";
import "./ManageMoviesPage.css";

export default function ManageMoviesPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    releaseDate: "",
    genres: [],
    rating: "",
    posterPath: "",
    trailerId: "",
    language: "",
    duration: "",
    ageRating: "",
    actors: [],
    screenshots: [],
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!form.title || !form.description || !form.releaseDate) {
      setError("Будь ласка, заповніть всі обов'язкові поля");
      return;
    }

    const preparedForm = {
      ...form,
      rating: parseFloat(form.rating),
      duration: parseInt(form.duration, 10),
    };

    if (form.id) {
      movieService.updateMovie(preparedForm);
    } else {
      movieService.createMovie(preparedForm);
    }

    navigate("/admin/movies");
  };

  return (
    <div className="manage-movies">
      <h1>{form.id ? "Редагувати фільм" : "Додати фільм"}</h1>
      <form onSubmit={handleSubmit}>
        <div className="movie-manager">
          <input
            type="text"
            name="title"
            placeholder="Назва фільму"
            value={form.title}
            onChange={handleChange}
          />
          <textarea
            name="description"
            placeholder="Опис фільму"
            value={form.description}
            onChange={handleChange}
          />
          <input
            type="datetime-local"
            name="releaseDate"
            value={form.releaseDate}
            onChange={handleChange}
          />
          <input
            type="number"
            name="rating"
            step="0.1"
            placeholder="Рейтинг"
            value={form.rating}
            onChange={handleChange}
          />
          <input
            type="text"
            name="posterPath"
            placeholder="URL постера"
            value={form.posterPath}
            onChange={handleChange}
          />
          <input
            type="text"
            name="trailerId"
            placeholder="YouTube ID трейлера"
            value={form.trailerId}
            onChange={handleChange}
          />
          <input
            type="text"
            name="language"
            placeholder="Мова"
            value={form.language}
            onChange={handleChange}
          />
          <input
            type="number"
            name="duration"
            placeholder="Тривалість (хв)"
            value={form.duration}
            onChange={handleChange}
          />
          <input
            type="text"
            name="ageRating"
            placeholder="Вікове обмеження (наприклад, 16+)"
            value={form.ageRating}
            onChange={handleChange}
          />
        </div>
        <GenresManager
          genres={form.genres}
          setGenres={(genres) => setForm((prev) => ({ ...prev, genres }))}
        />
        <ActorsManager
          actors={form.actors}
          setActors={(actors) => setForm((prev) => ({ ...prev, actors }))}
        />
        <ScreenshotsManager
          screenshots={form.screenshots}
          setScreenshots={(screenshots) =>
            setForm((prev) => ({ ...prev, screenshots }))
          }
        />
        <div className="movie-manager__btn">
          <h3>Додати фільм</h3>
          {error && <p className="error">{error}</p>}
          <button type="submit">
            {form.id ? "Зберегти зміни" : "Додати фільм"}
          </button>
            <button
              type="button"
              className="delete-button"

              onClick={() => {
                if (
                  window.confirm("Ви впевнені, що хочете видалити цей фільм?")
                ) {
                  movieService.deleteMovie(form.id).then(() => {
                    navigate("/admin/movies");
                  });
                }
              }}
            >
              Видалити фільм
            </button>
        </div>
      </form>
    </div>
  );
}
