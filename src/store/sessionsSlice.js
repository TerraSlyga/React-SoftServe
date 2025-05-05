import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Базовий URL для API
const API_URL = "http://your-api-url.com/api/sessions";

// Асинхронні дії для роботи з сеансами
// Завантажити всі сеанси
export const fetchSessions = createAsyncThunk(
  "sessions/fetchSessions",
  async () => {
    const response = await axios.get(API_URL);
    return response.data;
  }
);

// Додати новий сеанс
export const addSession = createAsyncThunk(
  "sessions/addSession",
  async (newSession) => {
    const response = await axios.post(API_URL, newSession);
    return response.data;
  }
);

// Видалити сеанс
export const deleteSession = createAsyncThunk(
  "sessions/deleteSession",
  async (sessionId) => {
    await axios.delete(`${API_URL}/${sessionId}`);
    return sessionId; // Повертаємо ID сеансу для видалення
  }
);

// Слайс для сеансів
const sessionsSlice = createSlice({
  name: "sessions",
  initialState: {
    sessions: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // Завантаження сеансів
    builder
      .addCase(fetchSessions.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSessions.fulfilled, (state, action) => {
        state.loading = false;
        state.sessions = action.payload;
      })
      .addCase(fetchSessions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Додавання нового сеансу
      .addCase(addSession.pending, (state) => {
        state.loading = true;
      })
      .addCase(addSession.fulfilled, (state, action) => {
        state.loading = false;
        state.sessions.push(action.payload);
      })
      .addCase(addSession.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Видалення сеансу
      .addCase(deleteSession.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteSession.fulfilled, (state, action) => {
        state.loading = false;
        state.sessions = state.sessions.filter(
          (session) => session.id !== action.payload
        );
      })
      .addCase(deleteSession.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// Експортуємо асинхронні функції
//export { fetchSessions, addSession, deleteSession };
// Експортуємо редуктор
export default sessionsSlice.reducer;
