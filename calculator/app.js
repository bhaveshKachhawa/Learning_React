import React, { useState } from 'react';

function App() {
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [result, setResult] = useState(null);

  const handleOperation = (operator) => {
    const a = parseFloat(num1);
    const b = parseFloat(num2);
    if (isNaN(a) || isNaN(b)) {
      setResult('Please enter valid numbers');
      return;
    }

    let res;
    switch (operator) {
      case '+':
        res = a + b;
        break;
      case '-':
        res = a - b;
        break;
      case '*':
        res = a * b;
        break;
      case '/':
        res = b !== 0 ? a / b : 'Cannot divide by 0';
        break;
      default:
        res = 'Invalid operation';
    }
    setResult(res);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h2>Basic Calculator</h2>
      <input
        type="number"
        placeholder="First number"
        value={num1}
        onChange={(e) => setNum1(e.target.value)}
      />
      <input
        type="number"
        placeholder="Second number"
        value={num2}
        onChange={(e) => setNum2(e.target.value)}
      />
      <div style={{ marginTop: '10px' }}>
        <button onClick={() => handleOperation('+')}>+</button>
        <button onClick={() => handleOperation('-')}>-</button>
        <button onClick={() => handleOperation('*')}>×</button>
        <button onClick={() => handleOperation('/')}>÷</button>
      </div>
      <h3>Result: {result !== null ? result : 'N/A'}</h3>
    </div>
  );
}

export default App;
