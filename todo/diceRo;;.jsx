import React, { useState } from "react";
import ReactDOM from "react-dom/client";

function DiceRoller() {
  const [dice, setDice] = useState(1);

  const rollDice = () => {
    const random = Math.floor(Math.random() * 6) + 1;
    setDice(random);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Dice Roller</h2>
      <h1>🎲 {dice}</h1>
      <button onClick={rollDice}>Roll Dice</button>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<DiceRoller />);
