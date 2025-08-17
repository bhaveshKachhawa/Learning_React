import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";

function Timer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval); // cleanup
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>React useEffect Timer</h2>
      <h1>{seconds} seconds</h1>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Timer />);
