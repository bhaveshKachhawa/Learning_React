import {useRef, useState} from 'react';
import Box from './Box';

const App10 = () => {
    const [show, setShow] = useState(false);
    const [inputValue, setInputValue] = useState("this is a normal sentence to transform");
    const type = ["Lower Case", "Upper Case", "Camel Case", "Pascal Case", "Snake Case", "Kebab Case", "Trim Spaces"];
    const data = useRef();
    return (
        <div className="mainBox">
            <input type="text" defaultValue={"this is a normal sentence to transform"}
            onChange={(e) => setInputValue(e.target.value)}
            onSelect={() => setShow(true)} 
            onBlur={() => setShow(false)}
            style={{"border":show?"2px solid skyblue":"2px solid black", "outline":"none"}}/>
            <h4>Type any text to see it transformed in different formats below</h4>
            {type.map((item, index) => {
                return <Box key={index} item={item} value={inputValue}/>
            })}
        </div>
    );
}

export default App10;