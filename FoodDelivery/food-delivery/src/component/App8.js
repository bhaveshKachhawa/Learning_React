import React, { useState, useMemo, useCallback } from 'react';

const ResetButton = React.memo(({ onReset }) => {
  console.log("Child Rendered!");
  return <button onClick={onReset}>Reset to Zero</button>;
});

const App8 = () => {
  const [count, setCount] = useState(0);
  const doubled = useMemo(() => {
    return count * 2;
  }, [count]);

  const handleReset = useCallback(() => {
    setCount(0); 
  }, []); 

  return (
    <div>
      <h1>Count: {count} | Doubled: {doubled}</h1>
      <button onClick={() => setCount(count + 1)}> + Increment </button>
      <ResetButton onReset={handleReset} />
    </div>
  );
};

export default App8;