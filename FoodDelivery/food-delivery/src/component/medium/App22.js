import React, { useState, useMemo } from "react";

const mockData = [
  {
    id: 1,
    name: "Alice Smith",
    role: "React Developer",
    location: "Pune",
    status: "Shortlisted",
  },
  {
    id: 2,
    name: "Bob Jones",
    role: "Node Developer",
    location: "Bengaluru",
    status: "Applied",
  },
  {
    id: 3,
    name: "Charlie Brown",
    role: "UI/UX Designer",
    location: "Remote",
    status: "Rejected",
  },
  {
    id: 4,
    name: "David Miller",
    role: "Frontend Lead",
    location: "Pune",
    status: "In Progress",
  },
  {
    id: 5,
    name: "Eva Green",
    role: "Full Stack Engineer",
    location: "Hyderabad",
    status: "Shortlisted",
  },
  {
    id: 6,
    name: "Frank Wright",
    role: "TypeScript Specialist",
    location: "Bengaluru",
    status: "Applied",
  },
];

const DataTable = () => {
  const [filterText, setFilterText] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: "id", direction: "asc" });
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 3;

  // 1. Filter Logic
  const filteredData = useMemo(() => {
    return mockData.filter((item) =>
      Object.values(item).some((val) =>
        String(val).toLowerCase().includes(filterText.toLowerCase()),
      ),
    );
  }, [filterText]);

  // 2. Sort Logic
  const sortedData = useMemo(() => {
    const items = [...filteredData];
    if (sortConfig.key) {
      items.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key])
          return sortConfig.direction === "asc" ? -1 : 1;
        if (a[sortConfig.key] > b[sortConfig.key])
          return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }
    return items;
  }, [filteredData, sortConfig]);

  // 3. Pagination Slice Logic
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return sortedData.slice(startIndex, startIndex + pageSize);
  }, [sortedData, currentPage]);

  const totalPages = Math.ceil(sortedData.length / pageSize);

  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  return (
    <div
      style={{ padding: "20px", fontFamily: "sans-serif", maxWidth: "650px" }}
    >
      <h3>Candidate Dashboard Table</h3>

      {/* Filter Input */}
      <input
        type="text"
        placeholder="Filter across columns..."
        value={filterText}
        onChange={(e) => {
          setFilterText(e.target.value);
          setCurrentPage(1); // Reset to page 1 on filter change
        }}
        style={{
          padding: "8px 12px",
          width: "100%",
          marginBottom: "15px",
          borderRadius: "4px",
          border: "1px solid #ccc",
          boxSizing: "border-box",
        }}
      />

      {/* Table Structure */}
      <table
        style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}
      >
        <thead>
          <tr style={{ borderBottom: "2px solid #333", background: "#f0f0f0" }}>
            {["name", "role", "location", "status"].map((col) => (
              <th
                key={col}
                onClick={() => requestSort(col)}
                style={{
                  padding: "10px",
                  cursor: "pointer",
                  textTransform: "capitalize",
                }}
              >
                {col}{" "}
                {sortConfig.key === col
                  ? sortConfig.direction === "asc"
                    ? "▲"
                    : "▼"
                  : ""}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((row) => (
            <tr key={row.id} style={{ borderBottom: "1px solid #ddd" }}>
              <td style={{ padding: "10px" }}>{row.name}</td>
              <td style={{ padding: "10px" }}>{row.role}</td>
              <td style={{ padding: "10px" }}>{row.location}</td>
              <td style={{ padding: "10px", fontWeight: "bold" }}>
                {row.status}
              </td>
            </tr>
          ))}
          {paginatedData.length === 0 && (
            <tr>
              <td
                colSpan="4"
                style={{ padding: "15px", textAlign: "center", color: "#888" }}
              >
                No records match your filter.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "15px",
        }}
      >
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => p - 1)}
          style={{
            padding: "6px 12px",
            cursor: currentPage === 1 ? "not-allowed" : "pointer",
          }}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages || 1}
        </span>
        <button
          disabled={currentPage === totalPages || totalPages === 0}
          onClick={() => setCurrentPage((p) => p + 1)}
          style={{
            padding: "6px 12px",
            cursor:
              currentPage === totalPages || totalPages === 0
                ? "not-allowed"
                : "pointer",
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default DataTable;
