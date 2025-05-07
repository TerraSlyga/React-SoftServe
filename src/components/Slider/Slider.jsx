import React, { useState, useEffect } from "react";
import "./Slider.css"; // Переконайтеся, що шлях до CSS файлу правильний
import movieService from "../../services/movieService"; // Припустимо, що movieService знаходиться в цьому файлі

const Slider = ({ maxSlides = 5 }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [sliderImages, setSliderImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFragments = async () => {
      setLoading(true);
      setError(null);
      try {
        const moviesData = await movieService.getAllFragments();
        const limitedMovies = moviesData.slice(0, maxSlides);
        // Обробляємо отримані дані, щоб створити масив для слайдера
        const formattedImages = limitedMovies.map((movie) => ({
          srcfragment: movie.firstScreenshot.url,
          srcposter: movie.posterPath,
          alt: movie.title,
        }));
        setSliderImages(formattedImages);
      } catch (err) {
        setError(err.message);
        console.error("Помилка при обробці даних для слайдера:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFragments();
  }, []);

  useEffect(() => {
    if (sliderImages.length > 0) {
      const interval = setInterval(() => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % sliderImages.length);
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [sliderImages]);

  if (loading) {
    return <div>Завантаження слайдів...</div>;
  }

  if (error) {
    return <div>Помилка завантаження слайдів: {error}</div>;
  }

  if (!sliderImages || sliderImages.length === 0) {
    return <div>Немає доступних слайдів.</div>;
  }

  return (
    <div className="slider">
      <div className="slide__container">
        <img
          src={sliderImages[activeIndex]?.srcfragment}
          alt={sliderImages[activeIndex]?.alt || "Зображення слайду"}
          className="slide-active"
        />
      </div>
      <div className="thumbnail__container">
        {sliderImages.map((image, index) => (
          <img
            key={index}
            src={image.srcposter}
            alt={image.alt}
            className={`thumbnail ${
              index === activeIndex ? "active" : "inactive"
            }`}
            onClick={() => setActiveIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Slider;
