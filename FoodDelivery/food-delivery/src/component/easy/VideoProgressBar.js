import React, { useState, useRef } from "react";

const VideoProgressBar = () => {
  const [progress, setProgress] = useState(0);
  const barRef = useRef(null);

  const handleSeek = (e) => {
    const barWidth = barRef.current.offsetWidth;
    const clickX = e.nativeEvent.offsetX;
    const newProgress = (clickX / barWidth) * 100;

    setProgress(newProgress);
  };

  return (
    <div style={{ padding: "50px", background: "#141414", minHeight: "100vh" }}>
      <div
        ref={barRef}
        onClick={handleSeek}
        style={{
          width: "100%",
          height: "8px",
          background: "#444",
          borderRadius: "4px",
          cursor: "pointer",
          position: "relative",
        }}
      >
        <div
          style={{
            width: `${progress}%`,
            height: "100%",
            background: "#e50914",
            borderRadius: "4px",
            transition: "width 0.1s ease-out",
          }}
        />

        <div
          style={{
            position: "absolute",
            left: `${progress}%`,
            top: "50%",
            transform: "translate(-50%, -50%)",
            width: "16px",
            height: "16px",
            background: "#fff",
            borderRadius: "50%",
            boxShadow: "0 0 10px rgba(0,0,0,0.5)",
          }}
        />
      </div>
      <p style={{ color: "#fff", marginTop: "20px" }}>
        Seek Position: {Math.round(progress)}%
      </p>
    </div>
  );
};

export default VideoProgressBar;
