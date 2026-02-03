import { useState } from "react";

const App5 = () => {
    const [tabel, setTabel] = useState({
        row:2,
        column:2
    });
    let count = 0;
    return (
        <div>
            Rows :: {tabel.row} <input type="range" min="2" max="8" value={tabel.row} onChange={(e) => setTabel((curr) => {
                return {
                    ...curr,
                    row:parseInt(e.target.value)
                }
            })}/>
            Columns :: {tabel.column} <input type="range" min="2" max="8" value={tabel.column} onChange={(e) => setTabel((curr) => {
                return {
                    ...curr,
                    column:parseInt(e.target.value)
            }})}/>
            <div style={{"display":"flex","margin":"20px","justifyContent":"center"}}>
            {[...new Array(tabel.column)].map((item, outsideIndex) => {
                (count!=0)?(((outsideIndex+1)%2 === 0)?count += tabel.row+1:count += tabel.row-1):<></>;
                console.log(count);
                return <div key={outsideIndex}>
                 {[...new Array(tabel.row)].map((item, insideIndex) => {
                    ((outsideIndex+1) % 2 !== 0)?++count:--count;
                    return <div className="miniBox" key={insideIndex}>{count}</div>
                })}
                </div>
            })}
            </div>
        </div>
    );
}

export default App5;