import React, { useState, useEffect } from "react";

const DigitalClock = () => {
  const [time, setTime] = useState(new Date());
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    let timerID;

    if (isRunning) {
      timerID = setInterval(() => {
        setTime(new Date());
      }, 1000);
    }

    return () => clearInterval(timerID);
  }, [isRunning]);

  return (
    <div
      style={{ textAlign: "center", padding: "20px", border: "1px solid #ccc" }}
    >
      <h1>{time.toLocaleTimeString()}</h1>

      <button
        onClick={() => setIsRunning(!isRunning)}
        style={{ padding: "10px 20px", cursor: "pointer" }}
      >
        {isRunning ? "Stop Clock" : "Start Clock"}
      </button>
    </div>
  );
};

export default DigitalClock;
