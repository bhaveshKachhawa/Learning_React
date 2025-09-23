import React, { useState } from "react";
import ReactDOM from "react-dom/client";

function ImageSlider() {
  const images = [
    "https://picsum.photos/400/200?random=1",
    "https://picsum.photos/400/200?random=2",
    "https://picsum.photos/400/200?random=3",
    "https://picsum.photos/400/200?random=4"
  ];

  const [index, setIndex] = useState(0);

  const nextImage = () => {
    setIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Image Slider</h2>
      <img src={images[index]} alt="slider" style={{ width: "400px", height: "200px", borderRadius: "8px" }} />
      <div style={{ marginTop: "10px" }}>
        <button onClick={prevImage}>Prev</button>
        <button onClick={nextImage}>Next</button>
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<ImageSlider />);
