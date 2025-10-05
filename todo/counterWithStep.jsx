import React, { useState } from "react";
import ReactDOM from "react-dom/client";

function StepCounter() {
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(1);

  return (
    <div style={{ textAlign: "center", marginTop: "80px" }}>
      <h2>Counter: {count}</h2>
      <input
        type="number"
        value={step}
        onChange={(e) => setStep(Number(e.target.value))}
        style={{ width: "60px", marginRight: "10px" }}
      />
      <button onClick={() => setCount(count + step)}>+</button>
      <button onClick={() => setCount(count - step)}>-</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<StepCounter />);
