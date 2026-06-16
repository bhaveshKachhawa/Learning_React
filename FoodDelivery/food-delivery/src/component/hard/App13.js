import React, { useState, useRef, useEffect } from "react";

const MultiSelect = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const containerRef = useRef(null);

  const options = ["Pizza", "Burger", "Pasta", "Sushi", "Salad", "Tacos"];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (item) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(selectedItems.filter((i) => i !== item));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  return (
    <div
      ref={containerRef}
      style={{ width: "300px", position: "relative", fontFamily: "sans-serif" }}
    >
      {/* Selection Window / Trigger */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        style={{
          border: "1px solid #ccc",
          padding: "8px",
          borderRadius: "4px",
          minHeight: "36px",
          display: "flex",
          flexWrap: "wrap",
          gap: "5px",
          cursor: "pointer",
          background: "#fff",
        }}
      >
        {selectedItems.length === 0 && (
          <span style={{ color: "#aaa" }}>Select options...</span>
        )}
        {selectedItems.map((item) => (
          <span
            key={item}
            style={{
              background: "#e1e1e1",
              padding: "2px 6px",
              borderRadius: "3px",
              fontSize: "0.9rem",
              display: "flex",
              alignItems: "center",
              gap: "4px",
            }}
          >
            {item}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleSelect(item);
              }}
              style={{
                border: "none",
                background: "none",
                cursor: "pointer",
                fontWeight: "bold",
                padding: 0,
              }}
            >
              ×
            </button>
          </span>
        ))}
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <ul
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            border: "1px solid #ccc",
            borderRadius: "4px",
            background: "#fff",
            margin: "4px 0 0 0",
            padding: 0,
            listStyle: "none",
            maxHeight: "200px",
            overflowY: "auto",
            zIndex: 1000,
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
          }}
        >
          {options.map((option) => {
            const isSelected = selectedItems.includes(option);
            return (
              <li
                key={option}
                onClick={() => handleSelect(option)}
                style={{
                  padding: "10px",
                  cursor: "pointer",
                  background: isSelected ? "#f0f0f0" : "#fff",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span>{option}</span>
                {isSelected && (
                  <span style={{ color: "green", fontWeight: "bold" }}>✓</span>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default MultiSelect;
