"use client";

import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import movieService from "../../services/movieService";
import MovieHeader from "../../components/MovieHeader/MovieHeader";
import MovieInfo from "../../components/MovieInfo/MovieInfo";
import CastSection from "../../components/CastSection/CastSection";
import TrailerSection from "../../components/TrailerSection/TrailerSection";
import ScreenshotsSection from "../../components/ScreenshotsSection/ScreenshotsSection";
import BuyTicketButton from "../../components/BuyTicketButton/BuyTicketButton";
import FavoriteButton from "../../components/FavoriteButton/FavoriteButton";
import { mockMovie } from "../../mocks/movieMock"; // Імпортуємо мок-дані
import "./MovieDetailsPage.css";
import { useSelector } from "react-redux";

// Тимчасовий прапорець для використання мок-даних
const USE_MOCK_DATA = false;

export default function MovieDetailsPage() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const { user, isLoggedIn } = useSelector((state) => state.auth);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Встановлюємо початковий стан
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        if (USE_MOCK_DATA) {
          // Використовуємо мок-дані замість API-запиту
          setTimeout(() => {
            setMovie(mockMovie);
            setLoading(false);
          }, 0); // Невелика затримка для імітації запиту
        } else {
          // Реальний API-запит
          const movieData = await movieService.getMovieById(id);
          setMovie(movieData);
          setLoading(false);
        }
      } catch (error) {
        console.error("Помилка при завантаженні фільму:", error);
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  if (loading) return <div className="loading-container">Завантаження...</div>;

  if (!movie) return <div className="error-container">Фільм не знайдено.</div>;

  return (
    <div className="movie-details-container">
      <div className="movie-details-content">
        <div className="movie-details-wrapper">
          <MovieHeader
            title={movie.title}
            year={new Date(movie.releaseDate).getFullYear()}
            poster={movie.posterPath}
            description={movie.description}
          />

          <MovieInfo movie={movie} />

          <div className="movie-actions">
            {user.role === "admin" && (
              <Link to={`/admin/movies/${movie.id}`} className="edit-button">
                Редагувати фільм
              </Link>
            )}
            {isLoggedIn && (
              <div className="">
                <FavoriteButton movieId={movie.id} />
              </div>
            )}
          </div>
          <div className="movie-details-sections">
            {isMobile ? (
              // Мобільний порядок: трейлер і скріншоти, потім актори
              <>
                <div className="movie-details-section">
                  <TrailerSection trailerId={movie.trailerId} />
                </div>
                <div className="movie-details-section">
                  <ScreenshotsSection screenshots={movie.screenshots || []} />
                </div>
                <div className="movie-details-section">
                  <CastSection actors={movie.actors} />
                </div>
              </>
            ) : (
              // Десктопний порядок: актори зліва, трейлер і скріншоти справа
              <>
                <div className="movie-details-left-column">
                  <CastSection actors={movie.actors} />
                </div>
                <div className="movie-details-right-column">
                  <TrailerSection trailerId={movie.trailerId} />
                  <ScreenshotsSection screenshots={movie.screenshots || []} />
                </div>
              </>
            )}
          </div>

          <BuyTicketButton />
        </div>
      </div>
    </div>
  );
}
