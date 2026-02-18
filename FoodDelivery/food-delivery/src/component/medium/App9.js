import { useEffect, useRef, useState } from "react";

const App9 = () => {
    const [style, setStyle] = useState([]);
    const timeout = useRef({});

    console.log(style);
    const handleClick = (text, color) => {
        const id = Date.now()+Math.random();
        setStyle((curr) => {
            return [...curr,{
                text:text,
                color:color,
                id:id
            }];
        });
        timeout.current[id] = setTimeout(() => {closeBtn(id)}, 3000);
    }
    const closeBtn = (id) => {
        setStyle((curr) => {
            return curr.filter((data, index) => data.id !== id);
        });
        clearInterval(timeout[id]);
        delete timeout[id];
    }

    return (
        <>
        <div style={{"display":"flex","width":"1100px"}}>
            <button onClick={() => handleClick("One","red")}>One</button>
            <button onClick={() => handleClick("Two","blue")}>Two</button>
            <button onClick={() => handleClick("Three","green")}>Three</button>
            <button onClick={() => handleClick("Four","yellow")}>Four</button>
        </div>
        {style?style.map((data, index) => {
                    return <div className="anime" key={data.id} style={{
                "width":"200px",
                "height":"50px",
                "marginLeft":"auto",
                "backgroundColor":data.color,
            }}>{data.text}<button onClick={() => closeBtn(data.id)}>CLose</button></div>
        }):<></>}
        </>
    );
}

export default App9;