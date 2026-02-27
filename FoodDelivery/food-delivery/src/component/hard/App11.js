import React, { useState, useEffect, useRef } from "react";
import { useWinner } from "./CustomHook/useWinner";

const App10 = () => {
  const SIZE = 6;
  const [box, setBox] = useState(
    Array.from({ length: SIZE }, () => Array(SIZE).fill(null)),
  );
  const value = useRef("X");
  const [winner, setWinner] = useState(null);
  const fetchWinner = useWinner();
  const handleClick = (rowIndex, colIndex) => {
    const tempArr = [...box];
    if (tempArr[rowIndex][colIndex] === null && winner === null) {
      console.log(rowIndex, colIndex);
      tempArr[rowIndex][colIndex] = value.current;
      setWinner(fetchWinner(tempArr));
      setBox(tempArr);
      value.current = value.current === "X" ? "O" : "X";
    }
  };
  return (
    <div>
      Status : {winner === null ? "Playing" : winner + " is winner"}
      <div
        style={{
          display: "flex",
        }}
      >
        {box.map((row, rowIndex) => (
          <div key={rowIndex}>
            {row.map((col, colIndex) => {
              return (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: "30",
                    width: "60px",
                    height: "40px",
                    border: "2px solid black",
                  }}
                  key={colIndex}
                  onClick={() => handleClick(rowIndex, colIndex)}
                >
                  {console.log("hi")}
                  {col}
                </div>
              );
            })}
          </div>
        ))}
      </div>
      <button
        onClick={() => {
          value.current = "X";
          const temp = Array.from({ length: SIZE }, () =>
            Array(SIZE).fill(null),
          );
          setBox(temp);
          setWinner(null);
        }}
      >
        Rematch
      </button>
    </div>
  );
};
export default App10;
