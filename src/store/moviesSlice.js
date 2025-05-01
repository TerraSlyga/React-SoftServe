import { createSlice } from "@reduxjs/toolkit";

// Початковий стан
const initialState = {
  movies: [], // список фільмів
  status: "idle", // статус запитів (idle, loading, succeeded, failed)
  error: null, // помилки
};

// Створення slice для фільмів
const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    // Додавання фільму
    addMovie: (state, action) => {
      state.movies.push(action.payload);
    },
    // Оновлення фільму
    updateMovie: (state, action) => {
      const index = state.movies.findIndex(
        (movie) => movie.id === action.payload.id
      );
      if (index !== -1) {
        state.movies[index] = action.payload;
      }
    },
    // Видалення фільму
    deleteMovie: (state, action) => {
      state.movies = state.movies.filter(
        (movie) => movie.id !== action.payload
      );
    },
    // Оновлення статусу
    setMoviesStatus: (state, action) => {
      state.status = action.payload;
    },
    // Оновлення помилки
    setMoviesError: (state, action) => {
      state.error = action.payload;
    },
  },
});

// Експортуємо редуктори та дії
export const {
  addMovie,
  updateMovie,
  deleteMovie,
  setMoviesStatus,
  setMoviesError,
} = moviesSlice.actions;

// Створення асинхронних операцій для завантаження фільмів з API (як приклад)
export const fetchMovies = () => async (dispatch) => {
  dispatch(setMoviesStatus("loading"));
  try {
    const response = await fetch("/api/movies");
    const movies = await response.json();
    dispatch(setMoviesStatus("succeeded"));
    dispatch(addMovie(movies));
  } catch (error) {
    dispatch(setMoviesStatus("failed"));
    dispatch(setMoviesError(error.message));
  }
};

// Експортуємо редуктор для використання в store
export default moviesSlice.reducer;
