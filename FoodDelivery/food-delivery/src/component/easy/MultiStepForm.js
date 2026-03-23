import React, { useState, useEffect, useRef } from "react";

const CustomDropdown = ({ options, label, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const dropdownRef = useRef(null); // To detect clicks outside

  // 1. Handle clicking outside to close the dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    onSelect(option); // Pass the data back to parent
  };

  return (
    <div
      className="dropdown-container"
      ref={dropdownRef}
      style={{ width: "200px", position: "relative" }}
    >
      <label>{label}</label>

      {/* The Trigger Button */}
      <div
        className="dropdown-header"
        onClick={() => setIsOpen(!isOpen)}
        style={{
          border: "1px solid #ccc",
          padding: "10px",
          cursor: "pointer",
          marginTop: "5px",
        }}
      >
        {selectedOption ? selectedOption.label : "Select an option..."}
        <span style={{ float: "right" }}>{isOpen ? "▲" : "▼"}</span>
      </div>

      {/* The Options List */}
      {isOpen && (
        <ul
          className="dropdown-list"
          style={{
            position: "absolute",
            width: "100%",
            border: "1px solid #ccc",
            background: "#fff",
            listStyle: "none",
            padding: "0",
            margin: "0",
            zIndex: 10,
          }}
        >
          {options.map((option) => (
            <li
              key={option.value}
              onClick={() => handleOptionClick(option)}
              style={{
                padding: "10px",
                cursor: "pointer",
                borderBottom: "1px solid #eee",
              }}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomDropdown;
