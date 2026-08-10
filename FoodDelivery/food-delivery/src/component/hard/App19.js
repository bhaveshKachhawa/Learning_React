import React, { useState, useEffect, useRef } from "react";

const permissionsData = [
  {
    id: "admin",
    label: "Admin Management",
    children: [
      {
        id: "users",
        label: "User Access",
        children: [
          { id: "user_create", label: "Create Users" },
          { id: "user_delete", label: "Delete Users" },
          { id: "user_export", label: "Export User Logs" },
        ],
      },
      {
        id: "billing",
        label: "Billing & Invoices",
        children: [
          { id: "view_invoices", label: "View Invoices" },
          { id: "manage_cards", label: "Manage Payment Methods" },
        ],
      },
    ],
  },
  {
    id: "content",
    label: "Content Moderation",
    children: [
      { id: "post_approve", label: "Approve Posts" },
      { id: "post_delete", label: "Flag / Delete Posts" },
    ],
  },
];

// Custom Checkbox mapping the HTML DOM property `indeterminate`
const TriStateCheckbox = ({ checked, indeterminate, onChange, label }) => {
  const checkboxRef = useRef(null);

  useEffect(() => {
    if (checkboxRef.current) {
      checkboxRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  return (
    <label
      style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        cursor: "pointer",
        userSelect: "none",
      }}
    >
      <input
        ref={checkboxRef}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        style={{ width: "16px", height: "16px", cursor: "pointer" }}
      />
      <span style={{ fontSize: "0.95rem" }}>{label}</span>
    </label>
  );
};

const CheckboxTreeNode = ({ node, checkedIds, onToggle }) => {
  // Helper to extract all leaf node IDs under the current node
  const getLeafIds = (item) => {
    if (!item.children || item.children.length === 0) return [item.id];
    return item.children.flatMap(getLeafIds);
  };

  const leafIds = getLeafIds(node);
  const checkedCount = leafIds.filter((id) => checkedIds.has(id)).length;

  const isChecked = checkedCount === leafIds.length && leafIds.length > 0;
  const isIndeterminate = checkedCount > 0 && checkedCount < leafIds.length;

  const handleCheckboxChange = () => {
    onToggle(leafIds, !isChecked);
  };

  return (
    <div style={{ marginLeft: "20px", marginTop: "8px" }}>
      <TriStateCheckbox
        label={node.label}
        checked={isChecked}
        indeterminate={isIndeterminate}
        onChange={handleCheckboxChange}
      />

      {/* Render Sub-Tree Recursively */}
      {node.children && node.children.length > 0 && (
        <div
          style={{
            borderLeft: "2px solid #e0e0e0",
            paddingLeft: "10px",
            marginTop: "4px",
          }}
        >
          {node.children.map((child) => (
            <CheckboxTreeNode
              key={child.id}
              node={child}
              checkedIds={checkedIds}
              onToggle={onToggle}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const CheckboxTree = () => {
  // Store only active leaf node IDs in a Set
  const [checkedIds, setCheckedIds] = useState(
    new Set(["user_create", "view_invoices"]),
  );

  const handleToggle = (leafIds, shouldCheck) => {
    setCheckedIds((prev) => {
      const next = new Set(prev);
      leafIds.forEach((id) => {
        if (shouldCheck) {
          next.add(id);
        } else {
          next.delete(id);
        }
      });
      return next;
    });
  };

  return (
    <div
      style={{ padding: "20px", fontFamily: "sans-serif", maxWidth: "450px" }}
    >
      <h3>Role Permissions Tree</h3>

      <div style={{ marginLeft: "-20px" }}>
        {permissionsData.map((node) => (
          <CheckboxTreeNode
            key={node.id}
            node={node}
            checkedIds={checkedIds}
            onToggle={handleToggle}
          />
        ))}
      </div>

      <hr style={{ margin: "20px 0", border: "0.5px solid #eee" }} />
      <div>
        <strong>Active Permission Keys:</strong>
        <pre
          style={{
            background: "#f5f5f5",
            padding: "10px",
            borderRadius: "6px",
            fontSize: "0.85rem",
          }}
        >
          {JSON.stringify(Array.from(checkedIds), null, 2)}
        </pre>
      </div>
    </div>
  );
};

export default CheckboxTree;
