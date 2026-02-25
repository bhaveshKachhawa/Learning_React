import { useState } from "react";

const Button = ({page, setPage}) => {
    const preArray = Array.from({length:3},(_, index) => page-index-1).filter((data,_) => data>0).reverse();
    const nextArray = Array.from({length:4},(_, index) => (page-1)+index+1);
    const btn = [...preArray, ...nextArray];
    return (
        <div>
            {(btn.length > 4) && <button onClick={() => {
                setPage(page-1);
            }}>{"<"}</button>}
            {btn.map((data, index) => <button style={{"backgroundColor":page === data?"red":"grey"}} key={index} onClick={() => {setPage(data);
            }}>{data}</button>)}
            <button onClick={() => {
                setPage(page+1);
            }}>{">"}</button>
        </div>
    );
}

export default Button;