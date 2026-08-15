import React, { useState, useEffect, useRef } from "react";

const Modal = ({ isOpen, onClose, title, children }) => {
  const modalRef = useRef(null);

  // 1. Prevent Background Body Scrolling when Modal is Open
  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  // 2. Focus Trap & Keyboard Shortcuts (Tab & Escape handling)
  useEffect(() => {
    if (!isOpen || !modalRef.current) return;

    // Query all focusable DOM elements inside the modal container
    const focusableSelector =
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    const focusableNodes = modalRef.current.querySelectorAll(focusableSelector);

    const firstElement = focusableNodes[0];
    const lastElement = focusableNodes[focusableNodes.length - 1];

    // Focus the first element initially
    firstElement?.focus();

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }

      if (e.key === "Tab") {
        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus(); // Cycle backward to last item
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus(); // Cycle forward to first item
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
    >
      {/* Modal Dialog Card */}
      <div
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        style={{
          background: "#fff",
          borderRadius: "8px",
          width: "90%",
          maxWidth: "450px",
          padding: "20px",
          boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h3 id="modal-title" style={{ margin: 0 }}>
            {title}
          </h3>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              fontSize: "1.2rem",
              cursor: "pointer",
              color: "#666",
            }}
          >
            ✕
          </button>
        </div>

        <div style={{ margin: "20px 0" }}>{children}</div>

        <div
          style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}
        >
          <button
            onClick={onClose}
            style={{
              padding: "8px 16px",
              borderRadius: "4px",
              border: "1px solid #ccc",
              background: "#fff",
              cursor: "pointer",
            }}
          >
            Cancel
          </button>
          <button
            onClick={() => {
              alert("Confirmed!");
              onClose();
            }}
            style={{
              padding: "8px 16px",
              borderRadius: "4px",
              border: "none",
              background: "#0066cc",
              color: "#fff",
              cursor: "pointer",
            }}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div style={{ padding: "30px", fontFamily: "sans-serif" }}>
      <h3>Accessible Modal System</h3>
      <button
        onClick={() => setIsModalOpen(true)}
        style={{
          padding: "10px 18px",
          background: "#2e7d32",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        Open Dialog Modal
      </button>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Confirm Transaction"
      >
        <p style={{ color: "#555", margin: "0 0 10px 0" }}>
          Are you sure you want to transfer funds to this recipient? This action
          cannot be undone.
        </p>
        <input
          type="text"
          placeholder="Type CONFIRM to proceed..."
          style={{
            width: "100%",
            padding: "8px",
            boxSizing: "border-box",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        />
      </Modal>
    </div>
  );
};

export default App;
