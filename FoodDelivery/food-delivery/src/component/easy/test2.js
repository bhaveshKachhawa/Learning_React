const Test2 = () => {
  //   const [index, setIndex] = useState();
  const count = [1, 2, 3];
  return (
    <div>
      {count.map(() => {
        return (
          <div style={{ border: "2px soild black" }}>
            <div
              style={{
                width: "200px",
                height: "100px",
                border: "2px solid black",
              }}
            ></div>
            <div
              style={{
                width: "200px",
                height: "100px",
                border: "2px solid black",
              }}
            ></div>
            <div
              style={{
                width: "200px",
                height: "100px",
                border: "2px solid black",
              }}
            ></div>
          </div>
        );
      })}
    </div>
  );
};

export default Test2;
