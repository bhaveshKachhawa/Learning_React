import React, { useState } from "react";

const SearchFilter = () => {
  const users = [
    "Alice",
    "Bob",
    "Charlie",
    "David",
    "Edward",
    "Fiona",
    "George",
  ];

  const [query, setQuery] = useState("");

  // Logic: Filter the original list based on the search state
  // We do this during the render for simplicity
  const filteredUsers = users.filter((user) =>
    user.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <div style={{ padding: "20px", maxWidth: "300px" }}>
      <input
        type="text"
        placeholder="Search names..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ padding: "8px", width: "100%", marginBottom: "10px" }}
      />

      <ul style={{ listStyle: "none", padding: 0 }}>
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user, index) => (
            <li
              key={index}
              style={{ padding: "5px 0", borderBottom: "1px solid #eee" }}
            >
              {user}
            </li>
          ))
        ) : (
          <li style={{ color: "red" }}>No matches found</li>
        )}
      </ul>
    </div>
  );
};

export default SearchFilter;
