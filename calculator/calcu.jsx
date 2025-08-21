import React, { useState } from "react";
import ReactDOM from "react-dom/client";

function Calculator() {
  const [input, setInput] = useState("");

  const handleClick = (value) => {
    if (value === "=") {
      try {
        setInput(eval(input).toString());
      } catch {
        setInput("Error");
      }
    } else if (value === "C") {
      setInput("");
    } else {
      setInput(input + value);
    }
  };

  const buttons = ["7","8","9","/","4","5","6","*","1","2","3","-","0",".","=","+","C"];

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Calculator</h2>
      <input type="text" value={input} readOnly style={{ width: "200px", marginBottom: "10px", textAlign: "right" }}/>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 50px)", gap: "5px", justifyContent: "center" }}>
        {buttons.map((btn) => (
          <button key={btn} onClick={() => handleClick(btn)}>{btn}</button>
        ))}
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Calculator />);
