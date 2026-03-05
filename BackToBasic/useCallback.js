import React, { useState, useCallback } from "react";

const Parent = () => {
  const [count, setCount] = useState(0);
  const resetCount = useCallback(() => {
    setCount(0);
  }, []);

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <Child reset={resetCount} />
    </div>
  );
};

const Child = React.memo(({ reset }) => {
  console.log("Child rendered!");
  return <button onClick={reset}>Reset from Child</button>;
});
