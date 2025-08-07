import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';

function Counter() {
  const [count, setCount] = useState(0); // state variable

  const increment = () => {
    setCount(count + 1); // update state
  };

  const decrement = () => {
    setCount(count - 1);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>React Counter Example</h2>
      <h1>{count}</h1>
      <button onClick={decrement}>-</button>
      <button onClick={increment}>+</button>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Counter />);
