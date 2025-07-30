import React, { useEffect } from 'react';

function MyComponent() {
  useEffect(() => {
    console.log('Component mounted');

    return () => {
      console.log('Component will unmount');
    };
  }, []); 

  return (
    <div>
      <h1>Hello from MyComponent!</h1>
    </div>
  );
}

export default MyComponent;
