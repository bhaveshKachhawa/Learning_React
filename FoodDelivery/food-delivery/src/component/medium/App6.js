import { useState, useEffect, useRef } from 'react';

const App6 = () => {
  const [items, setItems] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  const bottomBoundaryRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        addMoreItems();
      }
    });

    if (bottomBoundaryRef.current) {
      observer.observe(bottomBoundaryRef.current);
    }

    return () => observer.disconnect();
  }, [items]); 

  const addMoreItems = () => {
    setItems((prev) => [
      ...prev, 
      ...Array.from({ length: 10 }, (_, i) => prev.length + i + 1)
    ]);
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>My List</h1>
      
      {items.map((item) => (
        <div key={item} style={{ height: '20px', border: '1px solid black', margin: '10px', background: 'grey' }}>
          Item # {item}
        </div>
      ))}

      <div ref={bottomBoundaryRef} style={{ height: '50px', background: 'yellow' }}>
        I am the bottom! When you see me, I load more.
      </div>
    </div>
  );
};

export default App6;