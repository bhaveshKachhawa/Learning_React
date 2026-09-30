import React, { useState, useEffect, useCallback } from "react";

// Maximum history steps to preserve in memory
const MAX_HISTORY_LIMIT = 20;

// Custom Hook for State History Management
const useUndoRedo = (initialState) => {
  // Stack containing past states
  const [past, setPast] = useState([]);
  // Current active state
  const [present, setPresent] = useState(initialState);
  // Stack containing future states (populates after undos)
  const [future, setFuture] = useState([]);

  const canUndo = past.length > 0;
  const canRedo = future.length > 0;

  // 1. Update State & Push Current State to Past Stack
  const set = useCallback(
    (newState) => {
      const resolvedState =
        typeof newState === "function" ? newState(present) : newState;

      // Ignore identical consecutive states
      if (JSON.stringify(resolvedState) === JSON.stringify(present)) return;

      setPast((prevPast) => {
        const updatedPast = [...prevPast, present];
        // Enforce maximum stack memory limit
        if (updatedPast.length > MAX_HISTORY_LIMIT) {
          return updatedPast.slice(updatedPast.length - MAX_HISTORY_LIMIT);
        }
        return updatedPast;
      });

      setPresent(resolvedState);
      // Any new modification clears future redo branch
      setFuture([]);
    },
    [present],
  );

  // 2. Pop Last Item from Past -> Push Present to Future
  const undo = useCallback(() => {
    if (!canUndo) return;

    setPast((prevPast) => {
      const previousState = prevPast[prevPast.length - 1];
      const newPast = prevPast.slice(0, prevPast.length - 1);

      setFuture((prevFuture) => [present, ...prevFuture]);
      setPresent(previousState);

      return newPast;
    });
  }, [canUndo, present]);

  // 3. Shift First Item from Future -> Push Present to Past
  const redo = useCallback(() => {
    if (!canRedo) return;

    setFuture((prevFuture) => {
      const nextState = prevFuture[0];
      const newFuture = prevFuture.slice(1);

      setPast((prevPast) => [...prevPast, present]);
      setPresent(nextState);

      return newFuture;
    });
  }, [canRedo, present]);

  return {
    state: present,
    set,
    undo,
    redo,
    canUndo,
    canRedo,
    pastCount: past.length,
    futureCount: future.length,
  };
};

// Application Component: Drawing Canvas / Canvas Layout Editor
const CanvasEditor = () => {
  const {
    state: boxes,
    set: setBoxes,
    undo,
    redo,
    canUndo,
    canRedo,
    pastCount,
    futureCount,
  } = useUndoRedo([
    { id: "1", label: "Header Block", color: "#e3f2fd", x: 20, y: 20 },
    { id: "2", label: "Sidebar Menu", color: "#f3e5f5", x: 220, y: 20 },
  ]);

  // Global Keyboard listener for Cmd+Z / Cmd+Shift+Z / Ctrl+Y
  useEffect(() => {
    const handleKeyDown = (e) => {
      const isCmdOrCtrl = e.metaKey || e.ctrlKey;
      if (!isCmdOrCtrl) return;

      if (e.key.toLowerCase() === "z") {
        if (e.shiftKey) {
          e.preventDefault();
          redo();
        } else {
          e.preventDefault();
          undo();
        }
      } else if (e.key.toLowerCase() === "y") {
        e.preventDefault();
        redo();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [undo, redo]);

  const addBox = () => {
    const colors = ["#e8f5e9", "#fff3e0", "#fbe9e7", "#e0f2f1"];
    const newBox = {
      id: Date.now().toString(),
      label: `Block #${boxes.length + 1}`,
      color: colors[Math.floor(Math.random() * colors.length)],
      x: Math.floor(Math.random() * 200) + 20,
      y: Math.floor(Math.random() * 100) + 80,
    };
    setBoxes([...boxes, newBox]);
  };

  const removeBox = (id) => {
    setBoxes(boxes.filter((b) => b.id !== id));
  };

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h3>Undo/Redo State Machine Engine</h3>
      <p style={{ fontSize: "0.85rem", color: "#666" }}>
        Test with toolbar buttons or system shortcuts:{" "}
        <kbd
          style={{
            background: "#eee",
            padding: "2px 6px",
            borderRadius: "4px",
          }}
        >
          ⌘ Z
        </kbd>{" "}
        (Undo) /{" "}
        <kbd
          style={{
            background: "#eee",
            padding: "2px 6px",
            borderRadius: "4px",
          }}
        >
          ⌘ Shift Z
        </kbd>{" "}
        (Redo)
      </p>

      {/* Control Actions & History Counters */}
      <div
        style={{
          display: "flex",
          gap: "10px",
          alignItems: "center",
          marginBottom: "16px",
        }}
      >
        <button
          onClick={undo}
          disabled={!canUndo}
          style={{
            padding: "6px 12px",
            cursor: canUndo ? "pointer" : "not-allowed",
          }}
        >
          ↩️ Undo ({pastCount})
        </button>
        <button
          onClick={redo}
          disabled={!canRedo}
          style={{
            padding: "6px 12px",
            cursor: canRedo ? "pointer" : "not-allowed",
          }}
        >
          ↪️ Redo ({futureCount})
        </button>
        <button
          onClick={addBox}
          style={{
            padding: "6px 12px",
            cursor: "pointer",
            background: "#0066cc",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
          }}
        >
          ➕ Add Block
        </button>
      </div>

      {/* Interactive Editor Board Canvas */}
      <div
        style={{
          width: "100%",
          height: "280px",
          border: "1px solid #ccc",
          borderRadius: "8px",
          position: "relative",
          background: "#fafafa",
          overflow: "hidden",
        }}
      >
        {boxes.map((box) => (
          <div
            key={box.id}
            style={{
              position: "absolute",
              top: `${box.y}px`,
              left: `${box.x}px`,
              background: box.color,
              border: "1px solid rgba(0,0,0,0.15)",
              borderRadius: "6px",
              padding: "10px 14px",
              boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <span style={{ fontSize: "0.85rem", fontWeight: "bold" }}>
              {box.label}
            </span>
            <span
              onClick={() => removeBox(box.id)}
              style={{ cursor: "pointer", fontSize: "0.75rem", color: "#888" }}
            >
              ❌
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CanvasEditor;
