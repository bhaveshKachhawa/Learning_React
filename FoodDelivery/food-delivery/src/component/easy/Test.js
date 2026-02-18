import { useMemo, useRef, useState } from "react"
// 4πr2
// 2pi r
const Test = () => {
    const [output, setOutput] = useState(0);
    const r1 = useRef(null);
    const double = output<10?true:false;
    // const r2 = useRef(null);
    const calCircle = () => {
        setOutput(2.14*r1.current.value*2);
    }
    const data = useMemo(() => {
        console.log("i am in");
        return output*2;
    },[double]);

    return (

    <div>
        <input ref={r1} type="number" placeholder="Enter radious for circle"/>
        <p>{output}</p>
        <button onClick={() => calCircle()}>Click</button>
        <p>Update value : {data}</p>
    </div>);
}

export default Test;