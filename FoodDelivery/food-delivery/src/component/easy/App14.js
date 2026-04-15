import React, { useState } from "react";

const PasswordStrength = () => {
  const [password, setPassword] = useState("");

  const evaluateStrength = (val) => {
    let score = 0;
    if (val.length > 6) score++;
    if (/[A-Z]/.test(val)) score++;
    if (/[0-9]/.test(val)) score++;
    if (/[^A-Za-z0-9]/.test(val)) score++;
    return score;
  };

  const strength = evaluateStrength(password);
  const colors = ["#ddd", "#ff4d4d", "#ffa500", "#99cc33", "#2eb82e"];
  const labels = ["Very Weak", "Weak", "Fair", "Good", "Strong"];

  return (
    <div
      style={{ padding: "20px", maxWidth: "300px", fontFamily: "sans-serif" }}
    >
      <input
        type="password"
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "10px",
          borderRadius: "4px",
          border: "1px solid #ccc",
        }}
      />

      <div style={{ display: "flex", gap: "5px", marginBottom: "5px" }}>
        {[1, 2, 3, 4].map((box) => (
          <div
            key={box}
            style={{
              height: "8px",
              flex: 1,
              borderRadius: "4px",
              background: strength >= box ? colors[strength] : "#eee",
              transition: "background 0.3s",
            }}
          />
        ))}
      </div>

      <p style={{ fontSize: "0.85rem", color: colors[strength] }}>
        {password ? labels[strength] : "Enter a password"}
      </p>
    </div>
  );
};

export default PasswordStrength;
