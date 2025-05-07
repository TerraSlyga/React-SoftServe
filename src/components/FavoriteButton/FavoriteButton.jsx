"use client";

import { useState } from "react";
import "./FavoriteButton.css";

const FavoriteButton = ({ movieId, initialIsFavorite = false }) => {
  const [isFavorite, setIsFavorite] = useState(initialIsFavorite);
  const [isLoading, setIsLoading] = useState(false);

  const toggleFavorite = async () => {
    setIsLoading(true);

    try {
      // Тут буде реальний API-запит, коли бекенд буде готовий
      // Наразі просто імітуємо запит з затримкою
      await new Promise((resolve) => setTimeout(resolve, 300));

      setIsFavorite(!isFavorite);

      // Виводимо повідомлення в консоль для демонстрації
      console.log(
        `Фільм ${movieId} ${!isFavorite ? "додано до" : "видалено з"} обраних`
      );
    } catch (error) {
      console.error("Помилка при зміні статусу обраного:", error);
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
        {isFavorite ? "Видалити з обраних" : "Додати до обраних"}
      </span>
    </button>
  );
};

export default FavoriteButton;
