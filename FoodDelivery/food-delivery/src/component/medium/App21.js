import React, { useState, useEffect, useRef } from "react";

const Autocomplete = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [isOpen, setIsOpen] = useState(false);

  const containerRef = useRef(null);

  // Mock search dataset
  const dataset = [
    "React",
    "React Native",
    "Redux",
    "TypeScript",
    "Tailwind CSS",
    "Node.js",
    "Express",
    "Next.js",
    "GraphQL",
  ];

  // Debounced search logic
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    const timer = setTimeout(() => {
      const filtered = dataset.filter((item) =>
        item.toLowerCase().includes(query.toLowerCase()),
      );
      setResults(filtered);
      setIsOpen(true);
      setHighlightedIndex(-1);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  // Keyboard navigation
  const handleKeyDown = (e) => {
    if (!isOpen || results.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev < results.length - 1 ? prev + 1 : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : results.length - 1));
    } else if (e.key === "Enter" && highlightedIndex >= 0) {
      e.preventDefault();
      selectOption(results[highlightedIndex]);
    } else if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  const selectOption = (option) => {
    setQuery(option);
    setIsOpen(false);
  };

  return (
    <div
      style={{ padding: "20px", fontFamily: "sans-serif", maxWidth: "300px" }}
    >
      <h3>Autocomplete Search</h3>
      <div ref={containerRef} style={{ position: "relative" }}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => query.trim() && setIsOpen(true)}
          placeholder="Search tech stack..."
          style={{
            width: "100%",
            padding: "10px",
            boxSizing: "border-box",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        />

        {isOpen && results.length > 0 && (
          <ul
            style={{
              position: "absolute",
              top: "100%",
              left: 0,
              right: 0,
              margin: "4px 0 0 0",
              padding: 0,
              listStyle: "none",
              border: "1px solid #ccc",
              borderRadius: "4px",
              background: "#fff",
              boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
              zIndex: 10,
            }}
          >
            {results.map((item, index) => (
              <li
                key={item}
                onClick={() => selectOption(item)}
                style={{
                  padding: "10px",
                  cursor: "pointer",
                  background: index === highlightedIndex ? "#e3f2fd" : "#fff",
                }}
              >
                {item}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Autocomplete;
