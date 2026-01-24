import { useState } from "react";
import AccordianData from "./AccordianData";

const AccordianHeader = ({obj, show, setIndexValue, accordion}) => {
    const [updateShow, setUpdateShow] = useState("-");
    
    const handleClick = () => {
        if(!accordion)
        {
            updateShow === "+"?setUpdateShow("-"):setUpdateShow("+");
            return;
        }
        setIndexValue();
    }

    return (
        <div >
            <div className="accrodianHeader"><h3>{obj.header}</h3>
            <button className="btn" onClick={() => handleClick()}>{accordion?show:updateShow}</button></div>
            {((accordion?show:updateShow) != "-") && <AccordianData data={obj.data}/>}
        </div>
    );
}

export default AccordianHeader;