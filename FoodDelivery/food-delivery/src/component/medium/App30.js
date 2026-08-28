import React, { useState } from "react";

const initialTasks = [
  { id: "1", title: "Design Context Menu Specs", status: "todo" },
  { id: "2", title: "Optimize List Virtualization", status: "todo" },
  { id: "3", title: "Implement Auth Middleware", status: "inProgress" },
  { id: "4", title: "Deploy Production Build v2.1", status: "done" },
];

const columns = [
  { id: "todo", title: "To Do", badgeColor: "#e3f2fd", textColor: "#0d47a1" },
  {
    id: "inProgress",
    title: "In Progress",
    badgeColor: "#fff3e0",
    textColor: "#e65100",
  },
  { id: "done", title: "Done", badgeColor: "#e8f5e9", textColor: "#1b5e20" },
];

const KanbanBoard = () => {
  const [tasks, setTasks] = useState(initialTasks);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [draggedTaskId, setDraggedTaskId] = useState(null);

  // 1. Drag & Drop Event Handlers
  const handleDragStart = (e, taskId) => {
    setDraggedTaskId(taskId);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e) => {
    e.preventDefault(); // Necessary to allow dropping
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e, targetStatus) => {
    e.preventDefault();
    if (!draggedTaskId) return;

    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === draggedTaskId ? { ...task, status: targetStatus } : task,
      ),
    );
    setDraggedTaskId(null);
  };

  // 2. Task Management Actions
  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    const newTask = {
      id: Date.now().toString(),
      title: newTaskTitle.trim(),
      status: "todo",
    };

    setTasks((prev) => [...prev, newTask]);
    setNewTaskTitle("");
  };

  const handleDeleteTask = (taskId) => {
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
  };

  return (
    <div
      style={{ padding: "20px", fontFamily: "sans-serif", maxWidth: "800px" }}
    >
      <h3>Kanban Task Workflow Board</h3>

      {/* Add Task Input Form */}
      <form
        onSubmit={handleAddTask}
        style={{ display: "flex", gap: "10px", marginBottom: "20px" }}
      >
        <input
          type="text"
          placeholder="Enter new task title..."
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          style={{
            flex: 1,
            padding: "8px 12px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            fontSize: "0.9rem",
          }}
        />
        <button
          type="submit"
          style={{
            padding: "8px 16px",
            background: "#0066cc",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Add Task
        </button>
      </form>

      {/* Kanban Columns Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "16px",
        }}
      >
        {columns.map((col) => {
          const colTasks = tasks.filter((t) => t.status === col.id);

          return (
            <div
              key={col.id}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, col.id)}
              style={{
                background: "#f4f5f7",
                borderRadius: "8px",
                padding: "12px",
                minHeight: "350px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* Column Header */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "12px",
                }}
              >
                <h4 style={{ margin: 0, fontSize: "0.95rem" }}>{col.title}</h4>
                <span
                  style={{
                    background: col.badgeColor,
                    color: col.textColor,
                    padding: "2px 8px",
                    borderRadius: "12px",
                    fontSize: "0.75rem",
                    fontWeight: "bold",
                  }}
                >
                  {colTasks.length}
                </span>
              </div>

              {/* Card List Area */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                  flex: 1,
                }}
              >
                {colTasks.map((task) => (
                  <div
                    key={task.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, task.id)}
                    style={{
                      background: "#fff",
                      padding: "12px",
                      borderRadius: "6px",
                      boxShadow: "0 1px 3px rgba(0,0,0,0.12)",
                      cursor: "grab",
                      border: "1px solid #e0e0e0",
                      opacity: draggedTaskId === task.id ? 0.5 : 1,
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <span style={{ fontSize: "0.88rem", color: "#333" }}>
                      {task.title}
                    </span>
                    <button
                      onClick={() => handleDeleteTask(task.id)}
                      style={{
                        background: "none",
                        border: "none",
                        color: "#999",
                        cursor: "pointer",
                        fontSize: "0.85rem",
                      }}
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default KanbanBoard;
