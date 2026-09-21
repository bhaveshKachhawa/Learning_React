import React, { useState } from "react";

// Mock Directory Data Structure
const initialTreeData = [
  {
    id: "src",
    label: "src",
    children: [
      {
        id: "components",
        label: "components",
        children: [
          { id: "Button.js", label: "Button.js" },
          { id: "Card.js", label: "Card.js" },
        ],
      },
      {
        id: "hooks",
        label: "hooks",
        children: [
          { id: "useAuth.js", label: "useAuth.js" },
          { id: "useFetch.js", label: "useFetch.js" },
        ],
      },
      { id: "App.js", label: "App.js" },
    ],
  },
  {
    id: "public",
    label: "public",
    children: [
      { id: "index.html", label: "index.html" },
      { id: "favicon.ico", label: "favicon.ico" },
    ],
  },
];

// Helper: Collect all child leaf/node IDs recursively
const getAllChildIds = (node) => {
  let ids = [node.id];
  if (node.children) {
    node.children.forEach((child) => {
      ids = ids.concat(getAllChildIds(child));
    });
  }
  return ids;
};

// Helper: Compute checked status (checked, unchecked, or indeterminate)
const getNodeCheckedStatus = (node, selectedIds) => {
  if (!node.children || node.children.length === 0) {
    return {
      isChecked: selectedIds.has(node.id),
      isIndeterminate: false,
    };
  }

  const childStatuses = node.children.map((child) =>
    getNodeCheckedStatus(child, selectedIds),
  );

  const allChecked = childStatuses.every(
    (status) => status.isChecked && !status.isIndeterminate,
  );
  const noneChecked = childStatuses.every(
    (status) => !status.isChecked && !status.isIndeterminate,
  );

  return {
    isChecked: allChecked,
    isIndeterminate: !allChecked && !noneChecked,
  };
};

// Recursive Tree Node Component
const TreeNode = ({ node, selectedIds, onToggle }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const checkboxRef = React.useRef(null);

  const { isChecked, isIndeterminate } = getNodeCheckedStatus(
    node,
    selectedIds,
  );

  // Set native checkbox indeterminate DOM property
  React.useEffect(() => {
    if (checkboxRef.current) {
      checkboxRef.current.indeterminate = isIndeterminate;
    }
  }, [isIndeterminate]);

  const handleCheckboxChange = (e) => {
    onToggle(node, e.target.checked);
  };

  return (
    <div style={{ marginLeft: "16px", marginTop: "4px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
        {node.children ? (
          <span
            onClick={() => setIsExpanded(!isExpanded)}
            style={{
              cursor: "pointer",
              fontSize: "0.8rem",
              width: "12px",
              userSelect: "none",
            }}
          >
            {isExpanded ? "▼" : "▶"}
          </span>
        ) : (
          <span style={{ width: "12px" }} />
        )}

        <input
          type="checkbox"
          ref={checkboxRef}
          checked={isChecked}
          onChange={handleCheckboxChange}
          style={{ cursor: "pointer" }}
        />

        <span style={{ fontSize: "0.9rem", color: "#333", cursor: "default" }}>
          {node.label}
        </span>
      </div>

      {node.children && isExpanded && (
        <div>
          {node.children.map((child) => (
            <TreeNode
              key={child.id}
              node={child}
              selectedIds={selectedIds}
              onToggle={onToggle}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// Main Component
const CheckboxTree = () => {
  const [selectedIds, setSelectedIds] = useState(new Set(["Button.js"]));

  const handleToggle = (node, shouldCheck) => {
    const nextSelected = new Set(selectedIds);
    const affectedIds = getAllChildIds(node);

    affectedIds.forEach((id) => {
      if (shouldCheck) {
        nextSelected.add(id);
      } else {
        nextSelected.delete(id);
      }
    });

    setSelectedIds(nextSelected);
  };

  return (
    <div
      style={{ padding: "20px", fontFamily: "sans-serif", maxWidth: "400px" }}
    >
      <h3>Tri-State Directory Permission Tree</h3>
      <p style={{ fontSize: "0.8rem", color: "#666" }}>
        Checking a parent updates all descendants. Unchecking a child forces
        parent into an <strong>indeterminate</strong> state.
      </p>

      <div
        style={{
          border: "1px solid #ddd",
          padding: "12px",
          borderRadius: "6px",
        }}
      >
        {initialTreeData.map((node) => (
          <TreeNode
            key={node.id}
            node={node}
            selectedIds={selectedIds}
            onToggle={handleToggle}
          />
        ))}
      </div>
    </div>
  );
};

export default CheckboxTree;
