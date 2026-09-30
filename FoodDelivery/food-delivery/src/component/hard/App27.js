import React, { useState, useRef, useEffect } from "react";

// Generate 100,000 mock rows x 6 columns
const TOTAL_ROWS = 100000;
const ROW_HEIGHT = 35; // Fixed height in pixels per row
const VISIBLE_HEIGHT = 400; // Fixed viewport container height
const BUFFER_ITEMS = 5; // Extra offscreen rows rendered to prevent blank flicker

const COLUMNS = [
  { id: "id", label: "ID", width: 80 },
  { id: "name", label: "Name", width: 180 },
  { id: "role", label: "Role", width: 140 },
  { id: "department", label: "Department", width: 160 },
  { id: "status", label: "Status", width: 120 },
  { id: "salary", label: "Salary", width: 120 },
];

// Generate row data on demand (0-indexed)
const getRowData = (index) => ({
  id: `#${index + 1}`,
  name: `User ${index + 1}`,
  role: ["Engineer", "Designer", "Product Manager", "Analyst"][index % 4],
  department: ["Core Dev", "Product", "Growth", "Operations"][index % 4],
  status: index % 3 === 0 ? "Active" : index % 3 === 1 ? "Pending" : "Offline",
  salary: `$${((index % 50) * 2000 + 50000).toLocaleString()}`,
});

const VirtualizedDataGrid = () => {
  const [scrollTop, setScrollTop] = useState(0);
  const containerRef = useRef(null);

  const handleScroll = (e) => {
    setScrollTop(e.currentTarget.scrollTop);
  };

  // 1. Calculate Virtual Window Indexes
  const totalHeight = TOTAL_ROWS * ROW_HEIGHT;

  // First visible row based on scroll position
  const startIndex = Math.max(
    0,
    Math.floor(scrollTop / ROW_HEIGHT) - BUFFER_ITEMS,
  );

  // Last visible row based on viewport height
  const endIndex = Math.min(
    TOTAL_ROWS - 1,
    Math.floor((scrollTop + VISIBLE_HEIGHT) / ROW_HEIGHT) + BUFFER_ITEMS,
  );

  // 2. Slice sliceable subset of data items (Renders ~20 DOM rows instead of 100,000)
  const visibleRows = [];
  for (let i = startIndex; i <= endIndex; i++) {
    visibleRows.push({
      index: i,
      data: getRowData(i),
      top: i * ROW_HEIGHT,
    });
  }

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h3>Virtualized Data Grid (100,000 Rows)</h3>
      <p style={{ fontSize: "0.85rem", color: "#666" }}>
        Renders only <strong>~{visibleRows.length}</strong> active DOM nodes at
        any time using calculated absolute offsets.
      </p>

      {/* Outer Scrollable Container */}
      <div
        ref={containerRef}
        onScroll={handleScroll}
        style={{
          height: `${VISIBLE_HEIGHT}px`,
          overflowY: "auto",
          border: "1px solid #ccc",
          borderRadius: "6px",
          position: "relative",
          background: "#fff",
        }}
      >
        {/* Sticky Header Layer */}
        <div
          style={{
            position: "sticky",
            top: 0,
            zIndex: 10,
            display: "flex",
            background: "#f1f3f5",
            borderBottom: "2px solid #ddd",
            fontWeight: "bold",
            fontSize: "0.85rem",
            color: "#495057",
          }}
        >
          {COLUMNS.map((col) => (
            <div
              key={col.id}
              style={{
                width: `${col.width}px`,
                padding: "8px 12px",
                boxSizing: "border-box",
              }}
            >
              {col.label}
            </div>
          ))}
        </div>

        {/* Scroll Placeholder Canvas (Expands scrollbar to true 100k height) */}
        <div style={{ height: `${totalHeight}px`, position: "relative" }}>
          {/* Virtual Window Absolute Row Layer */}
          {visibleRows.map(({ index, data, top }) => (
            <div
              key={index}
              style={{
                position: "absolute",
                top: `${top}px`,
                left: 0,
                right: 0,
                height: `${ROW_HEIGHT}px`,
                display: "flex",
                alignItems: "center",
                borderBottom: "1px solid #eee",
                fontSize: "0.85rem",
                background: index % 2 === 0 ? "#ffffff" : "#f8f9fa",
              }}
            >
              {COLUMNS.map((col) => (
                <div
                  key={col.id}
                  style={{
                    width: `${col.width}px`,
                    padding: "0 12px",
                    boxSizing: "border-box",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {data[col.id]}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VirtualizedDataGrid;
