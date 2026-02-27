import React, { useState, useEffect, useRef } from "react";

const App9 = () => {
  const box = ["a1", "a2", "a3", "a4", "a5", "a6", "a7"];
  const [greenIndex, setGreenIndex] = useState([]);
  const status = useRef(true);
  const timeoutInterval = useRef(null);
  const startInterval = () => {
    clearTimeout(timeoutInterval.current);
    status.current = false;
    const interval = setInterval(() => {
      setGreenIndex((curr) => {
        if (curr.length === 0) {
          status.current = true;
          clearInterval(interval);
        }
        return curr.filter((data, index) => index !== 0);
      });
    }, 500);
  };
  const handleClick = (index) => {
    setGreenIndex((curr) => {
      if (greenIndex.length === box.length - 1 && !greenIndex.includes(index)) {
        timeoutInterval.current = setTimeout(() => {
          startInterval();
        }, 100);
      }
      return curr.includes(index) ? [...curr] : [...curr, index];
    });
  };
  return (
    <div
      style={{
        width: "200px",
        height: "150px",
        display: "grid",
        gridTemplateAreas: `"a1 a2 a3"
                            "a4 . ."
                            "a5 a6 a7"`,
        rowGap: "10px",
      }}
    >
      {box.map((data, index) => {
        return (
          <div
            onClick={() => handleClick(index)}
            key={index}
            style={{
              gridArea: data,
              pointerEvents: status.current ? "auto" : "none",
              width: "50px",
              height: "50",
              border: "2px solid black",
              backgroundColor:
                greenIndex && greenIndex.includes(index) ? "green" : "white",
            }}
          ></div>
        );
      })}
    </div>
  );
};
export default App9;
