import { useRef, useState } from "react";

const App12 = () => {
  const [box, setBox] = useState([
    { value: 1, state: false },
    { value: 2, state: false },
    { value: 3, state: false },
    { value: 4, state: false },
    { value: 5, state: false },
    { value: 6, state: false },
    { value: 7, state: false },
    { value: 8, state: false },
    { value: 9, state: false },
    { value: 10, state: false },
    { value: 11, state: false },
    { value: 12, state: false },
    { value: 1, state: false },
    { value: 2, state: false },
    { value: 3, state: false },
    { value: 4, state: false },
    { value: 5, state: false },
    { value: 6, state: false },
    { value: 7, state: false },
    { value: 8, state: false },
    { value: 9, state: false },
    { value: 10, state: false },
    { value: 11, state: false },
    { value: 12, state: false },
  ]);
  const pair = useRef([]);
  const count = useRef(0);
  const [event, setEvent] = useState("auto");
  const handleClick = (index) => {
    if (count.current < 2 && !box[index].state) {
      pair.current = [...pair.current, box[index].value];
      const tempArr = [...box];
      tempArr[index].state = true;
      setBox(tempArr);
      count.current += 1;
    }
    if (count.current === 2) {
      setEvent("none");
      if (
        pair.current[pair.current.length - 2] ===
        pair.current[pair.current.length - 1]
      ) {
        setEvent("auto");
        count.current = 0;
        if (pair.current.length === box.length) {
          setBox((prev) => prev.map((data) => ({ ...data, state: false })));
          pair.current.splice(0, pair.current.length);
        }
        return;
      }
      pair.current.pop();
      pair.current.pop();
      const interval = setTimeout(() => {
        setEvent("auto");
        count.current = 0;
        const updatedBox = box.map((data, index) => {
          return data.state === true && !pair.current.includes(data.value)
            ? { ...data, state: false }
            : data;
        });
        setBox(updatedBox);
        clearTimeout(interval);
      }, 2000);
    }
  };
  return (
    <div
      style={{
        display: "grid",
        gridTemplateRows: "1fr 1fr 1fr 1fr 1fr 1fr",
        gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr",
      }}
    >
      {box.map((data, index) => {
        return (
          <div
            onClick={() => {
              handleClick(index);
            }}
            key={index}
            style={{
              pointerEvents: event,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "30px",
              width: "60px",
              height: "40px",
              border: "2px solid black",
            }}
          >
            {data.state ? data.value : "?"}
          </div>
        );
      })}
    </div>
  );
};

export default App12;
