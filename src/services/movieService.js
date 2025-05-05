import axios from "axios";

const BASE_URL = "http://localhost:8080/api"; // Заміни на реальний URL твоєї бекенд-системи

const movieService = {
  /**
   * Отримати всі фільми.
   * @returns {Promise<Array>} Масив фільмів.
   */
  async getAll() {
    try {
      const response = await axios.get(`${BASE_URL}/movies`);
      return response.data;
    } catch (error) {
      console.error("Помилка при завантаженні фільмів:", error);
      throw new Error("Не вдалося отримати фільми");
    }
  },

  /**
   * Отримати фільм за ID.
   * @param {string} id Ідентифікатор фільму.
   * @returns {Promise<Object>} Дані фільму.
   */
  async getMovieById(id) {
    try {
      const response = await axios.get(`${BASE_URL}/movies/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Помилка при завантаженні фільму з ID ${id}:`, error);
      throw new Error("Не вдалося отримати деталі фільму");
    }
  },

  /**
   * Отримати всі фільми за критеріями.
   * @param {Object} filters Фільтри для пошуку фільмів (наприклад, жанр, рік, рейтинг).
   * @returns {Promise<Array>} Масив фільмів.
   */
  async searchMovies(filters) {
    try {
      const { genre, year, rating } = filters;
      const response = await axios.get(`${BASE_URL}/movies/search`, {
        params: { genre, year, rating },
      });
      return response.data;
    } catch (error) {
      console.error("Помилка при пошуку фільмів:", error);
      throw new Error("Не вдалося виконати пошук");
    }
  },

  /**
   * Додати фільм до обраних.
   * @param {string} userId Ідентифікатор користувача.
   * @param {string} movieId Ідентифікатор фільму.
   * @returns {Promise<void>} Повертає нічого.
   */
  async addToFavorites(userId, movieId) {
    try {
      const response = await axios.post(
        `${BASE_URL}/users/${userId}/favorites`,
        { movieId }
      );
      return response.data;
    } catch (error) {
      console.error("Помилка при додаванні фільму до обраних:", error);
      throw new Error("Не вдалося додати фільм до обраних");
    }
  },

  /**
   * Отримати обрані фільми користувача.
   * @param {string} userId Ідентифікатор користувача.
   * @returns {Promise<Array>} Масив обраних фільмів.
   */
  async getFavorites(userId) {
    try {
      const response = await axios.get(`${BASE_URL}/users/${userId}/favorites`);
      return response.data;
    } catch (error) {
      console.error("Помилка при завантаженні обраних фільмів:", error);
      throw new Error("Не вдалося отримати обрані фільми");
    }
  },

  /**
   * Видалити фільм з обраних.
   * @param {string} userId Ідентифікатор користувача.
   * @param {string} movieId Ідентифікатор фільму.
   * @returns {Promise<void>} Повертає нічого.
   */
  async removeFromFavorites(userId, movieId) {
    try {
      const response = await axios.delete(
        `${BASE_URL}/users/${userId}/favorites/${movieId}`
      );
      return response.data;
    } catch (error) {
      console.error("Помилка при видаленні фільму з обраних:", error);
      throw new Error("Не вдалося видалити фільм з обраних");
    }
  },
};

export default movieService;
