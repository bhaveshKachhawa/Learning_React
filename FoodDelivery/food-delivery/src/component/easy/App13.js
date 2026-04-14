import React, { useState, useEffect } from "react";

const ThemeSwitcher = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme ? savedTheme === "dark" : false;
  });

  useEffect(() => {
    const theme = isDarkMode ? "dark" : "light";
    document.body.style.backgroundColor = isDarkMode ? "#1a1a1a" : "#ffffff";
    document.body.style.color = isDarkMode ? "#ffffff" : "#000000";
    localStorage.setItem("theme", theme);
  }, [isDarkMode]);

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2>{isDarkMode ? "Dark Mode" : "Light Mode"}</h2>
      <button
        onClick={() => setIsDarkMode(!isDarkMode)}
        style={{
          padding: "10px 20px",
          cursor: "pointer",
          borderRadius: "20px",
          border: "2px solid",
          background: isDarkMode ? "#fff" : "#333",
          color: isDarkMode ? "#000" : "#fff",
          fontWeight: "bold",
          transition: "0.3s",
        }}
      >
        Switch to {isDarkMode ? "Light" : "Dark"}
      </button>
    </div>
  );
};

export default ThemeSwitcher;
