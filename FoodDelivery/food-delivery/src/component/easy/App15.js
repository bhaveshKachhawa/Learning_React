import React, { useState } from "react";

const accordionData = [
  {
    id: "1",
    title: "What is React?",
    content:
      "React is a JavaScript library for building user interfaces based on components.",
  },
  {
    id: "2",
    title: "What is JSX?",
    content:
      "JSX is a syntax extension for JavaScript that looks similar to XML or HTML.",
  },
  {
    id: "3",
    title: "How does state work?",
    content:
      "State is a built-in React object used to contain data or information about the component.",
  },
];

const Accordion = ({ allowMultiple = false }) => {
  // Store expanded item IDs (Set ensures unique values and fast lookups)
  const [openIds, setOpenIds] = useState(new Set(["1"]));

  const toggleItem = (id) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        if (!allowMultiple) {
          next.clear(); // Collapse others if single-mode
        }
        next.add(id);
      }
      return next;
    });
  };

  return (
    <div
      style={{ padding: "20px", fontFamily: "sans-serif", maxWidth: "450px" }}
    >
      <h3>Accordion ({allowMultiple ? "Multi-Expand" : "Single-Expand"})</h3>
      <div
        style={{
          border: "1px solid #ddd",
          borderRadius: "6px",
          overflow: "hidden",
        }}
      >
        {accordionData.map((item) => {
          const isOpen = openIds.has(item.id);

          return (
            <div key={item.id} style={{ borderBottom: "1px solid #ddd" }}>
              <button
                onClick={() => toggleItem(item.id)}
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  background: isOpen ? "#f7f7f7" : "#fff",
                  border: "none",
                  textAlign: "left",
                  fontSize: "1rem",
                  fontWeight: "bold",
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span>{item.title}</span>
                <span>{isOpen ? "−" : "+"}</span>
              </button>

              {isOpen && (
                <div
                  style={{
                    padding: "12px 16px",
                    background: "#fff",
                    color: "#555",
                    fontSize: "0.9rem",
                  }}
                >
                  {item.content}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Accordion;
