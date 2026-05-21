import React, { useState } from "react";

const TabsApp = () => {
  const [activeTab, setActiveTab] = useState(0);

  const tabData = [
    {
      id: 0,
      title: "Profile",
      content:
        "This is the profile settings page. Update your name and email here.",
    },
    {
      id: 1,
      title: "Security",
      content:
        "Manage your passwords, two-factor authentication, and active sessions.",
    },
    {
      id: 2,
      title: "Notifications",
      content:
        "Choose how you want to be notified about application updates and messages.",
    },
  ];

  return (
    <div style={styles.container}>
      <div style={styles.tabHeader}>
        {tabData.map((tab, index) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(index)}
            style={{
              ...styles.tabButton,
              borderBottom:
                activeTab === index
                  ? "3px solid #007bff"
                  : "3px solid transparent",
              color: activeTab === index ? "#007bff" : "#666",
              fontWeight: activeTab === index ? "bold" : "normal",
            }}
          >
            {tab.title}
          </button>
        ))}
      </div>

      <div style={styles.tabContent}>
        <p>{tabData[activeTab].content}</p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "500px",
    margin: "50px auto",
    fontFamily: "Arial",
    border: "1px solid #ddd",
    borderRadius: "8px",
    overflow: "hidden",
  },
  tabHeader: {
    display: "flex",
    backgroundColor: "#f1f1f1",
    borderBottom: "1px solid #ddd",
  },
  tabButton: {
    flex: 1,
    padding: "15px",
    border: "none",
    background: "none",
    cursor: "pointer",
    fontSize: "16px",
    transition: "0.2s",
  },
  tabContent: {
    padding: "20px",
    minHeight: "100px",
    lineHeight: "1.5",
    color: "#333",
  },
};

export default TabsApp;
