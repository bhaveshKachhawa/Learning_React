import React, { useState, useRef } from "react";

const VirtualList = () => {
  const items = Array.from(
    { length: 10000 },
    (_, i) => `Item Listing #${i + 1}`,
  );

  const itemHeight = 40;
  const windowHeight = 400;
  const visibleItemsCount = Math.ceil(windowHeight / itemHeight);

  const [scrollTop, setScrollTop] = useState(0);
  const containerRef = useRef(null);

  const onScroll = (e) => {
    setScrollTop(e.target.scrollTop);
  };

  const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - 2);
  const endIndex = Math.min(
    items.length - 1,
    startIndex + visibleItemsCount + 4,
  );

  const visibleItems = items.slice(startIndex, endIndex + 1);
  const totalHeight = items.length * itemHeight;
  const offsetY = startIndex * itemHeight;

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h3>Virtualized Performance Scroll (10k Rows)</h3>

      <div
        ref={containerRef}
        onScroll={onScroll}
        style={{
          height: `${windowHeight}px`,
          width: "300px",
          border: "1px solid #ccc",
          overflowY: "auto",
          position: "relative",
        }}
      >
        <div
          style={{
            height: `${totalHeight}px`,
            width: "100%",
            position: "absolute",
            top: 0,
            left: 0,
          }}
        />

        <div
          style={{
            transform: `translateY(${offsetY}px)`,
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
          }}
        >
          {visibleItems.map((item, index) => (
            <div
              key={startIndex + index}
              style={{
                height: `${itemHeight}px`,
                lineHeight: `${itemHeight}px`,
                paddingLeft: "15px",
                borderBottom: "1px solid #eee",
                background: "#fff",
                boxSizing: "border-box",
              }}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VirtualList;
