import React, { useState } from "react";
import ReactDOM from "react-dom/client";

function ColorGenerator() {
  const [color, setColor] = useState("#ffffff");

  const generateColor = () => {
    const randomColor = "#" + Math.floor(Math.random()*16777215).toString(16);
    setColor(randomColor);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Random Color Generator</h2>
      <div style={{ width: "150px", height: "150px", margin: "20px auto", backgroundColor: color, border: "1px solid #000" }}></div>
      <p>{color}</p>
      <button onClick={generateColor}>Generate Color</button>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<ColorGenerator />);
