import React, { useState, useEffect } from 'react';

const App6 = () => {
  const [target, setTarget] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [message, setMessage] = useState('');
  
  // Initialize game
  const initGame = () => {
    setTarget(Math.floor(Math.random() * 101)); // 0 to 100
    setUserInput('');
    setMessage('');
  };

  useEffect(() => {
    initGame();
  }, []);

  const handleCheck = () => {
    const num = parseInt(userInput);
    if (isNaN(num)) return;

    if (num === target) {
      setMessage('🎉 Correct! You got it.');
    } else if (num < target) {
      setMessage('Too low! Try again.');
    } else {
      setMessage('Too high! Try again.');
    }
  };

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    fontFamily: 'sans-serif',
    backgroundColor: '#fff',
  };

  const inputStyle = {
    width: '400px',
    padding: '15px',
    fontSize: '20px',
    textAlign: 'center',
    border: '1px solid #ccc',
    marginBottom: '20px',
  };

  const buttonGroup = {
    display: 'flex',
    gap: '20px',
    width: '430px',
  };

  const btnBase = {
    flex: 1,
    padding: '12px',
    fontSize: '18px',
    border: 'none',
    cursor: 'pointer',
    backgroundColor: '#efefef',
    color: '#000',
  };

  return (
    <div style={containerStyle}>
      <h1 style={{ fontSize: '36px', fontWeight: 'normal', marginBottom: '40px' }}>
        Guess the number
      </h1>
      
      <p style={{ marginBottom: '15px', fontSize: '18px' }}>
        Guess a Number between 0 and 100
      </p>

      <input
        type="number"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        style={inputStyle}
      />

      <div style={buttonGroup}>
        <button onClick={initGame} style={btnBase}>Reset</button>
        <button onClick={handleCheck} style={btnBase}>Check</button>
      </div>

      {message && (
        <p style={{ marginTop: '20px', fontWeight: 'bold', fontSize: '1.2rem' }}>
          {message}
        </p>
      )}
    </div>
  );
};

export default App6;