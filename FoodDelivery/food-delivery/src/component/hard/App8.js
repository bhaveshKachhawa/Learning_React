import { useEffect, useState, useRef } from "react";
// https://suggestqueries.google.com/complete/search?client=firefox&q=YOUR_QUERY
const App8 = () => {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(null);
  const [status, setStatus] = useState(false);
  const interval = useRef(null);

  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;
    const fetchData = async () => {
      const response = await fetch(
        `https://proxy.corsfix.com/?https://suggestqueries.google.com/complete/search?client=firefox&q=${query}`,
        { signal },
      );
      const data = await response.json();
      // console.log("bhavesh");
      setStatus(false);
      setResult(data[1]);
    };
    const startInterval = () => {
      interval.current = setTimeout(() => {
        setStatus(true);
        setResult(null);
        fetchData();
      }, 500);
    };
    if (query !== "") {
      startInterval();
    } else {
      setResult(null);
    }
    return () => {
      clearTimeout(interval.current);
      abortController.abort();
    };
  }, [query]);

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {status && <p>...Loading</p>}
      {result &&
        result.map((data, index) => {
          return (
            <div key={index}>
              <p>{data}</p>
            </div>
          );
        })}
    </div>
  );
};
export default App8;
