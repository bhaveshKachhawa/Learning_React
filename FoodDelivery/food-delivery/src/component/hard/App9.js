import React, { useState, useEffect, useRef } from "react";

const App9 = () => {
  const [isOn, setIsOn] = useState(false);
  const [width, setWidth] = useState(0);
  useEffect(() => {
    let interval = null;
    if (isOn) {
      interval = setInterval(() => {
        setWidth((curr) => {
          if (curr >= 100) clearInterval(interval);
          else {
            return Math.min(curr + 10, 100);
          }
        });
      }, 100);
    } else {
      setWidth(0);
    }
    return () => clearInterval(interval);
  }, [isOn]);
  return (
    <div>
      {isOn && (
        <div
          style={{ border: "2px solid black", width: "200", height: "10px" }}
        >
          <div
            style={{
              width: `${width}%`,
              backgroundColor: "green",
              height: "100%",
            }}
          ></div>
        </div>
      )}
      <input
        type="checkbox"
        checked={isOn}
        onChange={() => {
          setIsOn(!isOn);
        }}
      />
    </div>
  );
};
export default App9;
