import React, { useState, useEffect, useRef } from "react";

const contextMenuItems = [
  { label: "Copy Link", action: () => alert("Link copied!"), shortcut: "⌘C" },
  {
    label: "Edit Item",
    action: () => alert("Editing item..."),
    shortcut: "⌘E",
  },
  { label: "Duplicate", action: () => alert("Duplicated!"), shortcut: "⌘D" },
  {
    label: "Delete Item",
    action: () => alert("Deleted!"),
    shortcut: "⌫",
    danger: true,
  },
];

const ContextMenu = () => {
  const [menuConfig, setMenuConfig] = useState({ visible: false, x: 0, y: 0 });
  const menuRef = useRef(null);

  const handleContextMenu = (e) => {
    e.preventDefault();

    // Viewport dimensions
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    // Estimated popover dimensions
    const menuWidth = 180;
    const menuHeight = 160;

    let posX = e.clientX;
    let posY = e.clientY;

    // Viewport collision checks: flip position if menu exceeds edges
    if (posX + menuWidth > screenWidth) {
      posX = screenWidth - menuWidth - 10;
    }

    if (posY + menuHeight > screenHeight) {
      posY = screenHeight - menuHeight - 10;
    }

    setMenuConfig({ visible: true, x: posX, y: posY });
  };

  const closeMenu = () => {
    setMenuConfig({ visible: false, x: 0, y: 0 });
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        closeMenu();
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === "Escape") closeMenu();
    };

    if (menuConfig.visible) {
      document.addEventListener("click", handleClickOutside);
      document.addEventListener("scroll", closeMenu, true);
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("scroll", closeMenu, true);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuConfig.visible]);

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h3>Custom Context Menu (Right-Click)</h3>

      {/* Target Context Canvas */}
      <div
        onContextMenu={handleContextMenu}
        style={{
          width: "100%",
          height: "250px",
          border: "2px dashed #aaa",
          borderRadius: "8px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#fafafa",
          color: "#666",
          userSelect: "none",
        }}
      >
        Right-click inside this target zone to trigger the custom context menu.
      </div>

      {/* Popover Overlay */}
      {menuConfig.visible && (
        <div
          ref={menuRef}
          style={{
            position: "fixed",
            top: `${menuConfig.y}px`,
            left: `${menuConfig.x}px`,
            width: "180px",
            background: "#fff",
            borderRadius: "6px",
            boxShadow: "0 8px 18px rgba(0,0,0,0.15)",
            border: "1px solid #e0e0e0",
            padding: "4px 0",
            zIndex: 1000,
          }}
        >
          {contextMenuItems.map((item, index) => (
            <div
              key={index}
              onClick={() => {
                item.action();
                closeMenu();
              }}
              style={{
                padding: "8px 14px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                fontSize: "0.85rem",
                cursor: "pointer",
                color: item.danger ? "#d32f2f" : "#333",
                transition: "background 0.15s ease",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = item.danger
                  ? "#ffebee"
                  : "#f0f0f0")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "transparent")
              }
            >
              <span>{item.label}</span>
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
