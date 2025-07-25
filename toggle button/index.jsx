import React, { useState } from 'react';

function LightToggle() {
  const [isOn, setIsOn] = useState(false);

  const toggleLight = () => setIsOn(!isOn);

  return (
    <div style={{
      textAlign: 'center',
      marginTop: '50px',
      backgroundColor: isOn ? '#ffffcc' : '#333',
      color: isOn ? '#000' : '#fff',
      padding: '50px'
    }}>
      <h1>The light is {isOn ? 'ON' : 'OFF'}</h1>
      <button onClick={toggleLight}>
        Toggle Light
      </button>
    </div>
  );
}

export default LightToggle;
