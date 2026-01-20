import {useState} from 'react';

const App = () => {
    const [number, setNumber] = useState(0);
    const [range, setRange] = useState(1);

    const handleClick = (btnValue) => {
        setNumber((btnValue*range)+number);
    }

    return (
        <div className="main">
            <div>{number}</div>
            <div><button onClick={() => handleClick(-1)}>-</button> <button onClick={() => handleClick(1)}>+</button></div>
            <div>Increment/Decrement by <input type="number" value={range} onChange={(e) => setRange(e.target.value)}/></div>
            <div><button onClick={() => {setNumber(0)}}>Reset</button></div>
        </div>
    );
}

export default App;
