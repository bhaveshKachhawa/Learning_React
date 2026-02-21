import React, { useState } from 'react';

const ColorFlipper = () => {
  const [color, setColor] = useState('#FFFFFF');

  // Function to generate a random Hex color
  const generateRandomColor = () => {
    const hexChars = '0123456789ABCDEF';
    let newColor = '#';
    for (let i = 0; i < 6; i++) {
      newColor += hexChars[Math.floor(Math.random() * 16)];
    }
    setColor(newColor);
  };

  const containerStyle = {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: color, // The "Magic" line
    transition: 'background-color 0.3s ease', // Smooth transition
    fontFamily: 'Arial, sans-serif'
  };

  const badgeStyle = {
    backgroundColor: '#333',
    color: '#fff',
    padding: '10px 20px',
    borderRadius: '8px',
    fontSize: '24px',
    marginBottom: '20px'
  };

  const buttonStyle = {
    padding: '12px 24px',
    fontSize: '18px',
    cursor: 'pointer',
    borderRadius: '5px',
    border: '2px solid #333',
    backgroundColor: 'transparent',
    fontWeight: 'bold'
  };

  return (
    <div style={containerStyle}>
      <div style={badgeStyle}>
        Background Color: <span style={{ color: color }}>{color}</span>
      </div>
      
      <button style={buttonStyle} onClick={generateRandomColor}>
        CLICK ME
      </button>
    </div>
  );
};

export default ColorFlipper;