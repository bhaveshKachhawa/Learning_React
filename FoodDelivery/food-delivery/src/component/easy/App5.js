import React, { useState } from 'react';

const App5 = () => {
  const [text, setText] = useState('hello world');
  const [transformedText, setTransformedText] = useState('hello world');

  const transformers = {
    lowerCase: (str) => str.toLowerCase(),
    upperCase: (str) => str.toUpperCase(),
    camelCase: (str) => 
      str.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase()),
    pascalCase: (str) => 
      str.toLowerCase().replace(/(?:^|[^a-zA-Z0-9]+)(.)/g, (m, chr) => chr.toUpperCase()),
    snakeCase: (str) => 
      str.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
         .map(x => x.toLowerCase())
         .join('_'),
    kebabCase: (str) => 
      str.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
         .map(x => x.toLowerCase())
         .join('-'),
    trim: (str) => str.trim()
  };

  const handleTransform = (type) => {
    if (!text) return;
    setTransformedText(transformers[type](text));
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>String transformers</h1>
      
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{ width: '80%', height: '100px', padding: '10px', fontSize: '16px' }}
      />

      <div style={{ margin: '20px 0', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '10px' }}>
        <button onClick={() => handleTransform('lowerCase')}>Lower Case</button>
        <button onClick={() => handleTransform('upperCase')}>Upper Case</button>
        <button onClick={() => handleTransform('camelCase')}>Camel Case</button>
        <button onClick={() => handleTransform('pascalCase')}>Pascal Case</button>
        <button onClick={() => handleTransform('snakeCase')}>Snake Case</button>
        <button onClick={() => handleTransform('kebabCase')}>Kebab Case</button>
        <button onClick={() => handleTransform('trim')}>Trim</button>
      </div>

      <div style={{ marginTop: '40px' }}>
        <h3>Transformed String:</h3>
        <p style={{ fontSize: '18px', fontWeight: 'bold' }}>{transformedText}</p>
      </div>
    </div>
  );
}

export default App5;