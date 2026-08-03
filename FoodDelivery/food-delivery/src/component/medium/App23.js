import React, { useState, useRef } from "react";

const images = [
  {
    id: 1,
    src: "https://picsum.photos/id/10/600/350",
    alt: "Mountain landscape",
  },
  {
    id: 2,
    src: "https://picsum.photos/id/20/600/350",
    alt: "Study notes workspace",
  },
  {
    id: 3,
    src: "https://picsum.photos/id/30/600/350",
    alt: "Mug on coffee table",
  },
  {
    id: 4,
    src: "https://picsum.photos/id/40/600/350",
    alt: "Forest path trees",
  },
];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  // Touch Swipe Handlers for Mobile Devices
  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;

    // Swipe left (next) vs Swipe right (previous) threshold > 50px
    if (distance > 50) {
      nextSlide();
    } else if (distance < -50) {
      prevSlide();
    }

    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  // Keyboard navigation
  const handleKeyDown = (e) => {
    if (e.key === "ArrowLeft") prevSlide();
    if (e.key === "ArrowRight") nextSlide();
  };

  return (
    <div
      style={{ padding: "20px", fontFamily: "sans-serif", maxWidth: "600px" }}
      tabIndex="0"
      onKeyDown={handleKeyDown}
    >
      <h3>Image Carousel / Slider</h3>

      {/* Main Viewport Container */}
      <div
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{
          position: "relative",
          width: "100%",
          height: "350px",
          borderRadius: "8px",
          overflow: "hidden",
          background: "#111",
        }}
      >
        <img
          src={images[currentIndex].src}
          alt={images[currentIndex].alt}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />

        {/* Left Arrow Button */}
        <button
          onClick={prevSlide}
          style={{
            position: "absolute",
            top: "50%",
            left: "10px",
            transform: "translateY(-50%)",
            background: "rgba(0,0,0,0.5)",
            color: "#fff",
            border: "none",
            borderRadius: "50%",
            width: "36px",
            height: "36px",
            cursor: "pointer",
            fontSize: "1.2rem",
          }}
        >
          ❮
        </button>

        {/* Right Arrow Button */}
        <button
          onClick={nextSlide}
          style={{
            position: "absolute",
            top: "50%",
            right: "10px",
            transform: "translateY(-50%)",
            background: "rgba(0,0,0,0.5)",
            color: "#fff",
            border: "none",
            borderRadius: "50%",
            width: "36px",
            height: "36px",
            cursor: "pointer",
            fontSize: "1.2rem",
          }}
        >
          ❯
        </button>
      </div>

      {/* Thumbnail Track Navigation */}
      <div
        style={{
          display: "flex",
          gap: "10px",
          marginTop: "12px",
          justifyContent: "center",
        }}
      >
        {images.map((img, index) => (
          <img
            key={img.id}
            src={img.src}
            alt={img.alt}
            onClick={() => setCurrentIndex(index)}
            style={{
              width: "70px",
              height: "45px",
              objectFit: "cover",
              borderRadius: "4px",
              cursor: "pointer",
              border:
                currentIndex === index
                  ? "2px solid #0066cc"
                  : "2px solid transparent",
              opacity: currentIndex === index ? 1 : 0.6,
              transition: "all 0.2s ease",
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
