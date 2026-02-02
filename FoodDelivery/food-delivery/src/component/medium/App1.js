import { useState, useEffect } from "react";

const App1 = () => {
    const [time, setTime] = useState(5000);
    const [second, setSecond] = useState(1);
    useEffect(() => {
        const timer = setTimeout(() => {
            if (time === 5000) {setTime(3000); setSecond(0);}
            else if (time === 3000) {setTime(2000); setSecond(0);}
            else {setTime(5000); setSecond(0);}
        }, time);
        return () => clearTimeout(timer);
    }, [time]);

    useEffect(() => {
        const interval = setInterval(() => {
            setSecond((prev) => prev + 1);
        }, 1000);

        return () => {
            return clearInterval(interval);
        }
    }, [time]);

    return (
        <>
            <div className="outerDiv">
                <div className="circle1" style={{ "backgroundColor": time === 5000 ? "red" : "grey" }}></div>
                <div className="circle2" style={{ "backgroundColor": time === 2000 ? "yellow" : "grey" }}></div>
                <div className="circle3" style={{ "backgroundColor": time === 3000 ? "green" : "grey" }}></div>
            </div>
            <h3>{second} Seconds</h3>
        </>
    );
}

export default App1;