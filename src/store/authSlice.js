import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../services/authService";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, thunkAPI) => {
    try {
      const data = await authService.login(credentials);
      return {
        token: data.token, // Токен
        user: data.user, //Юзер
      };
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message || "Помилка входу");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null,
    token: localStorage.getItem("token") || null,
    loading: false,
    error: null,
    isLoggedIn: !!localStorage.getItem("token"),
    role: localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user")).role
      : null, // Витягуємо роль
  },
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      state.isLoggedIn = false;
      state.role = null; // Скидаємо роль при логауті
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        const { token, user } = action.payload;
        state.loading = false;
        state.token = token;
        state.user = user;
        state.isLoggedIn = true;
        state.role = user.role; // Отримуємо роль з user.role

        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user)); // Зберігаємо user як JSON-рядок
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Помилка входу";
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
