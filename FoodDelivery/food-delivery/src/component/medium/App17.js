import React, { useState, useRef, useEffect } from "react";

const ResizablePanels = () => {
  const [sidebarWidth, setSidebarWidth] = useState(250);
  const [isResizing, setIsResizing] = useState(false);
  const containerRef = useRef(null);

  const startResizing = () => {
    setIsResizing(true);
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isResizing || !containerRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      const newWidth = e.clientX - containerRect.left;

      if (newWidth > 150 && newWidth < 600) {
        setSidebarWidth(newWidth);
      }
    };

    const stopResizing = () => {
      setIsResizing(false);
    };

    if (isResizing) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", stopResizing);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", stopResizing);
    };
  }, [isResizing]);

  return (
    <div
      ref={containerRef}
      style={{
        display: "flex",
        width: "100%",
        height: "400px",
        border: "1px solid #ccc",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          width: `${sidebarWidth}px`,
          background: "#f5f5f5",
          padding: "15px",
          boxSizing: "border-box",
          overflow: "hidden",
        }}
      >
        <h4>Navigation Panel</h4>
        <p>Drag the border line to adjust width tracks.</p>
      </div>

      <div
        onMouseDown={startResizing}
        style={{
          width: "6px",
          cursor: "col-resize",
          background: isResizing ? "#0066cc" : "#e0e0e0",
          transition: "background 0.2s ease",
        }}
      />

      <div style={{ flex: 1, padding: "15px", boxSizing: "border-box" }}>
        <h4>Main Workspace View</h4>
        <p>
          Current panel footprint layout width allocation:{" "}
          {Math.round(sidebarWidth)}px
        </p>
      </div>
    </div>
  );
};

export default ResizablePanels;
