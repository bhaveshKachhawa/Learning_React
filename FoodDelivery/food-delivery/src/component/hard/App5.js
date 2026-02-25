import { useRef, useState } from "react";
import InputBox from "./InputBox";

const App5 = () => {
    const [otp, setOtp] = useState(new Array(6).fill(""));
    const point = useRef([]);
    // console.log(otp);
    return (
    <div style={{"display":"flex"}}>
        {otp.map((item, index) => {
            return <InputBox key={index} index={index} point={point} item={item} setOt={(value) => {
                setOtp((curr) => {
                    const newArr = [...curr];
                    newArr[index] = value;
                    console.log(newArr);
                    return newArr;
                });
            }}/>
        })}
    </div>
    );
}
export default App5;