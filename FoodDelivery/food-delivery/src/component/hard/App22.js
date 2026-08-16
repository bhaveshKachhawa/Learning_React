import React, {
  useState,
  useEffect,
  useRef,
  createContext,
  useContext,
} from "react";

// 1. Toast Context Setup
const ToastContext = createContext(null);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used within a ToastProvider");
  return context;
};

// 2. Individual Toast Item Component (Manages Timer Lifecycle)
const ToastItem = ({ toast, onDismiss }) => {
  const [isHovered, setIsHovered] = useState(false);
  const timerRef = useRef(null);
  const remainingTimeRef = useRef(toast.duration || 4000);
  const startTimeRef = useRef(Date.now());

  useEffect(() => {
    if (isHovered) {
      // Pause timer on hover and calculate remaining duration
      clearTimeout(timerRef.current);
      remainingTimeRef.current -= Date.now() - startTimeRef.current;
    } else {
      // Resume timer on mouse leave
      startTimeRef.current = Date.now();
      timerRef.current = setTimeout(() => {
        onDismiss(toast.id);
      }, remainingTimeRef.current);
    }

    return () => clearTimeout(timerRef.current);
  }, [isHovered, toast.id, onDismiss]);

  const typeStyles = {
    success: {
      background: "#e8f5e9",
      border: "1px solid #a5d6a7",
      color: "#1b5e20",
    },
    error: {
      background: "#ffebee",
      border: "1px solid #ef9a9a",
      color: "#b71c1c",
    },
    info: {
      background: "#e3f2fd",
      border: "1px solid #90caf9",
      color: "#0d47a1",
    },
  };

  const currentStyle = typeStyles[toast.type] || typeStyles.info;

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        ...currentStyle,
        padding: "12px 16px",
        borderRadius: "6px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "12px",
        minWidth: "260px",
        maxWidth: "360px",
        transition: "all 0.2s ease",
      }}
    >
      <span style={{ fontSize: "0.9rem" }}>{toast.message}</span>
      <button
        onClick={() => onDismiss(toast.id)}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          fontSize: "1rem",
          color: "inherit",
          opacity: 0.7,
        }}
      >
        ✕
      </button>
    </div>
  );
};

// 3. Provider Component & Floating Stack Container
export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = "info", duration = 4000) => {
    const id = Date.now() + Math.random().toString();
    setToasts((prev) => [...prev, { id, message, type, duration }]);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}

      {/* Floating Toast Container */}
      <div
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          zIndex: 9999,
        }}
      >
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onDismiss={removeToast} />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

// 4. Demo Consumer Application
const ToastDemo = () => {
  const { addToast } = useToast();

  return (
    <div style={{ padding: "30px", fontFamily: "sans-serif" }}>
      <h3>Toast Notification System</h3>
      <p style={{ color: "#666" }}>
        Hover over any toast to pause its auto-dismiss timer!
      </p>

      <div style={{ display: "flex", gap: "10px", marginTop: "15px" }}>
        <button
          onClick={() =>
            addToast("Operation completed successfully!", "success")
          }
          style={{
            padding: "8px 14px",
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
          onClick={() =>
            addToast("Failed to connect to backend server.", "error")
          }
          style={{
            padding: "8px 14px",
            background: "#c62828",
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
            addToast("System update scheduled for midnight.", "info")
          }
          style={{
            padding: "8px 14px",
            background: "#1565c0",
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
