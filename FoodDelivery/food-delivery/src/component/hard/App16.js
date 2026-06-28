import React from "react";

const Breadcrumbs = ({ currentPath = "/movies/trending/action/scifi" }) => {
  const pathnames = currentPath.split("/").filter((x) => x);

  return (
    <nav style={{ padding: "15px", fontFamily: "sans-serif" }}>
      <ul
        style={{
          display: "flex",
          listStyle: "none",
          padding: 0,
          margin: 0,
          gap: "8px",
          alignItems: "center",
        }}
      >
        <li>
          <span
            style={{
              color: "#0066cc",
              cursor: "pointer",
              textTransform: "capitalize",
            }}
          >
            Home
          </span>
        </li>

        {pathnames.map((value, index) => {
          const isLast = index === pathnames.length - 1;
          const label = value.replace("-", " ");

          return (
            <React.Fragment key={index}>
              <span style={{ color: "#aaa" }}>/</span>
              <li>
                {isLast ? (
                  <span
                    style={{
                      color: "#333",
                      fontWeight: "bold",
                      textTransform: "capitalize",
                    }}
                  >
                    {label}
                  </span>
                ) : (
                  <span
                    style={{
                      color: "#0066cc",
                      cursor: "pointer",
                      textTransform: "capitalize",
                    }}
                  >
                    {label}
                  </span>
                )}
              </li>
            </React.Fragment>
          );
        })}
      </ul>
    </nav>
  );
};

export default Breadcrumbs;
