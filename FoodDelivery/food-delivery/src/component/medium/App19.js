import React, { useState, useRef } from "react";

const VirtualGrid = () => {
  const rowCount = 1000;
  const colCount = 1000;
  const rowHeight = 50;
  const colWidth = 120;
  const gridHeight = 400;
  const gridWidth = 600;

  const [scroll, setScroll] = useState({ top: 0, left: 0 });
  const containerRef = useRef(null);

  const handleScroll = (e) => {
    setScroll({
      top: e.target.scrollTop,
      left: e.target.scrollLeft,
    });
  };

  // Vertical calculations
  const startRow = Math.max(0, Math.floor(scroll.top / rowHeight) - 1);
  const endRow = Math.min(
    rowCount - 1,
    startRow + Math.ceil(gridHeight / rowHeight) + 2,
  );

  // Horizontal calculations
  const startCol = Math.max(0, Math.floor(scroll.left / colWidth) - 1);
  const endCol = Math.min(
    colCount - 1,
    startCol + Math.ceil(gridWidth / colWidth) + 2,
  );

  const totalHeight = rowCount * rowHeight;
  const totalWidth = colCount * colWidth;

  const visibleCells = [];
  for (let r = startRow; r <= endRow; r++) {
    for (let c = startCol; c <= endCol; c++) {
      visibleCells.push({ r, c });
    }
  }

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h3>Virtualized 2D Grid (1 Million Cells)</h3>

      {/* Viewport container */}
      <div
        ref={containerRef}
        onScroll={handleScroll}
        style={{
          height: `${gridHeight}px`,
          width: `${gridWidth}px`,
          border: "1px solid #ccc",
          overflow: "auto",
          position: "relative",
          background: "#f9f9f9",
        }}
      >
        {/* Giant dummy container to size the scrollbars */}
        <div
          style={{
            height: `${totalHeight}px`,
            width: `${totalWidth}px`,
            position: "absolute",
            top: 0,
            left: 0,
            pointerEvents: "none",
          }}
        />

        {/* Positioned container containing only the visible grid elements */}
        {visibleCells.map(({ r, c }) => (
          <div
            key={`${r}-${c}`}
            style={{
              position: "absolute",
              top: `${r * rowHeight}px`,
              left: `${c * colWidth}px`,
              width: `${colWidth}px`,
              height: `${rowHeight}px`,
              boxSizing: "border-box",
              borderRight: "1px solid #ddd",
              borderBottom: "1px solid #ddd",
              background: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "0.85rem",
              color: "#333",
            }}
          >
            R{r} : C{c}
          </div>
        ))}
      </div>
    </div>
  );
};

export default VirtualGrid;
