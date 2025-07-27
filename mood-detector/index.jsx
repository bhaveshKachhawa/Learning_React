import React, { useState } from "react";
import "./App.css";

const moods = {
  happy: { emoji: "😊", color: "#ffe066" },
  sad: { emoji: "😢", color: "#a0c4ff" },
  angry: { emoji: "😠", color: "#ff6b6b" },
  relaxed: { emoji: "😌", color: "#caffbf" },
};

function App() {
  const [mood, setMood] = useState("happy");

  return (
    <div
      style={{
        backgroundColor: moods[mood].color,
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        transition: "background-color 0.3s",
      }}
    >
      <h1>How are you feeling today?</h1>
      <div style={{ fontSize: "5rem" }}>{moods[mood].emoji}</div>
      <div style={{ marginTop: "20px" }}>
        {Object.keys(moods).map((key) => (
          <button
            key={key}
            onClick={() => setMood(key)}
            style={{
              margin: "0 10px",
              padding: "10px 20px",
              fontSize: "16px",
              cursor: "pointer",
              borderRadius: "5px",
              border: "none",
              background: "#fff",
              boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
            }}
          >
            {key.charAt(0).toUpperCase() + key.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
}

export default App;
