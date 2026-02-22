import React, { useState } from 'react';

const Counter = () => {
  const [count, setCount] = useState(0);

  // Styling logic based on the count value
  const getCountColor = () => {
    if (count > 0) return '#2ecc71'; // Green
    if (count < 0) return '#e74c3c'; // Red
    return '#2c3e50'; // Dark Blue/Gray
  };

  const containerStyle = {
    textAlign: 'center',
    padding: '100px',
    fontFamily: 'Arial, sans-serif'
  };

  const numberStyle = {
    fontSize: '80px',
    fontWeight: 'bold',
    color: getCountColor(),
    margin: '20px 0'
  };

  const btnStyle = {
    padding: '10px 25px',
    margin: '0 10px',
    fontSize: '18px',
    cursor: 'pointer',
    borderRadius: '5px',
    border: '1px solid #ddd',
    backgroundColor: '#f8f9fa'
  };

  return (
    <div style={containerStyle}>
      <h1>Simple Counter</h1>
      
      <div style={numberStyle}>{count}</div>
      
      <div>
        <button style={btnStyle} onClick={() => setCount(count - 1)}>Decrease</button>
        <button style={btnStyle} onClick={() => setCount(0)}>Reset</button>
        <button style={btnStyle} onClick={() => setCount(count + 1)}>Increase</button>
      </div>
    </div>
  );
};

export default Counter;