import React, { useState } from "react";
import ReactDOM from "react-dom/client";

function RockPaperScissors() {
  const choices = ["Rock", "Paper", "Scissors"];
  const [userChoice, setUserChoice] = useState("");
  const [computerChoice, setComputerChoice] = useState("");
  const [result, setResult] = useState("");

  const playGame = (choice) => {
    setUserChoice(choice);
    const compChoice = choices[Math.floor(Math.random() * 3)];
    setComputerChoice(compChoice);

    if (choice === compChoice) {
      setResult("It's a Draw!");
    } else if (
      (choice === "Rock" && compChoice === "Scissors") ||
      (choice === "Paper" && compChoice === "Rock") ||
      (choice === "Scissors" && compChoice === "Paper")
    ) {
      setResult("You Win!");
    } else {
      setResult("You Lose!");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Rock Paper Scissors</h2>
      <div>
        {choices.map((c) => (
          <button key={c} onClick={() => playGame(c)}>{c}</button>
        ))}
      </div>
      <h3>Your Choice: {userChoice}</h3>
      <h3>Computer Choice: {computerChoice}</h3>
      <h2>{result}</h2>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RockPaperScissors />);
