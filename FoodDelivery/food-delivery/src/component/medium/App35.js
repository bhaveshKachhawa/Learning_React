import React, { useState, useRef, useEffect } from "react";

// Generate 10,000 mock items with variable height text
const TOTAL_ITEMS = 10000;
const mockItems = Array.from({ length: TOTAL_ITEMS }, (_, i) => ({
  id: i,
  title: `Message Log #${i + 1}`,
  description:
    i % 3 === 0
      ? "Short standard log entry."
      : i % 3 === 1
        ? "Medium log entry containing extra diagnostic details and trace metadata for execution flow."
        : "Long multiline log entry containing extensive JSON payloads, call stack backtraces, diagnostic performance metrics, and detailed debug logs designed to test variable container height scenarios.",
}));

const ITEM_HEIGHT = 80; // Estimated height per item in pixels
const CONTAINER_HEIGHT = 400; // Fixed height of scroll viewport container
const BUFFER_COUNT = 3; // Extra items to render above/below viewport to prevent flicker

const VirtualizedList = () => {
  const [scrollTop, setScrollTop] = useState(0);
  const containerRef = useRef(null);

  const handleScroll = (e) => {
    setScrollTop(e.target.scrollTop);
  };

  // Calculate slice indices for visible virtual items
  const totalHeight = TOTAL_ITEMS * ITEM_HEIGHT;
  const startIndex = Math.max(
    0,
    Math.floor(scrollTop / ITEM_HEIGHT) - BUFFER_COUNT,
  );
  const endIndex = Math.min(
    TOTAL_ITEMS - 1,
    Math.floor((scrollTop + CONTAINER_HEIGHT) / ITEM_HEIGHT) + BUFFER_COUNT,
  );

  const visibleItems = mockItems.slice(startIndex, endIndex + 1);
  const offsetY = startIndex * ITEM_HEIGHT;

  return (
    <div
      style={{ padding: "20px", fontFamily: "sans-serif", maxWidth: "600px" }}
    >
      <h3>Virtualized Infinite Scroll List</h3>
      <p style={{ fontSize: "0.85rem", color: "#666" }}>
        Rendering <strong>{TOTAL_ITEMS.toLocaleString()} items</strong> using
        DOM windowing. Only <strong>{visibleItems.length} nodes</strong> are
        currently mounted in the DOM.
      </p>

      {/* Outer Viewport Container */}
      <div
        ref={containerRef}
        onScroll={handleScroll}
        style={{
          height: `${CONTAINER_HEIGHT}px`,
          overflowY: "auto",
          border: "1px solid #ccc",
          borderRadius: "8px",
          background: "#fff",
          position: "relative",
        }}
      >
        {/* Invisible Spacer to establish true full scroll height */}
        <div
          style={{
            height: `${totalHeight}px`,
            width: "100%",
            position: "relative",
          }}
        >
          {/* Absolutely Positioned Active Window */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              transform: `translateY(${offsetY}px)`,
              display: "flex",
              flexDirection: "column",
            }}
          >
            {visibleItems.map((item) => (
              <div
                key={item.id}
                style={{
                  height: `${ITEM_HEIGHT - 10}px`, // Subtracting gap/padding offset
                  padding: "8px 12px",
                  marginBottom: "10px",
                  background: "#f8f9fa",
                  borderLeft: "4px solid #0066cc",
                  borderRadius: "4px",
                  boxSizing: "border-box",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    fontWeight: "bold",
                    fontSize: "0.85rem",
                    color: "#333",
                  }}
                >
                  {item.title}
                </div>
                <div
                  style={{
                    fontSize: "0.75rem",
                    color: "#666",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {item.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VirtualizedList;
