import { useState } from "react";
import Chip from './Chip';

const App3 = () => {
    const [userInput, setUserInput] = useState('');
    const [data, setData] = useState([]);

    const handleEnter = (e) => {
        e.preventDefault();
        if(userInput !== '') {
            setData((curr) => [...curr, userInput]); 
            setUserInput('');
        }
    }

    return (
        <div>
            <form onSubmit={(e) => {handleEnter(e)}}>
            <input type="text" onChange={(e) => setUserInput(e.target.value)} style={{
                "width":"500px",
                "height":"40px"
            }} placeholder="Type & hit Enter" value={userInput}/>
            </form>
            <div style={{"display":"flex","gap":"10px"}}>
                {(!data)?<></>:data.map((item, index) => {
                    console.log(data);
                    return <Chip key={index} item={item} setData={() => {
                        setData((curr) => curr.filter((userData, i) => index !== i));
                    }}/>
                })}
            </div>
        </div>
    );
}

export default App3;