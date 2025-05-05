import React, { useState, useEffect } from "react";
import "./Slider.css"; // Додайте стилі тут

const images = [
  { src: "/src/assets/minecraft-banner.jpeg", alt: "Зображення 1" },
  { src: "/src/assets/pole_leto_nebo_121724_1920x1080.jpg", alt: "Зображення 2" },
  { src: "/src/assets/zabavnyy_leto_sobaka_schenok_trava_72565_1920x1080.jpg", alt: "Зображення 3" }
];

const Slider = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="slider">
      <div className="slide__container">
        <img src={images[activeIndex].src} alt={images[activeIndex].alt} className="slide-active" />
      </div>
      <div className="thumbnail__container">
        {images.map((image, index) => (
          <img
            key={index}
            src={image.src}
            alt={image.alt}
            className={`thumbnail ${index === activeIndex ? "active" : "inactive"}`}
            onClick={() => setActiveIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Slider;
