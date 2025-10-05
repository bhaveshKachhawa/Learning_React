import React, { useState } from "react";
import ReactDOM from "react-dom/client";

function TextLengthCounter() {
  const [text, setText] = useState("");

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>Text Length Counter</h2>
      <textarea
        rows="4"
        cols="40"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <p>Length: {text.length} characters</p>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<TextLengthCounter />);
