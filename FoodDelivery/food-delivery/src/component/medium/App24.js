import React, { useState, useCallback } from "react";

// Custom Hook to manage State with History Tracking
const useHistoryState = (initialValue) => {
  const [history, setHistory] = useState([initialValue]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const state = history[currentIndex];

  const setState = useCallback(
    (newValue) => {
      // Resolve value if functional update is passed
      const resolvedValue =
        typeof newValue === "function"
          ? newValue(history[currentIndex])
          : newValue;

      if (resolvedValue === history[currentIndex]) return;

      // Slice history up to current index (discards redos if new action occurs)
      const updatedHistory = history.slice(0, currentIndex + 1);
      setHistory([...updatedHistory, resolvedValue]);
      setCurrentIndex(updatedHistory.length);
    },
    [history, currentIndex],
  );

  const undo = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  }, [currentIndex]);

  const redo = useCallback(() => {
    if (currentIndex < history.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  }, [currentIndex, history.length]);

  return {
    state,
    setState,
    undo,
    redo,
    canUndo: currentIndex > 0,
    canRedo: currentIndex < history.length - 1,
  };
};

// Usage Component
const NotesEditor = () => {
  const {
    state: text,
    setState: setText,
    undo,
    redo,
    canUndo,
    canRedo,
  } = useHistoryState("Initial note text...");

  return (
    <div
      style={{ padding: "20px", fontFamily: "sans-serif", maxWidth: "500px" }}
    >
      <h3>Rich Notes Editor (Undo / Redo)</h3>

      {/* Control Actions */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
        <button
          onClick={undo}
          disabled={!canUndo}
          style={{
            padding: "6px 12px",
            cursor: canUndo ? "pointer" : "not-allowed",
          }}
        >
          ↩ Undo
        </button>
        <button
          onClick={redo}
          disabled={!canRedo}
          style={{
            padding: "6px 12px",
            cursor: canRedo ? "pointer" : "not-allowed",
          }}
        >
          ↪ Redo
        </button>
      </div>

      {/* Text Area Input */}
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={6}
        style={{
          width: "100%",
          padding: "10px",
          borderRadius: "6px",
          border: "1px solid #ccc",
          boxSizing: "border-box",
        }}
      />
    </div>
  );
};

export default NotesEditor;
