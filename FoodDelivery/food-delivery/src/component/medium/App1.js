//auto complete
import { useState, useEffect, useRef } from "react";

const App1 = () => {
    const time = useRef(0);
    const [second, setSecond] = useState(1);

    useEffect(() => {
        const interval = setInterval(() => {
            time.current+=1000;
            setSecond((curr) => curr+1);
            if(time.current === 15000) {
                time.current = 0;
                setSecond(0);
            }

        }, 1000);
        return () => {
            return clearInterval(interval);
        }
    }, []);

    return (
        <>
            <div className="outerDiv">
                <div className="circle1" style={{ "backgroundColor": (5000 > time.current && time.current >= 0) ? "red" : "grey" }}></div>
                <div className="circle2" style={{ "backgroundColor": (10000 > time.current && time.current >= 5000) ? "yellow" : "grey" }}></div>
                <div className="circle3" style={{ "backgroundColor": (15000 > time.current && time.current>= 10000) ? "green" : "grey" }}></div>
            </div>
            <h3>{second} Seconds</h3>
        </>
    );
}

export default App1;