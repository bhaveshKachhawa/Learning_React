import React, { useState, useEffect, useRef } from "react";

// Mock API function simulating paginated database responses
const fetchMockProducts = async (page, limit = 10) => {
  await new Promise((resolve) => setTimeout(resolve, 800)); // Simulate 800ms network latency

  const totalItems = 45;
  const startIndex = (page - 1) * limit;

  if (startIndex >= totalItems) {
    return { items: [], hasMore: false };
  }

  const items = Array.from({ length: limit }, (_, index) => {
    const id = startIndex + index + 1;
    if (id > totalItems) return null;
    return {
      id,
      title: `Product Item #${id}`,
      price: `$${(Math.random() * 100 + 10).toFixed(2)}`,
      category: id % 2 === 0 ? "Electronics" : "Apparel",
    };
  }).filter(Boolean);

  return {
    items,
    hasMore: startIndex + items.length < totalItems,
  };
};

const InfiniteScrollList = () => {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const observerTarget = useRef(null);

  // Fetch data whenever page state increments
  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      if (!hasMore || isLoading) return;

      setIsLoading(true);
      try {
        const response = await fetchMockProducts(page);
        if (isMounted) {
          setItems((prev) => [...prev, ...response.items]);
          setHasMore(response.hasMore);
        }
      } catch (error) {
        console.error("Failed to fetch page data:", error);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    loadData();

    return () => {
      isMounted = false; // Prevent state updates on unmounted component
    };
  }, [page]);

  // Observer attached to sentinel element at the bottom of the list
  useEffect(() => {
    const sentinel = observerTarget.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          setPage((prevPage) => prevPage + 1);
        }
      },
      { threshold: 0.5 },
    );

    observer.observe(sentinel);

    return () => {
      if (sentinel) observer.unobserve(sentinel);
    };
  }, [hasMore, isLoading]);

  return (
    <div
      style={{ padding: "20px", fontFamily: "sans-serif", maxWidth: "500px" }}
    >
      <h3>Infinite Scroll Product Feed</h3>

      {/* Product Items List */}
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {items.map((item) => (
          <div
            key={item.id}
            style={{
              padding: "14px",
              borderRadius: "8px",
              border: "1px solid #e0e0e0",
              background: "#fafafa",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <strong style={{ fontSize: "0.95rem" }}>{item.title}</strong>
              <div style={{ fontSize: "0.8rem", color: "#666" }}>
                {item.category}
              </div>
            </div>
            <span style={{ fontWeight: "bold", color: "#2e7d32" }}>
              {item.price}
            </span>
          </div>
        ))}
      </div>

      {/* Sentinel Node observed by IntersectionObserver */}
      <div
        ref={observerTarget}
        style={{
          height: "60px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "10px",
        }}
      >
        {isLoading && (
          <span style={{ color: "#0066cc", fontWeight: "bold" }}>
            ⏳ Loading more items...
          </span>
        )}
        {!hasMore && (
          <span style={{ color: "#888", fontSize: "0.9rem" }}>
            🎉 You've reached the end of the feed!
          </span>
        )}
      </div>
    </div>
  );
};

export default InfiniteScrollList;
