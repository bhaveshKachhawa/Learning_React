import React, { useState } from "react";
import ReactDOM from "react-dom/client";

function TemperatureConverter() {
  const [celsius, setCelsius] = useState("");
  const [fahrenheit, setFahrenheit] = useState("");

  const handleCelsiusChange = (e) => {
    const c = e.target.value;
    setCelsius(c);
    setFahrenheit(c !== "" ? (c * 9/5 + 32).toFixed(2) : "");
  };

  const handleFahrenheitChange = (e) => {
    const f = e.target.value;
    setFahrenheit(f);
    setCelsius(f !== "" ? ((f - 32) * 5/9).toFixed(2) : "");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Temperature Converter</h2>
      <div style={{ marginBottom: "10px" }}>
        <input
          type="number"
          placeholder="Celsius"
          value={celsius}
          onChange={handleCelsiusChange}
        /> °C
      </div>
      <div>
        <input
          type="number"
          placeholder="Fahrenheit"
          value={fahrenheit}
          onChange={handleFahrenheitChange}
        /> °F
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<TemperatureConverter />);
