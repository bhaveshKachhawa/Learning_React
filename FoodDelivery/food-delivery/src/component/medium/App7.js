import { useState, useEffect, useRef } from "react";

const App7 = () => {
    const [data, setData] = useState({speed:1,width:0,isRunning:false});
    const interval = useRef(null);

    useEffect(() => {
        interval.current = setInterval(() => {
            setData((current) => {
                if(current.width !== 100) {
                    return {...current, width:current.width+10};
                }
                return current;
            });
        },  1000-(data.speed*80));
        return () => {
            clearInterval(interval.current);
        }
    }, [data.speed, data.isRunning]);
    return (
        <div>
            <div style={{"backgroundColor":"lightPink", "width":"100%","height":"20px"}}>
                <div style={{"backgroundColor":"purple","width":data.width+"%", "height":"100%"}}></div>
            </div>
            <button onClick={() => {
                setData((curr) => {return {...curr,isRunning:!curr.isRunning}});
            }}>start</button>
            <button onClick={() => {
                clearInterval(interval.current);
            }}>pause</button>
            <button onClick={() => {
                setData((curr) => {return {...curr, width:0}});
                clearInterval(interval.current);
            }}>reset</button>
            <div><input type="range" min="1" max="10" value={data.speed} onChange={(e) => {
                if(data.width === 100)setData((curr) => {return {...curr, width:0}}); setData(
                    (curr) => {return {...curr, speed:parseInt(e.target.value)}})}}/></div>
            <span>Speed : {data.speed} </span>
        </div>
    );
}

export default App7;