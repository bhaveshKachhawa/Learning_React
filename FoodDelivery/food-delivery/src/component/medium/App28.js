import React, { useState } from "react";

// Schema defining form fields and validation constraints
const initialFormSchema = [
  {
    id: "fullName",
    label: "Full Name",
    type: "text",
    placeholder: "Jane Doe",
    validation: { required: true, minLength: 3 },
  },
  {
    id: "email",
    label: "Email Address",
    type: "email",
    placeholder: "jane@example.com",
    validation: { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
  },
  {
    id: "role",
    label: "Target Role",
    type: "select",
    options: ["Frontend Developer", "Backend Developer", "Full Stack Engineer"],
    validation: { required: true },
  },
];

const FormBuilder = () => {
  const [schema, setSchema] = useState(initialFormSchema);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  // Validate a single field against its schema rules
  const validateField = (field, value) => {
    const { validation } = field;
    if (!validation) return "";

    const val = value ? String(value).trim() : "";

    if (validation.required && !val) {
      return `${field.label} is required.`;
    }
    if (validation.minLength && val.length < validation.minLength) {
      return `${field.label} must be at least ${validation.minLength} characters.`;
    }
    if (validation.pattern && !validation.pattern.test(val)) {
      return `Invalid ${field.label.toLowerCase()} format.`;
    }
    return "";
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field.id]: value }));

    // Clear or update error on change
    const errorMsg = validateField(field, value);
    setErrors((prev) => ({ ...prev, [field.id]: errorMsg }));
  };

  // Validate all fields on submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    let hasError = false;

    schema.forEach((field) => {
      const errorMsg = validateField(field, formData[field.id]);
      if (errorMsg) {
        newErrors[field.id] = errorMsg;
        hasError = true;
      }
    });

    setErrors(newErrors);

    if (!hasError) {
      alert(
        "Form submitted successfully!\n" + JSON.stringify(formData, null, 2),
      );
    }
  };

  // Dynamically append a new custom text field to schema
  const handleAddField = () => {
    const fieldId = `custom_${Date.now()}`;
    const newField = {
      id: fieldId,
      label: `Custom Question #${schema.length - 2}`,
      type: "text",
      placeholder: "Type response...",
      validation: { required: true },
    };
    setSchema((prev) => [...prev, newField]);
  };

  const handleRemoveField = (id) => {
    setSchema((prev) => prev.filter((f) => f.id !== id));
    setFormData((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
    setErrors((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  };

  return (
    <div
      style={{ padding: "20px", fontFamily: "sans-serif", maxWidth: "480px" }}
    >
      <h3>Dynamic Schema Form Builder</h3>

      <form onSubmit={handleSubmit} noValidate>
        {schema.map((field) => (
          <div key={field.id} style={{ marginBottom: "16px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "4px",
              }}
            >
              <label style={{ fontSize: "0.9rem", fontWeight: "bold" }}>
                {field.label}{" "}
                {field.validation?.required && (
                  <span style={{ color: "red" }}>*</span>
                )}
              </label>
              {field.id.startsWith("custom_") && (
                <button
                  type="button"
                  onClick={() => handleRemoveField(field.id)}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#d32f2f",
                    cursor: "pointer",
                    fontSize: "0.8rem",
                  }}
                >
                  Remove
                </button>
              )}
            </div>

            {field.type === "select" ? (
              <select
                value={formData[field.id] || ""}
                onChange={(e) => handleChange(field, e.target.value)}
                style={{
                  width: "100%",
                  padding: "8px",
                  borderRadius: "4px",
                  border: errors[field.id]
                    ? "1px solid #d32f2f"
                    : "1px solid #ccc",
                }}
              >
                <option value="">-- Select Option --</option>
                {field.options.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type={field.type}
                placeholder={field.placeholder}
                value={formData[field.id] || ""}
                onChange={(e) => handleChange(field, e.target.value)}
                style={{
                  width: "100%",
                  padding: "8px",
                  borderRadius: "4px",
                  border: errors[field.id]
                    ? "1px solid #d32f2f"
                    : "1px solid #ccc",
                  boxSizing: "border-box",
                }}
              />
            )}

            {errors[field.id] && (
              <div
                style={{
                  color: "#d32f2f",
                  fontSize: "0.78rem",
                  marginTop: "4px",
                }}
              >
                {errors[field.id]}
              </div>
            )}
          </div>
        ))}

        <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
          <button
            type="button"
            onClick={handleAddField}
            style={{
              flex: 1,
              padding: "10px",
              background: "#f0f0f0",
              border: "1px solid #ccc",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            + Add Field
          </button>
          <button
            type="submit"
            style={{
              flex: 1,
              padding: "10px",
              background: "#0066cc",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Submit Form
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormBuilder;
