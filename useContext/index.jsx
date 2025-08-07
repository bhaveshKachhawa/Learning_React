import React, { useState, createContext, useContext } from 'react';
import ReactDOM from 'react-dom';

// 1. Create Context
const ThemeContext = createContext();

// 2. Create a component that uses the context
const ThemedButton = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      onClick={toggleTheme}
      style={{
        backgroundColor: theme === 'light' ? '#fff' : '#333',
        color: theme === 'light' ? '#333' : '#fff',
        padding: '10px 20px',
        marginTop: '20px',
        border: '1px solid #ccc',
        cursor: 'pointer',
      }}
    >
      Current Theme: {theme} (click to toggle)
    </button>
  );
};

// 3. App component with provider
const App = () => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () =>
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div style={{ padding: 20 }}>
        <h1>useContext Example (Single File)</h1>
        <ThemedButton />
      </div>
    </ThemeContext.Provider>
  );
};

// 4. Render to DOM
ReactDOM.render(<App />, document.getElementById('root'));
76`ejxk`