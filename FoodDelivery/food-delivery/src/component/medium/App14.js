import React, { useState, useEffect } from "react";

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const slides = [
    {
      url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=500",
      title: "Mountains",
    },
    {
      url: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=500",
      title: "Forest",
    },
    {
      url: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=500",
      title: "Nature",
    },
  ];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === slides.length - 1 ? 0 : prevIndex + 1,
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1,
    );
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.slider}>
        <button onClick={prevSlide} style={{ ...styles.arrow, left: "10px" }}>
          &#10094;
        </button>

        <img
          src={slides[currentIndex].url}
          alt={slides[currentIndex].title}
          style={styles.image}
        />

        <button onClick={nextSlide} style={{ ...styles.arrow, right: "10px" }}>
          &#10095;
        </button>
      </div>

      <div style={styles.dotsContainer}>
        {slides.map((_, index) => (
          <span
            key={index}
            onClick={() => setCurrentIndex(index)}
            style={{
              ...styles.dot,
              backgroundColor: currentIndex === index ? "#333" : "#bbb",
            }}
          />
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: { maxWidth: "500px", margin: "50px auto", textAlign: "center" },
  slider: {
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    borderRadius: "10px",
    height: "300px",
    backgroundColor: "#eee",
  },
  image: { width: "100%", height: "100%", objectFit: "cover" },
  arrow: {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    backgroundColor: "rgba(0,0,0,0.5)",
    color: "white",
    border: "none",
    padding: "10px",
    cursor: "pointer",
    borderRadius: "50%",
    fontSize: "18px",
    zIndex: 2,
  },
  dotsContainer: {
    marginTop: "15px",
    display: "flex",
    justifyContent: "center",
    gap: "8px",
  },
  dot: {
    width: "12px",
    height: "12px",
    borderRadius: "50%",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
};

export default Carousel;
