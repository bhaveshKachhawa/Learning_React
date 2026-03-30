import React, { useState, useMemo } from "react";

const DataTable = ({ data = [] }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  const sortedAndFilteredData = useMemo(() => {
    let filtered = data.filter((item) =>
      Object.values(item).some((val) =>
        String(val).toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    );

    if (sortConfig.key) {
      filtered.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key])
          return sortConfig.direction === "asc" ? -1 : 1;
        if (a[sortConfig.key] > b[sortConfig.key])
          return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }
    return filtered;
  }, [data, searchTerm, sortConfig]);

  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc")
      direction = "desc";
    setSortConfig({ key, direction });
  };

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <input
        type="text"
        placeholder="Search table..."
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          marginBottom: "15px",
          padding: "8px",
          width: "100%",
          boxSizing: "border-box",
        }}
      />
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: "#f4f4f4" }}>
            <th
              onClick={() => requestSort("name")}
              style={{
                cursor: "pointer",
                border: "1px solid #ddd",
                padding: "10px",
              }}
            >
              Name{" "}
              {sortConfig.key === "name"
                ? sortConfig.direction === "asc"
                  ? "🔼"
                  : "🔽"
                : ""}
            </th>
            <th
              onClick={() => requestSort("price")}
              style={{
                cursor: "pointer",
                border: "1px solid #ddd",
                padding: "10px",
              }}
            >
              Price{" "}
              {sortConfig.key === "price"
                ? sortConfig.direction === "asc"
                  ? "🔼"
                  : "🔽"
                : ""}
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedAndFilteredData.map((item, i) => (
            <tr key={i}>
              <td style={{ border: "1px solid #ddd", padding: "10px" }}>
                {item.name}
              </td>
              <td style={{ border: "1px solid #ddd", padding: "10px" }}>
                ${item.price}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
