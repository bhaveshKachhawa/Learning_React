import React, { useState } from "react";

const FIELD_TYPES = [
  { label: "Text Input", value: "text" },
  { label: "Number Input", value: "number" },
  { label: "Dropdown Select", value: "select" },
  { label: "Checkbox Toggle", value: "checkbox" },
];

const FormBuilder = () => {
  const [fields, setFields] = useState([
    {
      id: "1",
      label: "Full Name",
      type: "text",
      required: true,
      options: [],
    },
    {
      id: "2",
      label: "Role",
      type: "select",
      required: false,
      options: ["Developer", "Designer", "Manager"],
    },
  ]);

  const [formValues, setFormValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // 1. Schema Builder Handlers
  const handleAddField = () => {
    const newField = {
      id: Date.now().toString(),
      label: `Field ${fields.length + 1}`,
      type: "text",
      required: false,
      options: [],
    };
    setFields((prev) => [...prev, newField]);
  };

  const handleUpdateField = (id, key, value) => {
    setFields((prev) =>
      prev.map((field) => {
        if (field.id === id) {
          const updated = { ...field, [key]: value };
          // Clear options if field type is changed away from 'select'
          if (key === "type" && value !== "select") {
            updated.options = [];
          }
          return updated;
        }
        return field;
      }),
    );
  };

  const handleDeleteField = (id) => {
    setFields((prev) => prev.filter((f) => f.id !== id));
    // Clean up stored values and errors for deleted field
    setFormValues((prev) => {
      const copy = { ...prev };
      delete copy[id];
      return copy;
    });
    setErrors((prev) => {
      const copy = { ...prev };
      delete copy[id];
      return copy;
    });
  };

  const handleAddOption = (fieldId, optionText) => {
    if (!optionText.trim()) return;
    setFields((prev) =>
      prev.map((f) =>
        f.id === fieldId
          ? { ...f, options: [...f.options, optionText.trim()] }
          : f,
      ),
    );
  };

  // 2. Dynamic Form Input Handlers & Validation
  const handleInputChange = (fieldId, value) => {
    setFormValues((prev) => ({ ...prev, [fieldId]: value }));
    // Clear error on user interaction
    if (errors[fieldId]) {
      setErrors((prev) => ({ ...prev, [fieldId]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    fields.forEach((field) => {
      const val = formValues[field.id];

      if (field.required) {
        if (
          val === undefined ||
          val === null ||
          (typeof val === "string" && !val.trim()) ||
          (field.type === "checkbox" && !val)
        ) {
          newErrors[field.id] = `${field.label} is required.`;
        }
      }

      if (field.type === "number" && val !== undefined && val !== "") {
        if (isNaN(Number(val))) {
          newErrors[field.id] = "Must be a valid number.";
        }
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(false);
    if (validateForm()) {
      setIsSubmitted(true);
    }
  };

  return (
    <div
      style={{ padding: "20px", fontFamily: "sans-serif", maxWidth: "800px" }}
    >
      <h3>Dynamic Form Builder & Runtime Validator</h3>

      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}
      >
        {/* Left Column: Schema Configurator */}
        <div
          style={{
            background: "#f8f9fa",
            padding: "16px",
            borderRadius: "8px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "12px",
            }}
          >
            <h4 style={{ margin: 0 }}>Form Schema Config</h4>
            <button
              onClick={handleAddField}
              style={{
                padding: "4px 8px",
                background: "#0066cc",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "0.8rem",
              }}
            >
              + Add Field
            </button>
          </div>

          <div
            style={{ display: "flex", flexDirection: "column", gap: "12px" }}
          >
            {fields.map((field, idx) => (
              <div
                key={field.id}
                style={{
                  background: "#fff",
                  padding: "10px",
                  borderRadius: "6px",
                  border: "1px solid #ddd",
                  fontSize: "0.85rem",
                }}
              >
                <div
                  style={{ display: "flex", gap: "8px", marginBottom: "6px" }}
                >
                  <input
                    type="text"
                    value={field.label}
                    onChange={(e) =>
                      handleUpdateField(field.id, "label", e.target.value)
                    }
                    placeholder="Field Label"
                    style={{ flex: 1, padding: "4px" }}
                  />
                  <select
                    value={field.type}
                    onChange={(e) =>
                      handleUpdateField(field.id, "type", e.target.value)
                    }
                    style={{ padding: "4px" }}
                  >
                    {FIELD_TYPES.map((t) => (
                      <option key={t.value} value={t.value}>
                        {t.label}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={() => handleDeleteField(field.id)}
                    style={{
                      background: "none",
                      border: "none",
                      color: "#d32f2f",
                      cursor: "pointer",
                    }}
                  >
                    ✕
                  </button>
                </div>

                <div
                  style={{ display: "flex", alignItems: "center", gap: "8px" }}
                >
                  <label style={{ cursor: "pointer" }}>
                    <input
                      type="checkbox"
                      checked={field.required}
                      onChange={(e) =>
                        handleUpdateField(
                          field.id,
                          "required",
                          e.target.checked,
                        )
                      }
                    />{" "}
                    Required
                  </label>
                </div>

                {/* Sub-Option Config for Select Inputs */}
                {field.type === "select" && (
                  <div
                    style={{
                      marginTop: "8px",
                      paddingTop: "8px",
                      borderTop: "1px dashed #ccc",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "0.75rem",
                        color: "#666",
                        marginBottom: "4px",
                      }}
                    >
                      Dropdown Options: {field.options.join(", ") || "(None)"}
                    </div>
                    <input
                      type="text"
                      placeholder="Type option & press Enter"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleAddOption(field.id, e.target.value);
                          e.target.value = "";
                        }
                      }}
                      style={{
                        width: "100%",
                        padding: "4px",
                        fontSize: "0.8rem",
                        boxSizing: "border-box",
                      }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Live Generated Form */}
        <div
          style={{
            background: "#fff",
            padding: "16px",
            borderRadius: "8px",
            border: "1px solid #ddd",
          }}
        >
          <h4 style={{ margin: "0 0 12px 0" }}>Live Rendered Form</h4>

          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: "14px" }}
          >
            {fields.map((field) => (
              <div
                key={field.id}
                style={{ display: "flex", flexDirection: "column", gap: "4px" }}
              >
                <label style={{ fontSize: "0.85rem", fontWeight: "bold" }}>
                  {field.label}{" "}
                  {field.required && <span style={{ color: "red" }}>*</span>}
                </label>

                {field.type === "text" && (
                  <input
                    type="text"
                    value={formValues[field.id] || ""}
                    onChange={(e) =>
                      handleInputChange(field.id, e.target.value)
                    }
                    style={{
                      padding: "6px",
                      borderRadius: "4px",
                      border: "1px solid #ccc",
                    }}
                  />
                )}

                {field.type === "number" && (
                  <input
                    type="text"
                    value={formValues[field.id] || ""}
                    onChange={(e) =>
                      handleInputChange(field.id, e.target.value)
                    }
                    style={{
                      padding: "6px",
                      borderRadius: "4px",
                      border: "1px solid #ccc",
                    }}
                  />
                )}

                {field.type === "select" && (
                  <select
                    value={formValues[field.id] || ""}
                    onChange={(e) =>
                      handleInputChange(field.id, e.target.value)
                    }
                    style={{
                      padding: "6px",
                      borderRadius: "4px",
                      border: "1px solid #ccc",
                    }}
                  >
                    <option value="">-- Select Option --</option>
                    {field.options.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                )}

                {field.type === "checkbox" && (
                  <input
                    type="checkbox"
                    checked={!!formValues[field.id]}
                    onChange={(e) =>
                      handleInputChange(field.id, e.target.checked)
                    }
                    style={{ width: "18px", height: "18px" }}
                  />
                )}

                {errors[field.id] && (
                  <span style={{ fontSize: "0.75rem", color: "#d32f2f" }}>
                    {errors[field.id]}
                  </span>
                )}
              </div>
            ))}

            {fields.length > 0 && (
              <button
                type="submit"
                style={{
                  padding: "8px",
                  background: "#2e7d32",
                  color: "#fff",
                  border: "none",
                  borderRadius: "4px",
                  fontWeight: "bold",
                  cursor: "pointer",
                  marginTop: "8px",
                }}
              >
                Submit Form Data
              </button>
            )}
          </form>

          {isSubmitted && (
            <div
              style={{
                marginTop: "16px",
                padding: "10px",
                background: "#e8f5e9",
                border: "1px solid #a5d6a7",
                borderRadius: "4px",
                fontSize: "0.8rem",
              }}
            >
              <strong>Form Submitted Successfully!</strong>
              <pre style={{ margin: "6px 0 0 0", whiteSpace: "pre-wrap" }}>
                {JSON.stringify(formValues, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FormBuilder;
