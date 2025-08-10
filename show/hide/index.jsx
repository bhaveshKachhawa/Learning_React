import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';

function ShowHideMessage() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleMessage = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>React Show/Hide Example</h2>
      <button onClick={toggleMessage}>
        {isVisible ? "Hide" : "Show"} Message
      </button>

      {isVisible && <p style={{ marginTop: '20px' }}>Hello, React State!</p>}
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<ShowHideMessage />);
