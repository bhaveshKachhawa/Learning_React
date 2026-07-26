import React, { useState } from "react";

const initialTree = {
  id: "1",
  name: "root",
  isFolder: true,
  children: [
    {
      id: "2",
      name: "src",
      isFolder: true,
      children: [
        { id: "3", name: "App.js", isFolder: false },
        { id: "4", name: "index.js", isFolder: false },
        {
          id: "5",
          name: "components",
          isFolder: true,
          children: [
            { id: "6", name: "Header.jsx", isFolder: false },
            { id: "7", name: "Footer.jsx", isFolder: false },
          ],
        },
      ],
    },
    { id: "8", name: "package.json", isFolder: false },
    { id: "9", name: "README.md", isFolder: false },
  ],
};

const FileNode = ({ node }) => {
  const [isOpen, setIsOpen] = useState(false);

  if (!node.isFolder) {
    return (
      <div style={{ paddingLeft: "20px", margin: "4px 0", color: "#444" }}>
        📄 {node.name}
      </div>
    );
  }

  return (
    <div style={{ paddingLeft: "15px", margin: "4px 0" }}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        style={{ cursor: "pointer", fontWeight: "bold", userSelect: "none" }}
      >
        {isOpen ? "📂" : "📁"} {node.name}
      </div>
      {isOpen && (
        <div>
          {node.children.map((child) => (
            <FileNode key={child.id} node={child} />
          ))}
        </div>
      )}
    </div>
  );
};

const FileExplorer = () => {
  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h3>File Explorer</h3>
      <FileNode node={initialTree} />
    </div>
  );
};

export default FileExplorer;
