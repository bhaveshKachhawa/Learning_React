import React, { useState } from "react";

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState("");
  const [filter, setFilter] = useState("all");

  const addTodo = () => {
    if (task.trim() === "") return;
    setTodos([...todos, { id: Date.now(), text: task, completed: false }]);
    setTask("");
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  return (
    <div style={styles.container}>
      <h2>Task Manager</h2>

      <div style={styles.inputArea}>
        <input
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter a task..."
          style={styles.input}
        />
        <button onClick={addTodo} style={styles.button}>
          Add
        </button>
      </div>

      <div style={styles.filterBar}>
        <button
          onClick={() => setFilter("all")}
          style={filter === "all" ? styles.activeFilter : styles.filterBtn}
        >
          All
        </button>
        <button
          onClick={() => setFilter("active")}
          style={filter === "active" ? styles.activeFilter : styles.filterBtn}
        >
          Active
        </button>
        <button
          onClick={() => setFilter("completed")}
          style={
            filter === "completed" ? styles.activeFilter : styles.filterBtn
          }
        >
          Completed
        </button>
      </div>

      <ul style={styles.list}>
        {filteredTodos.map((todo) => (
          <li key={todo.id} style={styles.item}>
            <span
              onClick={() => toggleTodo(todo.id)}
              style={{
                ...styles.text,
                textDecoration: todo.completed ? "line-through" : "none",
              }}
            >
              {todo.text}
            </span>
            <button
              onClick={() => deleteTodo(todo.id)}
              style={styles.deleteBtn}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "400px",
    margin: "50px auto",
    fontFamily: "Arial",
    textAlign: "center",
  },
  inputArea: { display: "flex", gap: "10px", marginBottom: "20px" },
  input: { flex: 1, padding: "8px" },
  button: {
    padding: "8px 15px",
    cursor: "pointer",
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
  },
  filterBar: {
    marginBottom: "20px",
    display: "flex",
    justifyContent: "center",
    gap: "10px",
  },
  filterBtn: {
    padding: "5px 10px",
    cursor: "pointer",
    border: "1px solid #ccc",
    background: "#f9f9f9",
  },
  activeFilter: {
    padding: "5px 10px",
    cursor: "pointer",
    border: "1px solid #007bff",
    background: "#007bff",
    color: "#fff",
  },
  list: { listStyle: "none", padding: 0 },
  item: {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px",
    borderBottom: "1px solid #eee",
  },
  text: { cursor: "pointer", flex: 1, textAlign: "left" },
  deleteBtn: {
    color: "red",
    border: "none",
    background: "none",
    cursor: "pointer",
  },
};

export default TodoApp;
