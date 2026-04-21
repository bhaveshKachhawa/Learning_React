import React, { useState, useEffect } from "react";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div
      style={{ position: "fixed", bottom: "40px", right: "40px", zIndex: 1000 }}
    >
      {isVisible && (
        <button
          onClick={scrollToTop}
          style={{
            padding: "10px 15px",
            fontSize: "20px",
            backgroundColor: "#e50914",
            color: "#fff",
            border: "none",
            borderRadius: "50%",
            cursor: "pointer",
            boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
            transition: "opacity 0.3s ease-in-out",
          }}
        >
          ↑
        </button>
      )}
    </div>
  );
};

export default ScrollToTop;
