import React, { useState, useRef, useEffect } from "react";

const SlidingTabs = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [indicatorStyle, setIndicatorStyle] = useState({});
  const tabsRef = useRef([]);

  const tabList = ["In Progress", "Applied", "Withdrawn", "Rejected", "Joined"];

  useEffect(() => {
    const currentTabElement = tabsRef.current[activeTab];
    if (currentTabElement) {
      setIndicatorStyle({
        left: `${currentTabElement.offsetLeft}px`,
        width: `${currentTabElement.offsetWidth}px`,
      });
    }
  }, [activeTab]);

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <div
        style={{
          position: "relative",
          display: "flex",
          borderBottom: "2px solid #e0e0e0",
          width: "max-content",
        }}
      >
        {tabList.map((tab, index) => (
          <button
            key={tab}
            ref={(el) => (tabsRef.current[index] = el)}
            onClick={() => setActiveTab(index)}
            style={{
              padding: "12px 20px",
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: "1rem",
              fontWeight: activeTab === index ? "bold" : "normal",
              color: activeTab === index ? "#8a2be2" : "#666",
              transition: "color 0.3s ease",
            }}
          >
            {tab}
          </button>
        ))}

        <div
          style={{
            position: "absolute",
            bottom: "-2px",
            height: "3px",
            backgroundColor: "#8a2be2",
            transition: "all 0.3s ease-in-out",
            ...indicatorStyle,
          }}
        />
      </div>

      <div style={{ marginTop: "20px", padding: "10px" }}>
        <h4>{tabList[activeTab]} Content View</h4>
        <p>Showing current records filtered by status.</p>
      </div>
    </div>
  );
};

export default SlidingTabs;
