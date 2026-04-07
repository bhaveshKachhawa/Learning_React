import React, { useState, useRef } from "react";

const Accordion = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef(null);

  return (
    <div
      style={{
        borderBottom: "1px solid #ddd",
        width: "100%",
        maxWidth: "500px",
      }}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: "100%",
          padding: "15px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "none",
          border: "none",
          cursor: "pointer",
          fontWeight: "bold",
          textAlign: "left",
        }}
      >
        <span>{title}</span>
        <span
          style={{
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.3s",
          }}
        >
          ▼
        </span>
      </button>

      <div
        ref={contentRef}
        style={{
          maxHeight: isOpen ? `${contentRef.current?.scrollHeight}px` : "0px",
          overflow: "hidden",
          transition: "max-height 0.3s ease-in-out",
          background: "#f9f9f9",
        }}
      >
        <div style={{ padding: "15px", lineHeight: "1.5", color: "#444" }}>
          {content}
        </div>
      </div>
    </div>
  );
};

export default Accordion;
