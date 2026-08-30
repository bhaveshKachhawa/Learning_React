import React, { useState, useRef } from "react";

const TimePicker = () => {
  const [hours, setHours] = useState(9);
  const [minutes, setMinutes] = useState(30);
  const [period, setPeriod] = useState("AM");

  // Format values with leading zeroes for display
  const formatValue = (val) => String(val).padStart(2, "0");

  // Mouse wheel scroll handlers for columns
  const handleHoursScroll = (e) => {
    e.preventDefault();
    if (e.deltaY < 0) {
      setHours((prev) => (prev === 12 ? 1 : prev + 1));
    } else {
      setHours((prev) => (prev === 1 ? 12 : prev - 1));
    }
  };

  const handleMinutesScroll = (e) => {
    e.preventDefault();
    if (e.deltaY < 0) {
      setMinutes((prev) => (prev === 59 ? 0 : prev + 1));
    } else {
      setMinutes((prev) => (prev === 0 ? 59 : prev - 1));
    }
  };

  // Keyboard arrow adjustment handlers
  const handleHoursKeyDown = (e) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setHours((prev) => (prev === 12 ? 1 : prev + 1));
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setHours((prev) => (prev === 1 ? 12 : prev - 1));
    }
  };

  const handleMinutesKeyDown = (e) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setMinutes((prev) => (prev === 59 ? 0 : prev + 1));
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setMinutes((prev) => (prev === 0 ? 59 : prev - 1));
    }
  };

  return (
    <div
      style={{ padding: "20px", fontFamily: "sans-serif", maxWidth: "340px" }}
    >
      <h3>Custom Time Selector</h3>
      <p style={{ fontSize: "0.8rem", color: "#666" }}>
        Use <strong>Mouse Wheel</strong> or <strong>Arrow Keys</strong> over any
        column to adjust.
      </p>

      {/* Main Time Picker Wheel Container */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
          background: "#f4f5f7",
          padding: "16px",
          borderRadius: "8px",
          border: "1px solid #e0e0e0",
          userSelect: "none",
        }}
      >
        {/* Hours Selector Box */}
        <div
          tabIndex="0"
          onWheel={handleHoursScroll}
          onKeyDown={handleHoursKeyDown}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            background: "#fff",
            padding: "8px 12px",
            borderRadius: "6px",
            border: "1px solid #0066cc",
            outline: "none",
            cursor: "ns-resize",
          }}
        >
          <span
            style={{ fontSize: "0.75rem", color: "#888", marginBottom: "4px" }}
          >
            HH
          </span>
          <strong style={{ fontSize: "1.4rem", color: "#333" }}>
            {formatValue(hours)}
          </strong>
        </div>

        <span style={{ fontSize: "1.4rem", fontWeight: "bold", color: "#666" }}>
          :
        </span>

        {/* Minutes Selector Box */}
        <div
          tabIndex="0"
          onWheel={handleMinutesScroll}
          onKeyDown={handleMinutesKeyDown}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            background: "#fff",
            padding: "8px 12px",
            borderRadius: "6px",
            border: "1px solid #0066cc",
            outline: "none",
            cursor: "ns-resize",
          }}
        >
          <span
            style={{ fontSize: "0.75rem", color: "#888", marginBottom: "4px" }}
          >
            MM
          </span>
          <strong style={{ fontSize: "1.4rem", color: "#333" }}>
            {formatValue(minutes)}
          </strong>
        </div>

        {/* AM/PM Toggle Segment */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "4px",
            marginLeft: "6px",
          }}
        >
          {["AM", "PM"].map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              style={{
                padding: "4px 8px",
                fontSize: "0.75rem",
                fontWeight: "bold",
                borderRadius: "4px",
                border: "none",
                cursor: "pointer",
                background: period === p ? "#0066cc" : "#e0e0e0",
                color: period === p ? "#fff" : "#555",
                transition: "all 0.15s ease",
              }}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Formatted Result Output */}
      <div
        style={{
          marginTop: "14px",
          fontSize: "0.9rem",
          color: "#333",
          textAlign: "center",
        }}
      >
        Selected Time:{" "}
        <strong>
          {formatValue(hours)}:{formatValue(minutes)} {period}
        </strong>
      </div>
    </div>
  );
};

export default TimePicker;
