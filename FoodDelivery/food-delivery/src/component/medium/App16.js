import React, { useState, useRef, useEffect } from "react";

const MediaScrubber = () => {
  const [progress, setProgress] = useState(30);
  const [isScrubbing, setIsScrubbing] = useState(false);
  const trackRef = useRef(null);

  const updateProgress = (clientX) => {
    if (!trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    const width = rect.width;
    const clickedX = clientX - rect.left;
    const newPercentage = Math.min(Math.max(0, (clickedX / width) * 100), 100);
    setProgress(newPercentage);
  };

  const handleMouseDown = (e) => {
    setIsScrubbing(true);
    updateProgress(e.clientX);
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isScrubbing) {
        updateProgress(e.clientX);
      }
    };

    const handleMouseUp = () => {
      setIsScrubbing(false);
    };

    if (isScrubbing) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isScrubbing]);

  return (
    <div
      style={{ padding: "20px", maxWidth: "500px", fontFamily: "sans-serif" }}
    >
      <h3>Media Scrubber ({Math.round(progress)}%)</h3>

      {/* Track Base */}
      <div
        ref={trackRef}
        onMouseDown={handleMouseDown}
        style={{
          height: "8px",
          background: "#e0e0e0",
          borderRadius: "4px",
          position: "relative",
          cursor: "pointer",
          userSelect: "none",
        }}
      >
        {/* Filled Progress */}
        <div
          style={{
            height: "100%",
            width: `${progress}%`,
            background: "#e50914",
            borderRadius: "4px",
          }}
        />

        {/* Scrubber Knob */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: `${progress}%`,
            transform: "translate(-50%, -50%)",
            width: "16px",
            height: "16px",
            background: "#fff",
            border: "2px solid #e50914",
            borderRadius: "50%",
            boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
            transition: isScrubbing ? "none" : "left 0.1s linear",
          }}
        />
      </div>
    </div>
  );
};

export default MediaScrubber;
