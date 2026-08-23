import React, { useState, useRef } from "react";

// Generate 10,000 mock data items
const BIG_DATASET = Array.from({ length: 10000 }, (_, i) => ({
  id: i + 1,
  name: `User Item #${i + 1}`,
  email: `user${i + 1}@example.com`,
  role: i % 3 === 0 ? "Admin" : i % 2 === 0 ? "Editor" : "Viewer",
}));

const VirtualizedList = ({
  items = BIG_DATASET,
  itemHeight = 50,
  containerHeight = 350,
  buffer = 3,
}) => {
  const [scrollTop, setScrollTop] = useState(0);
  const containerRef = useRef(null);

  // Total height of all items combined (for scrollbar physics)
  const totalHeight = items.length * itemHeight;

  // Calculate start & end indices based on current scroll position
  const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - buffer);
  const endIndex = Math.min(
    items.length - 1,
    Math.floor((scrollTop + containerHeight) / itemHeight) + buffer,
  );

  // Slice only the visible items
  const visibleItems = items.slice(startIndex, endIndex + 1);

  // Offset position of the visible chunk
  const offsetY = startIndex * itemHeight;

  const handleScroll = (e) => {
    setScrollTop(e.target.scrollTop);
  };

  return (
    <div
      style={{ padding: "20px", fontFamily: "sans-serif", maxWidth: "500px" }}
    >
      <h3>Virtualized List (10,000 Records)</h3>
      <p style={{ fontSize: "0.85rem", color: "#666" }}>
        Rendering items {startIndex + 1} to {endIndex + 1} of {items.length}{" "}
        (Only <strong>{visibleItems.length} DOM nodes</strong> mounted).
      </p>

      {/* Scrollable Container Window */}
      <div
        ref={containerRef}
        onScroll={handleScroll}
        style={{
          height: `${containerHeight}px`,
          overflowY: "auto",
          position: "relative",
          border: "1px solid #ccc",
          borderRadius: "8px",
          background: "#fff",
        }}
      >
        {/* Invisible Spacer defining true scroll height */}
        <div
          style={{
            height: `${totalHeight}px`,
            width: "100%",
            position: "relative",
          }}
        >
          {/* Visible Items Slice Absolute Position Container */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              transform: `translateY(${offsetY}px)`,
            }}
          >
            {visibleItems.map((item) => (
              <div
                key={item.id}
                style={{
                  height: `${itemHeight}px`,
                  boxSizing: "border-box",
                  padding: "0 16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  borderBottom: "1px solid #eee",
                  background: item.id % 2 === 0 ? "#fafafa" : "#fff",
                }}
              >
                <div>
                  <strong style={{ fontSize: "0.9rem" }}>{item.name}</strong>
                  <div style={{ fontSize: "0.75rem", color: "#888" }}>
                    {item.email}
                  </div>
                </div>
                <span
                  style={{
                    fontSize: "0.75rem",
                    padding: "3px 8px",
                    borderRadius: "12px",
                    background: "#e3f2fd",
                    color: "#0066cc",
                  }}
                >
                  {item.role}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VirtualizedList;
