import React, { useState, useEffect, useRef } from "react";

const COMMANDS = [
  {
    id: "1",
    title: "Create New Issue",
    category: "Actions",
    shortcut: "C",
    icon: "➕",
  },
  {
    id: "2",
    title: "Go to Dashboard",
    category: "Navigation",
    shortcut: "G D",
    icon: "🏠",
  },
  {
    id: "3",
    title: "Toggle Dark Mode",
    category: "Preferences",
    shortcut: "T",
    icon: "🌙",
  },
  {
    id: "4",
    title: "Copy Profile Link",
    category: "Actions",
    shortcut: "⌘ C",
    icon: "🔗",
  },
  {
    id: "5",
    title: "View Keyboard Shortcuts",
    category: "Help",
    shortcut: "?",
    icon: "⌨️",
  },
  {
    id: "6",
    title: "Search Documentation",
    category: "Help",
    shortcut: "S",
    icon: "📚",
  },
];

const CommandPalette = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);

  // 1. Global Keyboard Shortcut Listener (Cmd+K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // 2. Lock background scrolling & reset query state on open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setQuery("");
      setSelectedIndex(0);
      // Focus input on render
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  // 3. Simple Fuzzy/Substring Search Filter
  const filteredCommands = COMMANDS.filter(
    (cmd) =>
      cmd.title.toLowerCase().includes(query.toLowerCase()) ||
      cmd.category.toLowerCase().includes(query.toLowerCase()),
  );

  // Reset selected index when search query changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // 4. Keyboard Traversal Logic (ArrowUp, ArrowDown, Enter, Escape)
  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      setIsOpen(false);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev < filteredCommands.length - 1 ? prev + 1 : 0,
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev > 0 ? prev - 1 : filteredCommands.length - 1,
      );
    } else if (e.key === "Enter" && filteredCommands[selectedIndex]) {
      e.preventDefault();
      handleSelectCommand(filteredCommands[selectedIndex]);
    }
  };

  const handleSelectCommand = (command) => {
    alert(`Executed action: ${command.title}`);
    setIsOpen(false);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h3>Command Palette Demo</h3>
      <p style={{ fontSize: "0.9rem", color: "#666" }}>
        Press{" "}
        <kbd
          style={{
            background: "#eee",
            padding: "2px 6px",
            borderRadius: "4px",
          }}
        >
          ⌘ K
        </kbd>{" "}
        or{" "}
        <kbd
          style={{
            background: "#eee",
            padding: "2px 6px",
            borderRadius: "4px",
          }}
        >
          Ctrl + K
        </kbd>{" "}
        to open the menu.
      </p>

      {/* Modal Backdrop & Container */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0, 0, 0, 0.4)",
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            paddingTop: "80px",
            zIndex: 1000,
          }}
        >
          {/* Palette Box */}
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "100%",
              maxWidth: "520px",
              background: "#fff",
              borderRadius: "8px",
              boxShadow: "0 12px 32px rgba(0,0,0,0.2)",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Input Header */}
            <div style={{ padding: "12px", borderBottom: "1px solid #eee" }}>
              <input
                ref={inputRef}
                type="text"
                placeholder="Type a command or search..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                style={{
                  width: "100%",
                  border: "none",
                  outline: "none",
                  fontSize: "1rem",
                  boxSizing: "border-box",
                }}
              />
            </div>

            {/* Results List */}
            <div
              style={{ maxHeight: "300px", overflowY: "auto", padding: "6px" }}
            >
              {filteredCommands.length === 0 ? (
                <div
                  style={{
                    padding: "16px",
                    color: "#888",
                    textAlign: "center",
                    fontSize: "0.85rem",
                  }}
                >
                  No commands found matching "{query}"
                </div>
              ) : (
                filteredCommands.map((command, idx) => {
                  const isSelected = idx === selectedIndex;
                  return (
                    <div
                      key={command.id}
                      onClick={() => handleSelectCommand(command)}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      style={{
                        padding: "10px 12px",
                        borderRadius: "6px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        cursor: "pointer",
                        background: isSelected ? "#e3f2fd" : "transparent",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                        }}
                      >
                        <span>{command.icon}</span>
                        <span
                          style={{
                            fontSize: "0.9rem",
                            color: isSelected ? "#0066cc" : "#333",
                            fontWeight: isSelected ? "bold" : "normal",
                          }}
                        >
                          {command.title}
                        </span>
                      </div>
                      <span
                        style={{
                          fontSize: "0.75rem",
                          background: isSelected ? "#bbdefb" : "#f0f0f0",
                          color: "#555",
                          padding: "2px 6px",
                          borderRadius: "4px",
                        }}
                      >
                        {command.shortcut}
                      </span>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommandPalette;
