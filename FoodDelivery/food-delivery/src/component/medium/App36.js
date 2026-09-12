import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
} from "react";

// 1. Context Setup
const ToastContext = createContext(null);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

// 2. Individual Toast Item Component with Pause-on-Hover Timer Logic
const ToastItem = ({ id, message, type, duration = 4000, onClose }) => {
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(100);
  const remainingTimeRef = useRef(duration);
  const startTimeRef = useRef(Date.now());
  const animationFrameRef = useRef(null);

  useEffect(() => {
    if (isPaused) return;

    startTimeRef.current = Date.now();
    const initialRemaining = remainingTimeRef.current;

    const updateProgress = () => {
      const elapsed = Date.now() - startTimeRef.current;
      const currentRemaining = Math.max(0, initialRemaining - elapsed);
      remainingTimeRef.current = currentRemaining;

      const percentage = (currentRemaining / duration) * 100;
      setProgress(percentage);

      if (currentRemaining <= 0) {
        onClose(id);
      } else {
        animationFrameRef.current = requestAnimationFrame(updateProgress);
      }
    };

    animationFrameRef.current = requestAnimationFrame(updateProgress);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isPaused, duration, id, onClose]);

  const getBackgroundColor = () => {
    switch (type) {
      case "success":
        return "#2e7d32";
      case "error":
        return "#d32f2f";
      case "warning":
        return "#ed6c02";
      default:
        return "#0066cc";
    }
  };

  return (
    <div
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      style={{
        position: "relative",
        background: getBackgroundColor(),
        color: "#fff",
        padding: "12px 16px",
        borderRadius: "6px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        minWidth: "260px",
        overflow: "hidden",
        cursor: "default",
        userSelect: "none",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        transition: "transform 0.2s ease",
      }}
    >
      <span style={{ fontSize: "0.9rem", marginRight: "12px" }}>{message}</span>

      <button
        onClick={() => onClose(id)}
        style={{
          background: "none",
          border: "none",
          color: "#fff",
          fontSize: "1rem",
          cursor: "pointer",
          padding: 0,
          lineHeight: 1,
        }}
      >
        ✕
      </button>

      {/* Dynamic Progress Bar Indicator */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          height: "4px",
          width: `${progress}%`,
          background: "rgba(255, 255, 255, 0.7)",
          transition: isPaused ? "none" : "width 0.1s linear",
        }}
      />
    </div>
  );
};

// 3. Provider Component & Queue Manager
export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = "info", duration = 4000) => {
    const id =
      Date.now().toString() + Math.random().toString(36).substring(2, 5);
    setToasts((prev) => [...prev, { id, message, type, duration }]);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}

      {/* Floating Container (Top-Right Viewport Stack) */}
      <div
        style={{
          position: "fixed",
          top: "20px",
          right: "20px",
          zIndex: 9999,
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        {toasts.map((toast) => (
          <ToastItem key={toast.id} {...toast} onClose={removeToast} />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

// 4. Demo Usage Interface
const ToastDemo = () => {
  const { addToast } = useToast();

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h3>Toast Notification Manager</h3>
      <p style={{ fontSize: "0.85rem", color: "#666" }}>
        Hover over any active toast to pause its auto-dismiss timer.
      </p>

      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        <button
          onClick={() =>
            addToast("Operation completed successfully!", "success")
          }
          style={{
            padding: "8px 16px",
            background: "#2e7d32",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Success Toast
        </button>

        <button
          onClick={() => addToast("Failed to fetch server data.", "error")}
          style={{
            padding: "8px 16px",
            background: "#d32f2f",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Error Toast
        </button>

        <button
          onClick={() =>
            addToast("Storage capacity reaching limit.", "warning")
          }
          style={{
            padding: "8px 16px",
            background: "#ed6c02",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Warning Toast
        </button>

        <button
          onClick={() => addToast("New system update available.", "info")}
          style={{
            padding: "8px 16px",
            background: "#0066cc",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Info Toast
        </button>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <ToastProvider>
      <ToastDemo />
    </ToastProvider>
  );
}
