import AccordianHeader from "./AccordianHeader";
import { useState } from "react";

const Accordian = ({obj, index}) => {
    const [show, setShow] = useState("-");

    return (
      <div className="accordian">
        <AccordianHeader obj={obj} show={show} setShow={setShow} index={index}/>
      </div>
    );
}

export default Accordian;