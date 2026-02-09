import { useState } from "react";

const App8 = () => {
    const [number, setNumber] = useState(1);
    return (
        <div>
            Number of circles:<input type="number" value={number} length="4" onChange={(e) => { 
                if(e.target.value.length === 4) {
                    setNumber(2000);
                    return;
                }
                if(e.target.value === ""){
                    setNumber(1);
                    return;
                }
                if(e.target.value.length<=4)setNumber(e.target.value)}}/>
            <div style={{"width":"400px","height":"400px","border":"10px solid black"}}>
                {Array.from({length:number},(_, index) => index).map((_,index) => {
                    const currentScale = Math.max(0,0.99 - (index * 0.02));
                        return <div key={index} style={{"border":"2px solid blue","top":"45","right":"465","height":"65%","width":"30%","position":"absolute","borderRadius":"50%","scale":currentScale}}>
                        </div>
                })}
            </div>
        </div>
    );
}

export default App8;