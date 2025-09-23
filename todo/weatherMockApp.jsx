import React, { useState } from "react";
import ReactDOM from "react-dom/client";

function WeatherApp() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);

  const mockData = {
    London: { temp: "18°C", condition: "Cloudy" },
    Paris: { temp: "22°C", condition: "Sunny" },
    Tokyo: { temp: "25°C", condition: "Rainy" }
  };

  const getWeather = () => {
    if (mockData[city]) {
      setWeather(mockData[city]);
    } else {
      setWeather({ temp: "N/A", condition: "City not found" });
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Weather App (Mock)</h2>
      <input
        type="text"
        placeholder="Enter city (e.g. London)"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={getWeather}>Get Weather</button>
      {weather && (
        <div style={{ marginTop: "20px" }}>
          <h3>Temperature: {weather.temp}</h3>
          <h3>Condition: {weather.condition}</h3>
        </div>
      )}
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<WeatherApp />);
