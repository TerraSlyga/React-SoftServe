import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./FavoritesPage.css";
import MovieCard from "../../components/MovieCard/MovieCard";
import RemoveFromFavoritesWrapper from "../../components/RemoveFromFavoritesWrapper/RemoveFromFavoritesWrapper";

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    // Тимчасові дані з двома фільмами
    const demoFavorites = [
      {
        id: "1",
        title: "Minecraft: Фільм",
        year: "2025",
        genre: "Пригоди, Фентезі, Комедія, Сімейний",
        director: "Джаред Гесс",
        rating: "8.5",
        description:
          "Четверо недавніх знайомців опиняються у чарівному кубічному світі, де все має кутову форму. Це місце називається Верхній світ і своїх їх затягло через таємний портал. Гаррет (Джейсон Момоа), Генрі (Джек Блек), Наташа (Дженніфер Куліджі) та Кеті (Даніель Брукс) нічого про покращення форму, але Норм (Джейсон Момоа) нічого не стається. Їм доводиться опанувати місцеві правила існування.",
        poster:
          "https://cdn.planetakino.ua/4612_minecraft_2025/Media/Posters/vertical/52d15a99-deab-48c6-9512-8af553e41a5b.jpg",
        trailerId: "8B1EtVPBSMw", // ID відео з YouTube
        language: "українська",
        duration: "103",
        ageRating: "0+",
      },
      {
        id: "2",
        title: "Minecraft: Фільм",
        year: "2025",
        genre: "Пригоди, Фентезі, Комедія, Сімейний",
        director: "Джаред Гесс",
        rating: "8.5",
        description:
          "Четверо недавніх знайомців опиняються у чарівному кубічному світі, де все має кутову форму. Це місце називається Верхній світ і своїх їх затягло через таємний портал. Гаррет (Джейсон Момоа), Генрі (Джек Блек), Наташа (Дженніфер Куліджі) та Кеті (Даніель Брукс) нічого про покращення форму, але Норм (Джейсон Момоа) нічого не стається. Їм доводиться опанувати місцеві правила існування.",
        poster:
          "https://cdn.planetakino.ua/4612_minecraft_2025/Media/Posters/vertical/52d15a99-deab-48c6-9512-8af553e41a5b.jpg",
        trailerId: "8B1EtVPBSMw", // ID відео з YouTube
        language: "українська",
        duration: "103",
        ageRating: "0+",
      },
      {
        id: "3",
        title: "Minecraft: Фільм",
        year: "2025",
        genre: "Пригоди, Фентезі, Комедія, Сімейний",
        director: "Джаред Гесс",
        rating: "8.5",
        description:
          "Четверо недавніх знайомців опиняються у чарівному кубічному світі, де все має кутову форму. Це місце називається Верхній світ і своїх їх затягло через таємний портал. Гаррет (Джейсон Момоа), Генрі (Джек Блек), Наташа (Дженніфер Куліджі) та Кеті (Даніель Брукс) нічого про покращення форму, але Норм (Джейсон Момоа) нічого не стається. Їм доводиться опанувати місцеві правила існування.",
        poster:
          "https://cdn.planetakino.ua/4612_minecraft_2025/Media/Posters/vertical/52d15a99-deab-48c6-9512-8af553e41a5b.jpg",
        trailerId: "8B1EtVPBSMw", // ID відео з YouTube
        language: "українська",
        duration: "103",
        ageRating: "0+",
      },
      {
        id: "4",
        title: "Minecraft: Фільм",
        year: "2025",
        genre: "Пригоди, Фентезі, Комедія, Сімейний",
        director: "Джаред Гесс",
        rating: "8.5",
        description:
          "Четверо недавніх знайомців опиняються у чарівному кубічному світі, де все має кутову форму. Це місце називається Верхній світ і своїх їх затягло через таємний портал. Гаррет (Джейсон Момоа), Генрі (Джек Блек), Наташа (Дженніфер Куліджі) та Кеті (Даніель Брукс) нічого про покращення форму, але Норм (Джейсон Момоа) нічого не стається. Їм доводиться опанувати місцеві правила існування.",
        poster:
          "https://cdn.planetakino.ua/4612_minecraft_2025/Media/Posters/vertical/52d15a99-deab-48c6-9512-8af553e41a5b.jpg",
        trailerId: "8B1EtVPBSMw", // ID відео з YouTube
        language: "українська",
        duration: "103",
        ageRating: "0+",
      },
    ];

    setFavorites(demoFavorites);
  }, []);

  const removeFromFavorites = (id) => {
    const updatedFavorites = favorites.filter((movie) => movie.id !== id);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return (
    <section className="favoritespage__section">
      <div className="favoritespage__wrapper">
        <h1>Обрані фільми</h1>

        {favorites.length === 0 ? (
          <p>У вас немає збережених фільмів.</p>
        ) : (
          <div className="favoritespage__grid">
            {favorites.map((movie) => (
              <MovieCard key={movie.id} movie={movie}>
                <div className="favoritespage__grid-item">
                  <Link
                    to={`/movies/${movie.id}`}
                    className="movie-card__button"
                  >
                    Детальніше
                  </Link>
                  <RemoveFromFavoritesWrapper
                    movieId={movie.id}
                    onRemove={removeFromFavorites}
                  />
                </div>
              </MovieCard>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
