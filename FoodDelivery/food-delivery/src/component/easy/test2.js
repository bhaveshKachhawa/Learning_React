import React, { useState } from "react";

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);

  const winner = calculateWinner(board);
  const status = winner
    ? `Winner: ${winner}`
    : `Next player: ${isXNext ? "X" : "O"}`;

  const handleClick = (i) => {
    if (winner || board[i]) return; // Stop if someone won or square is filled

    const newBoard = [...board];
    newBoard[i] = isXNext ? "X" : "O";
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  return (
    <div style={styles.container}>
      <div style={styles.status}>{status}</div>
      <div style={styles.grid}>
        {board.map((square, i) => (
          <button key={i} style={styles.square} onClick={() => handleClick(i)}>
            {square}
          </button>
        ))}
      </div>
      <button
        style={styles.reset}
        onClick={() => setBoard(Array(9).fill(null))}
      >
        Reset Game
      </button>
    </div>
  );
};

// Winning Logic
const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // Rows
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // Cols
    [0, 4, 8],
    [2, 4, 6], // Diagonals
  ];
  for (let [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "50px",
    fontFamily: "Arial",
  },
  status: { marginBottom: "20px", fontSize: "24px", fontWeight: "bold" },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 100px)",
    gap: "5px",
  },
  square: {
    width: "100px",
    height: "100px",
    fontSize: "32px",
    cursor: "pointer",
    backgroundColor: "#fff",
    border: "2px solid #333",
  },
  reset: {
    marginTop: "20px",
    padding: "10px 20px",
    fontSize: "16px",
    cursor: "pointer",
  },
};

export default TicTacToe;
