import React, { useState } from "react";
import ReactDOM from "react-dom/client";

function QuoteGenerator() {
  const quotes = [
    "The best way to get started is to quit talking and begin doing.",
    "Success is not in what you have, but who you are.",
    "Do what you can with all you have, wherever you are.",
    "The harder you work for something, the greater you’ll feel when you achieve it.",
    "Dream bigger. Do bigger."
  ];

  const [quote, setQuote] = useState(quotes[0]);

  const newQuote = () => {
    const random = Math.floor(Math.random() * quotes.length);
    setQuote(quotes[random]);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px", maxWidth: "400px", marginLeft: "auto", marginRight: "auto" }}>
      <h2>Random Quote Generator</h2>
      <p style={{ fontStyle: "italic" }}>{quote}</p>
      <button onClick={newQuote}>New Quote</button>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<QuoteGenerator />);
