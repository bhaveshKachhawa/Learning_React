import React, { useState, useRef, useEffect } from "react";

const SplitPane = ({ minLeftWidthPercent = 15, maxLeftWidthPercent = 85 }) => {
  const [leftWidthPercent, setLeftWidthPercent] = useState(30);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging || !containerRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      const relativeX = e.clientX - containerRect.left;

      // Calculate new percentage relative to total container width
      let newPercent = (relativeX / containerRect.width) * 100;

      // Clamp percentage within specified min/max bounds
      if (newPercent < minLeftWidthPercent) newPercent = minLeftWidthPercent;
      if (newPercent > maxLeftWidthPercent) newPercent = maxLeftWidthPercent;

      setLeftWidthPercent(newPercent);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      // Prevent text selection while dragging across panels
      document.body.style.userSelect = "none";
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.body.style.userSelect = "auto";
    };
  }, [isDragging, minLeftWidthPercent, maxLeftWidthPercent]);

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h3>Resizable Split Pane Panel</h3>

      {/* Main Outer Split Container */}
      <div
        ref={containerRef}
        style={{
          display: "flex",
          width: "100%",
          height: "350px",
          border: "1px solid #ccc",
          borderRadius: "8px",
          overflow: "hidden",
        }}
      >
        {/* Left Side Panel */}
        <div
          style={{
            width: `${leftWidthPercent}%`,
            background: "#f8f9fa",
            padding: "16px",
            boxSizing: "border-box",
            overflowY: "auto",
          }}
        >
          <h4 style={{ margin: "0 0 10px 0" }}>Sidebar Navigation</h4>
          <p style={{ fontSize: "0.85rem", color: "#666" }}>
            Current width: {leftWidthPercent.toFixed(1)}%
          </p>
          <ul
            style={{ paddingLeft: "18px", fontSize: "0.9rem", color: "#333" }}
          >
            <li>Dashboard Overview</li>
            <li>Analytics Reports</li>
            <li>System Logs</li>
            <li>Account Settings</li>
          </ul>
        </div>

        {/* Resizable Separator Divider Bar */}
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
          }}
        >
          <div
            style={{
              width: "2px",
              height: "24px",
              background: isDragging ? "#fff" : "#888",
              borderRadius: "1px",
            }}
          />
        </div>

        {/* Right Side Main Content Panel */}
        <div
          style={{
            width: `${100 - leftWidthPercent}%`,
            background: "#fff",
            padding: "16px",
            boxSizing: "border-box",
            overflowY: "auto",
          }}
        >
          <h4 style={{ margin: "0 0 10px 0" }}>Main Content Workspace</h4>
          <p style={{ fontSize: "0.9rem", color: "#555" }}>
            Drag the handle on the left to resize these panels in real-time.
          </p>
          <div
            style={{
              marginTop: "20px",
              padding: "15px",
              background: "#e3f2fd",
              borderRadius: "6px",
              fontSize: "0.85rem",
              color: "#0d47a1",
            }}
          >
            The layout automatically scales fluidly because widths are
            calculated as responsive percentages relative to the container
            bounding box.
          </div>
        </div>
      </div>
    </div>
  );
};

export default SplitPane;
