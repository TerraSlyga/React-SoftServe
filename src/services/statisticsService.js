import axios from "axios";

// Базовий URL для API
const BASE_URL = "/api/statistics";

// Функція для отримання загальної статистики
export const getTotalStatistics = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/total`);
    return response.data; // Повертаємо дані статистики
  } catch (error) {
    throw new Error("Не вдалося отримати загальну статистику.");
  }
};

// Функція для отримання статистики по фільмам
export const getMovieStatistics = async (movieId) => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/${movieId}`);
    return response.data; // Повертаємо статистику по конкретному фільму
  } catch (error) {
    throw new Error("Не вдалося отримати статистику по фільму.");
  }
};

// Функція для отримання статистики по періоду
export const getStatisticsByPeriod = async (startDate, endDate) => {
  try {
    const response = await axios.get(`${BASE_URL}/period`, {
      params: { startDate, endDate },
    });
    return response.data; // Повертаємо статистику по періоду
  } catch (error) {
    throw new Error("Не вдалося отримати статистику за період.");
  }
};
