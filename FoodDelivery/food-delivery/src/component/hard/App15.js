import React, { useState } from "react";

const KanbanBoard = () => {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Review PRs", status: "todo" },
    { id: 2, title: "Fix memory leak", status: "inProgress" },
    { id: 3, title: "Deploy to production", status: "done" },
  ]);

  const columns = [
    { id: "todo", title: "To Do", bg: "#ffebee" },
    { id: "inProgress", title: "In Progress", bg: "#e3f2fd" },
    { id: "done", title: "Done", bg: "#e8f5e9" },
  ];

  const moveTask = (taskId, newStatus) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task,
      ),
    );
  };

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h3>Project Board</h3>
      <div style={{ display: "flex", gap: "20px" }}>
        {columns.map((col) => (
          <div
            key={col.id}
            style={{
              flex: 1,
              background: col.bg,
              padding: "15px",
              borderRadius: "8px",
              minHeight: "300px",
            }}
          >
            <h4>{col.title}</h4>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              {tasks
                .filter((task) => task.status === col.id)
                .map((task) => (
                  <div
                    key={task.id}
                    style={{
                      background: "#fff",
                      padding: "10px",
                      borderRadius: "4px",
                      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                    }}
                  >
                    <p style={{ margin: "0 0 10px 0" }}>{task.title}</p>
                    <div style={{ display: "flex", gap: "5px" }}>
                      {columns
                        .filter((c) => c.id !== task.status)
                        .map((c) => (
                          <button
                            key={c.id}
                            onClick={() => moveTask(task.id, c.id)}
                            style={{
                              fontSize: "0.75rem",
                              padding: "2px 6px",
                              cursor: "pointer",
                            }}
                          >
                            → {c.title}
                          </button>
                        ))}
                    </div>
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
