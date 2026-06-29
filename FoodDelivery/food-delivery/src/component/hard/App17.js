import React, { useState, useEffect } from "react";

const DebouncedForm = () => {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [isValidating, setIsValidating] = useState(false);

  useEffect(() => {
    if (!username.trim()) {
      setError("");
      return;
    }

    setIsValidating(true);

    const timer = setTimeout(() => {
      setIsValidating(false);
      if (username.length < 4) {
        setError("Username must be at least 4 characters long.");
      } else if (/[^a-zA-Z0-9]/.test(username)) {
        setError("Only alphanumeric characters are allowed.");
      } else {
        setError("");
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [username]);

  return (
    <div
      style={{ padding: "20px", maxWidth: "300px", fontFamily: "sans-serif" }}
    >
      <h3>Create Account</h3>
      <div style={{ position: "relative", marginBottom: "5px" }}>
        <input
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "4px",
            border: `1px solid ${error ? "red" : "#ccc"}`,
            boxSizing: "border-box",
          }}
        />
        {isValidating && (
          <span
            style={{
              position: "absolute",
              right: "10px",
              top: "10px",
              fontSize: "0.8rem",
              color: "#666",
            }}
          >
            ⏳
          </span>
        )}
      </div>
      {error && (
        <p style={{ color: "red", fontSize: "0.85rem", margin: "5px 0 0 0" }}>
          {error}
        </p>
      )}
      {!error && username && !isValidating && (
        <p style={{ color: "green", fontSize: "0.85rem", margin: "5px 0 0 0" }}>
          ✓ Username is valid
        </p>
      )}
    </div>
  );
};

export default DebouncedForm;
