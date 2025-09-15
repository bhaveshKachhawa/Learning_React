import React, { useState } from "react";
import ReactDOM from "react-dom/client";

function BMICalculator() {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [bmi, setBmi] = useState(null);

  const calculateBMI = () => {
    if (weight > 0 && height > 0) {
      const h = height / 100;
      const result = (weight / (h * h)).toFixed(2);
      setBmi(result);
    } else {
      setBmi("Invalid Input");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>BMI Calculator</h2>
      <input
        type="number"
        placeholder="Weight (kg)"
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
      />
      <br /><br />
      <input
        type="number"
        placeholder="Height (cm)"
        value={height}
        onChange={(e) => setHeight(e.target.value)}
      />
      <br /><br />
      <button onClick={calculateBMI}>Calculate</button>
      {bmi && (
        <h3 style={{ marginTop: "20px" }}>Your BMI: {bmi}</h3>
      )}
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<BMICalculator />);
