import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';

function NameForm() {
  const [name, setName] = useState("");

  const handleChange = (event) => {
    setName(event.target.value);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>React Input State Example</h2>
      <input
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={handleChange}
      />
      <p style={{ marginTop: '20px' }}>
        {name ? `Hello, ${name}!` : "Please enter your name."}
      </p>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<NameForm />);
