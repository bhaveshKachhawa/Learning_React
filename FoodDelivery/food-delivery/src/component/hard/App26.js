import React, { useState, useRef, useEffect } from "react";

const ResizableSplitPane = () => {
  const [leftWidthPercent, setLeftWidthPercent] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging || !containerRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      const mouseXRelativeToContainer = e.clientX - containerRect.left;

      // Calculate width percentage relative to container width
      let newPercent = (mouseXRelativeToContainer / containerRect.width) * 100;

      // Clamp split bounds between 15% and 85% to prevent collapse
      if (newPercent < 15) newPercent = 15;
      if (newPercent > 85) newPercent = 85;

      setLeftWidthPercent(newPercent);
    };

    const handleMouseUp = () => {
      if (isDragging) {
        setIsDragging(false);
      }
    };

    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      // Disable text selection globally while dragging
      document.body.style.userSelect = "none";
      document.body.style.cursor = "col-resize";
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      document.body.style.userSelect = "unset";
      document.body.style.cursor = "default";
    };
  }, [isDragging]);

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h3>Resizable Split-Pane Editor</h3>
      <p style={{ fontSize: "0.85rem", color: "#666" }}>
        Drag the vertical separator handle to resize editor panels dynamically.
      </p>

      {/* Outer Split Container */}
      <div
        ref={containerRef}
        style={{
          display: "flex",
          width: "100%",
          height: "350px",
          border: "1px solid #ccc",
          borderRadius: "8px",
          overflow: "hidden",
          position: "relative",
        }}
      >
        {/* Left Pane */}
        <div
          style={{
            width: `${leftWidthPercent}%`,
            background: "#1e1e1e",
            color: "#d4d4d4",
            padding: "16px",
            boxSizing: "border-box",
            overflow: "auto",
          }}
        >
          <h4 style={{ margin: "0 0 8px 0", color: "#569cd6" }}>
            // Code Editor
          </h4>
          <pre
            style={{ fontSize: "0.85rem", margin: 0, fontFamily: "monospace" }}
          >
            {`function calculateTotal(items) {
  return items.reduce(
    (acc, item) => acc + item.price,
    0
  );
}`}
          </pre>
        </div>

        {/* Draggable Divider Handle */}
        <div
          onMouseDown={() => setIsDragging(true)}
          style={{
            width: "8px",
            background: isDragging ? "#0066cc" : "#e0e0e0",
            cursor: "col-resize",
            transition: "background 0.15s ease",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 10,
          }}
        >
          {/* Visual Grip Bars */}
          <div
            style={{
              width: "2px",
              height: "20px",
              background: isDragging ? "#fff" : "#999",
              borderRadius: "1px",
            }}
          />
        </div>

        {/* Right Pane */}
        <div
          style={{
            width: `${100 - leftWidthPercent}%`,
            background: "#f8f9fa",
            color: "#333",
            padding: "16px",
            boxSizing: "border-box",
            overflow: "auto",
          }}
        >
          <h4 style={{ margin: "0 0 8px 0", color: "#2e7d32" }}>
            Preview / Output
          </h4>
          <div style={{ fontSize: "0.9rem", color: "#555" }}>
            <div>
              Current Pane Split Ratio:{" "}
              <strong>{leftWidthPercent.toFixed(1)}%</strong> /{" "}
              <strong>{(100 - leftWidthPercent).toFixed(1)}%</strong>
            </div>
            <div
              style={{
                marginTop: "12px",
                padding: "10px",
                background: "#fff",
                border: "1px solid #ddd",
                borderRadius: "4px",
              }}
            >
              Execution Result: <code>Total: $0.00</code>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResizableSplitPane;
