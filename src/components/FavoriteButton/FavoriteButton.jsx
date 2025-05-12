"use client";

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "./FavoriteButton.css";
import movieService from "../../services/movieService";

const FavoriteButton = ({ movieId, initialIsFavorite = false }) => {
  const [isFavorite, setIsFavorite] = useState(initialIsFavorite);
  const [isLoading, setIsLoading] = useState(false);
  const { isLoggedIn, user } = useSelector((state) => state.auth);

  // Отримання статусу обраного при завантаженні компонента
  useEffect(() => {
    const fetchFavoriteStatus = async () => {
      if (!isLoggedIn || !user) return;

      try {
        setIsLoading(true);
        const status = await movieService.isFavorite(user.id, movieId);
        setIsFavorite(status); // Оновлюємо статус
      } catch (error) {
        console.error("Не вдалося завантажити статус обраного:", error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFavoriteStatus();
  }, [isLoggedIn, user, movieId]);

  const toggleFavorite = async () => {
    if (!isLoggedIn || !user) {
      console.warn("Користувач не авторизований");
      return;
    }

    setIsLoading(true);

    try {
      if (isFavorite) {
        await movieService.removeFromFavorites(user.id, movieId);
      } else {
        await movieService.addToFavorites(user.id, movieId);
      }

      setIsFavorite(!isFavorite); // Оновлюємо статус після успішного запиту
    } catch (error) {
      console.error("Помилка при зміні статусу обраного:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      className={`favorite-button ${isFavorite ? "is-favorite" : ""} ${
        isLoading ? "is-loading" : ""
      }`}
      onClick={toggleFavorite}
      disabled={isLoading}
      aria-label={isFavorite ? "Видалити з обраних" : "Додати до обраних"}
    >
      <svg
        className="favorite-icon"
        viewBox="0 0 24 24"
        fill={isFavorite ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
      </svg>
      <span className="favorite-text">
        {isFavorite ? "Видалити" : "Додати до обраних"}
      </span>
    </button>
  );
};

export default FavoriteButton;
