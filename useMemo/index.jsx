import React, { useState, useMemo } from 'react';

function ExpensiveComponent() {
  const [count, setCount] = useState(0);
  const [otherState, setOtherState] = useState(false);

  // Simulate an expensive calculation
  const expensiveCalculation = (num) => {
    console.log('Calculating...');
    for (let i = 0; i < 1000000000; i++) {} // simulate delay
    return num * 2;
  };

  // Memoize the result of the expensive calculation
  const calculatedValue = useMemo(() => {
    return expensiveCalculation(count);
  }, [count]);

  return (
    <div>
      <h1>Expensive Calculation with useMemo</h1>
      <p>Count: {count}</p>
      <p>Calculated Value: {calculatedValue}</p>
      <button onClick={() => setCount(count + 1)}>Increment Count</button>
      <button onClick={() => setOtherState(!otherState)}>Toggle Other State</button>
    </div>
  );
}

export default ExpensiveComponent;
