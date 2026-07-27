import React, { useState, useRef, useEffect } from "react";

const MultiSelect = () => {
  const [selected, setSelected] = useState(["React", "TypeScript"]);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  const options = [
    "React",
    "TypeScript",
    "Node.js",
    "GraphQL",
    "Tailwind CSS",
    "Next.js",
    "Docker",
  ];

  const toggleOption = (option) => {
    if (selected.includes(option)) {
      setSelected(selected.filter((item) => item !== option));
    } else {
      setSelected([...selected, option]);
    }
  };

  const removeTag = (e, option) => {
    e.stopPropagation(); // Prevents opening the dropdown when clicking the remove button
    setSelected(selected.filter((item) => item !== option));
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      style={{ padding: "20px", fontFamily: "sans-serif", maxWidth: "400px" }}
    >
      <h3>Multi-Select Categories</h3>
      <div ref={containerRef} style={{ position: "relative" }}>
        {/* Select Input Field / Chip Area */}
        <div
          onClick={() => setIsOpen(!isOpen)}
          style={{
            minHeight: "42px",
            padding: "6px",
            border: "1px solid #ccc",
            borderRadius: "6px",
            display: "flex",
            flexWrap: "wrap",
            gap: "6px",
            alignItems: "center",
            cursor: "pointer",
            background: "#fff",
          }}
        >
          {selected.map((item) => (
            <span
              key={item}
              style={{
                background: "#e3f2fd",
                color: "#0066cc",
                padding: "4px 8px",
                borderRadius: "12px",
                fontSize: "0.85rem",
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              {item}
              <b
                onClick={(e) => removeTag(e, item)}
                style={{ cursor: "pointer" }}
              >
                ✕
              </b>
            </span>
          ))}

          {selected.length === 0 && (
            <span style={{ color: "#aaa", fontSize: "0.9rem" }}>
              Select items...
            </span>
          )}
        </div>

        {/* Dropdown Options List */}
        {isOpen && (
          <div
            style={{
              position: "absolute",
              top: "100%",
              left: 0,
              right: 0,
              marginTop: "4px",
              background: "#fff",
              border: "1px solid #ccc",
              borderRadius: "6px",
              boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
              maxHeight: "180px",
              overflowY: "auto",
              zIndex: 10,
            }}
          >
            {options.map((option) => {
              const isSelected = selected.includes(option);
              return (
                <div
                  key={option}
                  onClick={() => toggleOption(option)}
                  style={{
                    padding: "8px 12px",
                    cursor: "pointer",
                    background: isSelected ? "#f0f0f0" : "#fff",
                    fontWeight: isSelected ? "bold" : "normal",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <span>{option}</span>
                  {isSelected && <span>✓</span>}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MultiSelect;
