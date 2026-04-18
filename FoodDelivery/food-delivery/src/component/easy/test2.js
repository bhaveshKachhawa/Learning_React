export const Test2 = () => {
  //   const [index, setIndex] = useState();
  const count = [1, 2, 3];
  return (
    <div>
      {count.map(() => {
        <div style={{ border: "2px soild black" }}>
          <div
            style={{ width: "200", height: "100", border: "2px solid black" }}
          ></div>
          <div
            style={{ width: "200", height: "100", border: "2px solid black" }}
          ></div>
          <div
            style={{ width: "200", height: "100", border: "2px solid black" }}
          ></div>
        </div>;
      })}
    </div>
  );
};

export default Test2;
