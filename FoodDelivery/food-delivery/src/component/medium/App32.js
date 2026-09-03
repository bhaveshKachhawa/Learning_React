import React, { useState, useMemo } from "react";

const initialData = [
  {
    id: 1,
    name: "Alice Johnson",
    role: "Frontend Engineer",
    department: "Engineering",
    salary: 125000,
  },
  {
    id: 2,
    name: "Bob Smith",
    role: "Product Manager",
    department: "Product",
    salary: 135000,
  },
  {
    id: 3,
    name: "Charlie Davis",
    role: "UX Designer",
    department: "Design",
    salary: 110000,
  },
  {
    id: 4,
    name: "Diana Prince",
    role: "DevOps Architect",
    department: "Engineering",
    salary: 145000,
  },
  {
    id: 5,
    name: "Evan Wright",
    role: "Data Analyst",
    department: "Analytics",
    salary: 95000,
  },
];

const DataTable = () => {
  const [data] = useState(initialData);
  const [globalSearch, setGlobalSearch] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("ALL");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  // Extract unique departments for dropdown filtering
  const departments = useMemo(() => {
    const deps = new Set(data.map((item) => item.department));
    return ["ALL", ...Array.from(deps)];
  }, [data]);

  // Handle column header clicks to cycle sort direction: ASC -> DESC -> CLEAR
  const handleSort = (key) => {
    setSortConfig((prev) => {
      if (prev.key !== key) {
        return { key, direction: "asc" };
      }
      if (prev.direction === "asc") {
        return { key, direction: "desc" };
      }
      return { key: null, direction: "asc" };
    });
  };

  // Pipeline processing: Filter -> Search -> Sort
  const processedData = useMemo(() => {
    let result = [...data];

    // 1. Column/Category Filter
    if (selectedDepartment !== "ALL") {
      result = result.filter((item) => item.department === selectedDepartment);
    }

    // 2. Global Search
    if (globalSearch.trim()) {
      const q = globalSearch.toLowerCase();
      result = result.filter(
        (item) =>
          item.name.toLowerCase().includes(q) ||
          item.role.toLowerCase().includes(q) ||
          item.department.toLowerCase().includes(q),
      );
    }

    // 3. Multi-type Sorting (Strings & Numbers)
    if (sortConfig.key) {
      result.sort((a, b) => {
        const valA = a[sortConfig.key];
        const valB = b[sortConfig.key];

        if (valA < valB) return sortConfig.direction === "asc" ? -1 : 1;
        if (valA > valB) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }

    return result;
  }, [data, globalSearch, selectedDepartment, sortConfig]);

  const getSortIndicator = (key) => {
    if (sortConfig.key !== key) return " ↕";
    return sortConfig.direction === "asc" ? " ▲" : " ▼";
  };

  return (
    <div
      style={{ padding: "20px", fontFamily: "sans-serif", maxWidth: "700px" }}
    >
      <h3>Dynamic Data Table</h3>

      {/* Control Bar: Global Search & Dropdown Filter */}
      <div style={{ display: "flex", gap: "12px", marginBottom: "16px" }}>
        <input
          type="text"
          placeholder="Search name, role, department..."
          value={globalSearch}
          onChange={(e) => setGlobalSearch(e.target.value)}
          style={{
            flex: 1,
            padding: "8px 12px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            fontSize: "0.9rem",
          }}
        />

        <select
          value={selectedDepartment}
          onChange={(e) => setSelectedDepartment(e.target.value)}
          style={{
            padding: "8px 12px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            fontSize: "0.9rem",
            background: "#fff",
          }}
        >
          {departments.map((dept) => (
            <option key={dept} value={dept}>
              {dept === "ALL" ? "All Departments" : dept}
            </option>
          ))}
        </select>
      </div>

      {/* Data Table */}
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          border: "1px solid #e0e0e0",
          fontSize: "0.9rem",
        }}
      >
        <thead>
          <tr
            style={{ background: "#f4f5f7", borderBottom: "2px solid #e0e0e0" }}
          >
            {[
              { label: "Name", key: "name" },
              { label: "Role", key: "role" },
              { label: "Department", key: "department" },
              { label: "Salary", key: "salary" },
            ].map((col) => (
              <th
                key={col.key}
                onClick={() => handleSort(col.key)}
                style={{
                  padding: "10px 12px",
                  textAlign: "left",
                  cursor: "pointer",
                  userSelect: "none",
                }}
              >
                {col.label}
                <span style={{ fontSize: "0.75rem", color: "#666" }}>
                  {getSortIndicator(col.key)}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {processedData.length === 0 ? (
            <tr>
              <td
                colSpan="4"
                style={{ textAlign: "center", padding: "20px", color: "#888" }}
              >
                No matching records found.
              </td>
            </tr>
          ) : (
            processedData.map((row) => (
              <tr key={row.id} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "10px 12px", fontWeight: "bold" }}>
                  {row.name}
                </td>
                <td style={{ padding: "10px 12px", color: "#555" }}>
                  {row.role}
                </td>
                <td style={{ padding: "10px 12px" }}>
                  <span
                    style={{
                      background: "#e3f2fd",
                      color: "#0066cc",
                      padding: "2px 8px",
                      borderRadius: "12px",
                      fontSize: "0.8rem",
                    }}
                  >
                    {row.department}
                  </span>
                </td>
                <td
                  style={{
                    padding: "10px 12px",
                    color: "#2e7d32",
                    fontWeight: "600",
                  }}
                >
                  ${row.salary.toLocaleString()}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
