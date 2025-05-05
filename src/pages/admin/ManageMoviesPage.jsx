import { useState } from "react";
import { useDispatch } from "react-redux";
import { addMovie, updateMovie } from "../../store/moviesSlice"; // Реалізуй ці дії у Slice

export default function ManageMoviesPage() {
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    title: "",
    description: "",
    releaseYear: "",
    genre: "",
    rating: "",
    poster: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!form.title || !form.description) {
      setError("Будь ласка, заповніть всі обов'язкові поля");
      return;
    }

    // Визначаємо, чи додати чи редагувати фільм
    if (form.id) {
      dispatch(updateMovie(form));
    } else {
      dispatch(addMovie(form));
    }
  };

  return (
    <div className="manage-movies">
      <h1>{form.id ? "Редагувати фільм" : "Додати фільм"}</h1>
      <form onSubmit={handleSubmit}>
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
          type="text"
          name="releaseYear"
          placeholder="Рік випуску"
          value={form.releaseYear}
          onChange={handleChange}
        />
        <input
          type="text"
          name="genre"
          placeholder="Жанр"
          value={form.genre}
          onChange={handleChange}
        />
        <input
          type="number"
          name="rating"
          placeholder="Рейтинг"
          value={form.rating}
          onChange={handleChange}
        />
        <input
          type="text"
          name="poster"
          placeholder="URL постера"
          value={form.poster}
          onChange={handleChange}
        />
        {error && <p className="error">{error}</p>}
        <button type="submit">
          {form.id ? "Зберегти зміни" : "Додати фільм"}
        </button>
      </form>
    </div>
  );
}
