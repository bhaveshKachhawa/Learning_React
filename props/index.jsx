import React from "react";
import ReactDOM from "react-dom/client";

function Greeting(props) {
  return <h2>Hello, {props.name}!</h2>;
}

function App() {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Props Example</h1>
      <Greeting name="Alice" />
      <Greeting name="Bob" />
      <Greeting name="Charlie" />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
