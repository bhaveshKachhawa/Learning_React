import React, { useState, useRef, useLayoutEffect } from "react";

const TabSwitcher = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
  const tabsRef = useRef([]);

  const tabs = ["Home", "Movies", "TV Shows", "My List"];

  useLayoutEffect(() => {
    const currentTab = tabsRef.current[activeTab];
    if (currentTab) {
      const { offsetLeft, offsetWidth } = currentTab;
      setIndicatorStyle({ left: offsetLeft, width: offsetWidth });
    }
  }, [activeTab]);

  return (
    <div style={{ background: "#000", padding: "20px", position: "relative" }}>
      <div style={{ display: "flex", gap: "20px", position: "relative" }}>
        {tabs.map((tab, i) => (
          <button
            key={tab}
            ref={(el) => (tabsRef.current[i] = el)}
            onClick={() => setActiveTab(i)}
            style={{
              background: "none",
              border: "none",
              color: activeTab === i ? "#fff" : "#aaa",
              fontSize: "1.1rem",
              padding: "10px 0",
              cursor: "pointer",
              transition: "color 0.3s",
            }}
          >
            {tab}
          </button>
        ))}

        {/* The Animated Indicator Line */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            height: "3px",
            background: "#e50914",
            left: indicatorStyle.left,
            width: indicatorStyle.width,
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        />
      </div>
    </div>
  );
};

export default TabSwitcher;
