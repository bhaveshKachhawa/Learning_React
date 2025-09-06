import React, { useState } from "react";
import ReactDOM from "react-dom/client";

function PasswordGenerator() {
  const [password, setPassword] = useState("");

  const generatePassword = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
    let pass = "";
    for (let i = 0; i < 8; i++) {
      pass += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setPassword(pass);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Password Generator</h2>
      <input type="text" value={password} readOnly style={{ textAlign: "center", width: "200px" }} />
      <div style={{ marginTop: "10px" }}>
        <button onClick={generatePassword}>Generate</button>
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<PasswordGenerator />);
