import React, { useState, useEffect, useRef } from "react";

const MENU_ITEMS = [
  { id: "cut", label: "Cut", icon: "✂️", shortcut: "⌘X" },
  { id: "copy", label: "Copy", icon: "📋", shortcut: "⌘C" },
  { id: "paste", label: "Paste", icon: "📥", shortcut: "⌘V" },
  { id: "delete", label: "Delete", icon: "🗑️", shortcut: "DEL", danger: true },
];

const ContextMenu = () => {
  const [menuConfig, setMenuConfig] = useState({ visible: false, x: 0, y: 0 });
  const menuRef = useRef(null);

  // 1. Right-Click Context Menu Trigger & Collision Position Calculation
  const handleContextMenu = (e) => {
    e.preventDefault();

    const mouseX = e.clientX;
    const mouseY = e.clientY;

    // Approximate menu dimensions before DOM paint for alignment
    const menuWidth = 180;
    const menuHeight = 160;

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // Prevent overflow on Right / Bottom edges
    const adjustedX =
      mouseX + menuWidth > viewportWidth ? mouseX - menuWidth : mouseX;
    const adjustedY =
      mouseY + menuHeight > viewportHeight ? mouseY - menuHeight : mouseY;

    setMenuConfig({
      visible: true,
      x: adjustedX,
      y: adjustedY,
    });
  };

  // 2. Global Event Cleanup (Close menu on Outside Click, Window Scroll, or Escape)
  useEffect(() => {
    const handleClose = () => {
      setMenuConfig((prev) =>
        prev.visible ? { ...prev, visible: false } : prev,
      );
    };

    const handleKeyDown = (e) => {
      if (e.key === "Escape") handleClose();
    };

    if (menuConfig.visible) {
      document.addEventListener("click", handleClose);
      document.addEventListener("contextmenu", handleClose);
      window.addEventListener("scroll", handleClose, true);
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("click", handleClose);
      document.removeEventListener("contextmenu", handleClose);
      window.removeEventListener("scroll", handleClose, true);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuConfig.visible]);

  const handleActionClick = (actionId) => {
    alert(`Executed action: ${actionId}`);
    setMenuConfig({ visible: false, x: 0, y: 0 });
  };

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h3>Context Menu with Collision Detection</h3>

      {/* Target Interaction Canvas Box */}
      <div
        onContextMenu={handleContextMenu}
        style={{
          width: "100%",
          height: "300px",
          background: "#f4f5f7",
          border: "2px dashed #0066cc",
          borderRadius: "8px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#555",
          userSelect: "none",
        }}
      >
        Right-click anywhere inside this box (try near edges)
      </div>

      {/* Context Menu Overlay Node */}
      {menuConfig.visible && (
        <div
          ref={menuRef}
          style={{
            position: "fixed",
            top: `${menuConfig.y}px`,
            left: `${menuConfig.x}px`,
            width: "180px",
            background: "#fff",
            border: "1px solid #ddd",
            borderRadius: "6px",
            boxShadow: "0 8px 16px rgba(0,0,0,0.15)",
            zIndex: 1000,
            padding: "4px 0",
          }}
        >
          {MENU_ITEMS.map((item) => (
            <div
              key={item.id}
              onClick={() => handleActionClick(item.label)}
              style={{
                padding: "8px 12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                fontSize: "0.85rem",
                cursor: "pointer",
                color: item.danger ? "#d32f2f" : "#333",
                transition: "background 0.1s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = item.danger
                  ? "#ffebee"
                  : "#f0f0f0";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
              }}
            >
              <span
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </span>
              <span style={{ fontSize: "0.75rem", color: "#888" }}>
                {item.shortcut}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ContextMenu;
