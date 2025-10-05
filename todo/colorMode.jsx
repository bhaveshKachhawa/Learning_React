import React, { useState } from "react";
import ReactDOM from "react-dom/client";

function ThemeToggle() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const themeStyles = {
    backgroundColor: darkMode ? "#222" : "#f0f0f0",
    color: darkMode ? "white" : "black",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  };

  return (
    <div style={themeStyles}>
      <h2>{darkMode ? "Dark Mode" : "Light Mode"}</h2>
      <button onClick={toggleTheme}>
        Switch to {darkMode ? "Light" : "Dark"}
      </button>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<ThemeToggle />);
