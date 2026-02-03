import { useRef, useState } from 'react';

const App4 = () => {
    const [time, setTime] = useState({ min: 0, second: 0, miliSec: 0 });
    const [btn, setBtn] = useState(false);
    const interval = useRef(null);

    const handleReset = () => {
        handlePause();
        setBtn(false);
        setTime({ min: 0, second: 0, miliSec: 0 });
    }

    const handlePause = () => {
        setBtn(false);
        clearInterval(interval.current);
        interval.current = null;
    }

    const handleStart = () => {
        setBtn(true);
        interval.current = setInterval(() => {
            setTime((curr) => {
                let ms = curr.miliSec + 10;
                let s = curr.second;
                let m = curr.min;

                if (ms >= 1000) {
                    ms = 0;
                    s = s + 1;
                }
                if (s >= 60) {
                    s = 0;
                    m = m + 1;
                }

                return { min: m, second: s, miliSec: ms };
            });
        }, 10);
    }

    return (
        <div style={{
            "width": "200px", "height": "200px", "borderRadius": "50%",
            "backgroundColor": "lightgray", "display": "flex",
            "flexDirection": "column", "alignItems": "center", "justifyContent": "center"
        }}>
            <h2>Stopwatch</h2>
            <h2>{time.min}:{time.second}:{time.miliSec}</h2>
            <button onClick={handleStart} disabled={btn}>start</button>
            <button onClick={handlePause} disabled={!btn}>Pause</button>
            <button onClick={handleReset}>Reset</button>
        </div>
    );
}

export default App4;