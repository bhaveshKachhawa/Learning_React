import React, { useState, useEffect } from 'react';

function WindowSizeTracker() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div>
      <h2>Current Window Width: {width}px</h2>
    </div>
  );
}

export default WindowSizeTracker;
