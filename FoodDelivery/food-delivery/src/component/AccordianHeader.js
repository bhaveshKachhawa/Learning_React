import { useState } from "react";
import AccordianData from "./AccordianData";

const AccordianHeader = ({obj, show, setShow, index}) => {
    const [indexValue, setIndexValue] = useState(0);
    const handleClick = () => {
        console.log(index +"and " + indexValue);
        if(indexValue !== index){
            console.log("yes");
            setShow("-");
            setIndexValue(index);
        }
        else
            show !== "-"?setShow("-"):setShow("+");
    }

    return (
        <div >
            <div className="accrodianHeader"><h3>{obj.header}</h3>
            <button className="btn" onClick={() => handleClick()}>{show}</button></div>
            {show != "-" && <AccordianData data={obj.data}/>}
        </div>
    );
}

export default AccordianHeader;