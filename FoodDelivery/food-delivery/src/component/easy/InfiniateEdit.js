import React, { useState, useEffect, useRef } from "react";

const InlineEdit = ({ value, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentValue, setCurrentValue] = useState(value);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleBlur = () => {
    setIsEditing(false);
    onSave(currentValue);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleBlur();
    } else if (e.key === "Escape") {
      setCurrentValue(value);
      setIsEditing(false);
    }
  };

  return (
    <div className="inline-edit-wrapper" style={{ display: "inline-block" }}>
      {isEditing ? (
        <input
          ref={inputRef}
          value={currentValue}
          onChange={(e) => setCurrentValue(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          style={{ padding: "5px", fontSize: "1rem" }}
        />
      ) : (
        <span
          onClick={() => setIsEditing(true)}
          style={{ cursor: "pointer", borderBottom: "1px dashed #666" }}
        >
          {currentValue || "Click to edit..."}
        </span>
      )}
    </div>
  );
};

export default InlineEdit;
