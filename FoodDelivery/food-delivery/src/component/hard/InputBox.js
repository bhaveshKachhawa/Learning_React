import { useState } from "react";

const InputBox = ({index, point, item, setOt}) => {
    const [color, setColor] = useState("black");
    return (
        <div>
            <input ref={(curr) => point.current[index] = curr} onFocus={() => {setColor("blue")}} onBlur={() => {setColor("black")}} type="text" style={{"marginRight":"10","border":"2px solid "+color,"outline": "none"}} value={item}
            onKeyDown={(e) => {
                if(e.key === "Backspace"){
                    setOt("");
                    (index !== 0) && point.current[index-1].focus();
                }
                else if(!isNaN(e.key)){
                    setOt(e.key);
                    (index !== 5) && point.current[index+1].focus();
                }
                else
                (index !== 5 && item !== "") && point.current[index+1].focus();
            }}/>
        </div>
    );
}

export default InputBox;