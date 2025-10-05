import React, { useState } from "react";
import ReactDOM from "react-dom/client";

function RandomBackground() {
  const images = [
    "https://picsum.photos/800/600?random=1",
    "https://picsum.photos/800/600?random=2",
    "https://picsum.photos/800/600?random=3",
    "https://picsum.photos/800/600?random=4",
    "https://picsum.photos/800/600?random=5"
  ];

  const [bg, setBg] = useState(images[0]);

  const changeBackground = () => {
    const random = Math.floor(Math.random() * images.length);
    setBg(images[random]);
  };

  return (
    <div
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        color: "white",
        textShadow: "1px 1px 2px black"
      }}
    >
      <h2>Random Background</h2>
      <button onClick={changeBackground}>Change</button>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RandomBackground />);
