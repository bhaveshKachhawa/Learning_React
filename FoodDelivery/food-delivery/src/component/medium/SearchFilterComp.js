import React, { useState } from "react";

const UserSearch = () => {
  const [query, setQuery] = useState("");

  const users = [
    "Bhuvnesh Chouhan",
    "Shafi Mentor",
    "Alice Brown",
    "Charlie Davis",
    "Edward Wilson",
    "Fiona Clarke",
  ];

  const filteredUsers = users.filter((user) =>
    user.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <div style={styles.card}>
      <h3>User Directory</h3>

      <input
        type="text"
        placeholder="Search names..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={styles.input}
      />

      <ul style={styles.list}>
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user, index) => (
            <li key={index} style={styles.item}>
              {user}
            </li>
          ))
        ) : (
          <li style={styles.noResult}>No users found</li>
        )}
      </ul>
    </div>
  );
};

const styles = {
  card: {
    padding: "20px",
    maxWidth: "300px",
    margin: "20px auto",
    border: "1px solid #ddd",
    borderRadius: "8px",
    fontFamily: "sans-serif",
  },
  input: {
    width: "100%",
    padding: "8px",
    marginBottom: "15px",
    boxSizing: "border-box",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  list: { listStyle: "none", padding: 0 },
  item: { padding: "8px 0", borderBottom: "1px solid #eee" },
  noResult: { color: "#888", fontStyle: "italic", marginTop: "10px" },
};

export default UserSearch;
