import { useState } from "react";
import Item from './Item';

const App9 = () => {
    const [list, setList] = useState(["html","css","js"]);
    const handleUserInput = (e) => {
        if(e.key === "Enter") {
            const copy = [...list];
            copy.push(e.target.value);
            e.target.value="";
            setList(copy);
        }
    }

    return (
        <div>
            <input type="text" placeholder="item" onKeyDown={(e) => handleUserInput(e)}/>
            {list.map((item, index) => {
                    return <Item key={index} item={item} updateItem={(value) => {
                        const copy = [...list];
                        copy[index] = value;

                            setList(copy);
                    }} removeItem={() => {
                        const copy = [...list];
                        copy.splice(index, 1);
                        setList(copy);
                    }}/>
            })}
        </div>
    );
}

export default App9;