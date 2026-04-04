import React, { useState, useRef } from "react";

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleFile = (selectedFile) => {
    if (selectedFile && selectedFile.type.startsWith("image/")) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(selectedFile);
    }
  };

  const onDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    handleFile(e.dataTransfer.files[0]);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px" }}>
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={onDrop}
        onClick={() => fileInputRef.current.click()}
        style={{
          border: `2px dashed ${isDragging ? "#e50914" : "#ccc"}`,
          borderRadius: "8px",
          padding: "40px",
          textAlign: "center",
          cursor: "pointer",
          background: isDragging ? "#fff5f5" : "#fafafa",
          transition: "all 0.2s",
        }}
      >
        <input
          type="file"
          hidden
          ref={fileInputRef}
          onChange={(e) => handleFile(e.target.files[0])}
          accept="image/*"
        />
        {preview ? (
          <img
            src={preview}
            alt="Preview"
            style={{ width: "100%", borderRadius: "4px" }}
          />
        ) : (
          <p>{isDragging ? "Drop here!" : "Drag & Drop or Click to Upload"}</p>
        )}
      </div>
      {file && (
        <p style={{ marginTop: "10px", fontSize: "0.9rem" }}>
          Selected: {file.name}
        </p>
      )}
    </div>
  );
};

export default FileUpload;
