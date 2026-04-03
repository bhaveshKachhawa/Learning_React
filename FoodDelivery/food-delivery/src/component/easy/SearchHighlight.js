import React, { useState } from "react";

const SearchHighlight = ({
  data = ["Paneer Tikka", "Chicken Pizza", "Veg Burger", "Pasta Arrabbiata"],
}) => {
  const [query, setQuery] = useState("");

  const getHighlightedText = (text, highlight) => {
    if (!highlight.trim()) return text;
    const parts = text.split(new RegExp(`(${highlight})`, "gi"));
    return (
      <span>
        {parts.map((part, i) =>
          part.toLowerCase() === highlight.toLowerCase() ? (
            <b key={i} style={{ backgroundColor: "#ffeb3b", color: "#000" }}>
              {part}
            </b>
          ) : (
            part
          ),
        )}
      </span>
    );
  };

  const filteredData = data.filter((item) =>
    item.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <div style={{ padding: "20px", maxWidth: "300px" }}>
      <input
        type="text"
        placeholder="Search food..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
      />
      <ul style={{ listStyle: "none", padding: 0 }}>
        {filteredData.map((item, index) => (
          <li
            key={index}
            style={{ padding: "5px 0", borderBottom: "1px solid #eee" }}
          >
            {getHighlightedText(item, query)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchHighlight;
