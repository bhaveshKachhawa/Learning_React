import React, { useState } from "react";
import ReactDOM from "react-dom/client";

function GuessGame() {
  const [number] = useState(Math.floor(Math.random() * 10) + 1);
  const [guess, setGuess] = useState("");
  const [message, setMessage] = useState("");

  const checkGuess = () => {
    const g = parseInt(guess);
    if (g === number) {
      setMessage("🎉 Correct! You guessed the number!");
    } else if (g > number) {
      setMessage("Too high! Try again.");
    } else {
      setMessage("Too low! Try again.");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Guess the Number (1–10)</h2>
      <input
        type="number"
        value={guess}
        onChange={(e) => setGuess(e.target.value)}
        placeholder="Enter guess"
      />
      <button onClick={checkGuess}>Check</button>
      <p>{message}</p>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<GuessGame />);
