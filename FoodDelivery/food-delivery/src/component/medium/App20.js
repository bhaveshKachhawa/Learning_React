import React, { useState, useEffect } from "react";

const ToastManager = () => {
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = "info") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h3>Toast Notification System</h3>

      {/* Action Controls */}
      <div style={{ display: "flex", gap: "10px" }}>
        <button
          onClick={() => addToast("Action completed successfully!", "success")}
          style={{
            padding: "8px 12px",
            background: "#4caf50",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Success Toast
        </button>
        <button
          onClick={() => addToast("Something went wrong!", "error")}
          style={{
            padding: "8px 12px",
            background: "#f44336",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Error Toast
        </button>
      </div>

      {/* Fixed Toast Container Overlay */}
      <div
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          zIndex: 1000,
        }}
      >
        {toasts.map((toast) => (
          <ToastItem
            key={toast.id}
            toast={toast}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </div>
    </div>
  );
};

const ToastItem = ({ toast, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  const bgColors = {
    success: "#4caf50",
    error: "#f44336",
    info: "#2196f3",
  };

  return (
    <div
      style={{
        background: bgColors[toast.type] || bgColors.info,
        color: "#fff",
        padding: "12px 18px",
        borderRadius: "6px",
        boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        minWidth: "220px",
      }}
    >
      <span>{toast.message}</span>
      <button
        onClick={onClose}
        style={{
          background: "none",
          border: "none",
          color: "#fff",
          marginLeft: "15px",
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        ✕
      </button>
    </div>
  );
};

export default ToastManager;
