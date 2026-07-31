import React, { useState } from "react";

const initialData = {
  todo: [
    { id: "1", title: "Prepare for Infosys Interview" },
    { id: "2", title: "Practice React Machine Coding" },
  ],
  inProgress: [{ id: "3", title: "Build Custom Kanban Board" }],
  done: [{ id: "4", title: "Submit Application Form" }],
};

const KanbanBoard = () => {
  const [boardData, setBoardData] = useState(initialData);
  const [draggedItem, setDraggedItem] = useState(null);

  // Triggered when user starts dragging an item
  const handleDragStart = (e, item, sourceColumn) => {
    setDraggedItem({ item, sourceColumn });
    e.dataTransfer.setData("text/plain", item.id);
  };

  // Allow drop target
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // Triggered when dropping an item into a target column
  const handleDrop = (e, targetColumn) => {
    e.preventDefault();
    if (!draggedItem) return;

    const { item, sourceColumn } = draggedItem;

    if (sourceColumn === targetColumn) return;

    setBoardData((prev) => {
      // Remove item from source column
      const updatedSource = prev[sourceColumn].filter((i) => i.id !== item.id);
      // Add item to target column
      const updatedTarget = [...prev[targetColumn], item];

      return {
        ...prev,
        [sourceColumn]: updatedSource,
        [targetColumn]: updatedTarget,
      };
    });

    setDraggedItem(null);
  };

  const columns = [
    { key: "todo", title: "Applied / To Do", color: "#e3f2fd" },
    { key: "inProgress", title: "In Progress", color: "#fff3e0" },
    { key: "done", title: "Shortlisted / Completed", color: "#e8f5e9" },
  ];

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h3>Kanban Job Tracker</h3>
      <div
        style={{
          display: "flex",
          gap: "15px",
          width: "100%",
          overflowX: "auto",
        }}
      >
        {columns.map((col) => (
          <div
            key={col.key}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, col.key)}
            style={{
              flex: 1,
              minWidth: "220px",
              background: col.color,
              padding: "15px",
              borderRadius: "8px",
              minHeight: "300px",
            }}
          >
            <h4 style={{ margin: "0 0 15px 0" }}>
              {col.title} ({boardData[col.key].length})
            </h4>

            <div
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              {boardData[col.key].map((item) => (
                <div
                  key={item.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, item, col.key)}
                  style={{
                    padding: "12px",
                    background: "#fff",
                    borderRadius: "6px",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.08)",
                    cursor: "grab",
                    fontWeight: "500",
                    border: "1px solid #ddd",
                  }}
                >
                  {item.title}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KanbanBoard;
