import { useState } from "react";
import Box from "./Box";

const App1 = () => {
    const [userInput, setUserInput] = useState("");
    const [data, setData] = useState([{
        arr:[],
        type:"Ready to go",
        indexCount:0
    }, {arr:[], type:"In progress"},{arr:[], type:"Finished"}]);
    const handleClick = () => {
        if(userInput === "") return;
        setData((curr) => {
            return curr.map((item) => {
                if(item.type === "Ready to go") {
                    return {...item, arr:[...item.arr,{value:userInput, index:item.indexCount}], indexCount:item.indexCount+1}
                }
                return item;
            });
        });
        setUserInput("");
    }
    return (
        <div>
            <input type="text" value={userInput} onChange={(e) => setUserInput(e.target.value)}/>
            <button onClick={handleClick}>Add</button>
            <div style={{"display":"flex","marginTop":"20px"}}>
            {data.map((obj, index) => {
                return <Box obj={obj} key={index} updateData={(moveData, perform) => {
                    setData((curr) => {

                        return curr.map((item, innerIndex) => {

                            if(item.type === obj.type) {
                                const temp = item.arr.filter((item) => item.value != moveData.value);
                                return {
                                    ...item, arr:temp
                                }
                            }
                            else if((perform === "ADD"?index+1:index-1) === innerIndex) {
                                return {
                                    ...item, arr:[...item.arr, moveData].sort((a, b) => a.index-b.index)
                                }
                            }
                            return item;
                        });
                    });
                }}/>
            })}
            </div>
        </div>
    );
}

export default App1;