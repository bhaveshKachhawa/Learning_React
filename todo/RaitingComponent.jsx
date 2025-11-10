import React, { useState } from "react";
import ReactDOM from "react-dom/client";

function StarRating() {
  const [rating, setRating] = useState(0);

  return (
    <div style={{ textAlign: "center", marginTop: "100px", fontSize: "30px" }}>
      <h2>Rate Us</h2>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          onClick={() => setRating(star)}
          style={{
            cursor: "pointer",
            color: rating >= star ? "gold" : "gray"
          }}
        >
          ★
        </span>
      ))}
      <p>Your Rating: {rating}</p>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<StarRating />);
