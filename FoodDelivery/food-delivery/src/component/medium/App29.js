import React, { useState, useEffect, useRef } from "react";

// Mock API Call simulating async backend network requests
const mockFetchSearchResults = async (query) => {
  await new Promise((resolve) => setTimeout(resolve, 400)); // 400ms network latency

  const mockDatabase = [
    "React",
    "React Native",
    "Redux",
    "Rust",
    "Ruby on Rails",
    "JavaScript",
    "Java",
    "JSON",
    "Jest",
    "Jenkins",
    "Python",
    "PostgreSQL",
    "Pandas",
    "PHP",
  ];

  return mockDatabase.filter((item) =>
    item.toLowerCase().includes(query.toLowerCase()),
  );
};

const AutocompleteSearch = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isOpen, setIsOpen] = useState(false);

  // Search cache map: { query: [results] }
  const cacheRef = useRef({});
  const wrapperRef = useRef(null);

  // Debounced API Request with Race-Condition Guarding
  useEffect(() => {
    const trimmedQuery = query.trim();

    if (!trimmedQuery) {
      setSuggestions([]);
      setIsOpen(false);
      return;
    }

    // 1. Check cache memory first to eliminate redundant network hits
    if (cacheRef.current[trimmedQuery]) {
      setSuggestions(cacheRef.current[trimmedQuery]);
      setIsOpen(true);
      return;
    }

    let isCurrentRequest = true;

    // 2. Debounce execution by 300ms
    const debounceTimer = setTimeout(async () => {
      setIsLoading(true);
      try {
        const results = await mockFetchSearchResults(trimmedQuery);

        if (isCurrentRequest) {
          cacheRef.current[trimmedQuery] = results; // Save to cache
          setSuggestions(results);
          setIsOpen(true);
          setSelectedIndex(-1);
        }
      } catch (error) {
        console.error("Search fetch failed:", error);
      } finally {
        if (isCurrentRequest) setIsLoading(false);
      }
    }, 300);

    return () => {
      isCurrentRequest = false; // Cancel stale out-of-order responses
      clearTimeout(debounceTimer);
    };
  }, [query]);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Keyboard accessibility traversal (ArrowUp / ArrowDown / Enter / Escape)
  const handleKeyDown = (e) => {
    if (!isOpen) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev < suggestions.length - 1 ? prev + 1 : 0,
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev > 0 ? prev - 1 : suggestions.length - 1,
      );
    } else if (e.key === "Enter" && selectedIndex >= 0) {
      e.preventDefault();
      setQuery(suggestions[selectedIndex]);
      setIsOpen(false);
    } else if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  return (
    <div
      ref={wrapperRef}
      style={{ padding: "20px", fontFamily: "sans-serif", maxWidth: "400px" }}
    >
      <h3>Async Search Autocomplete</h3>

      <div style={{ position: "relative" }}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.trim() && setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder="Search technologies (e.g. React)..."
          style={{
            width: "100%",
            padding: "10px 12px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            fontSize: "0.95rem",
            boxSizing: "border-box",
          }}
        />

        {/* Loading Indicator */}
        {isLoading && (
          <span
            style={{
              position: "absolute",
              right: "12px",
              top: "12px",
              fontSize: "0.85rem",
              color: "#888",
            }}
          >
            ⏳
          </span>
        )}

        {/* Suggestions Dropdown Container */}
        {isOpen && (
          <div
            style={{
              position: "absolute",
              top: "105%",
              left: 0,
              right: 0,
              background: "#fff",
              border: "1px solid #ddd",
              borderRadius: "6px",
              boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
              maxHeight: "200px",
              overflowY: "auto",
              zIndex: 100,
            }}
          >
            {suggestions.length === 0 ? (
              <div
                style={{
                  padding: "10px",
                  color: "#888",
                  fontSize: "0.85rem",
                  textAlign: "center",
                }}
              >
                No matching results found.
              </div>
            ) : (
              suggestions.map((item, index) => {
                const isSelected = index === selectedIndex;
                return (
                  <div
                    key={item}
                    onClick={() => {
                      setQuery(item);
                      setIsOpen(false);
                    }}
                    onMouseEnter={() => setSelectedIndex(index)}
                    style={{
                      padding: "10px 12px",
                      cursor: "pointer",
                      fontSize: "0.9rem",
                      background: isSelected ? "#e3f2fd" : "#fff",
                      color: isSelected ? "#0066cc" : "#333",
                      fontWeight: isSelected ? "bold" : "normal",
                    }}
                  >
                    {item}
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AutocompleteSearch;
