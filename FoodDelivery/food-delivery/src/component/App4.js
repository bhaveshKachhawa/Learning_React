import { useState } from "react";

const App4 = () => {
    const [clickIndex, setClickIndex] = useState(0);
    const [hoverIndex, setHoverIndex] = useState(null);
    const arr = [1,1,1,1,1];
    const handleClick = (index) => {
        setClickIndex(index);
    }

    return(
        <div className="app4">
            {arr.map((value, index) => {
                return <div key={index} className="round-div" onClick={() => handleClick(index)} style={{
                    "backgroundColor":hoverIndex || hoverIndex === 0?(index<=hoverIndex?"black":"white"):(index<=clickIndex?"black":"white"),
                }} onMouseEnter={() => setHoverIndex(index)} onMouseLeave={() => setHoverIndex(null)}></div>
            })}
        </div>
    );
}

export default App4;