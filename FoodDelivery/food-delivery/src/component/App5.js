import {useState} from 'react';

const App5 = () => {
    const [show, setShow] = useState("");
    const arr = [1,2,3,4,5,6];
    const handleChange = (e) => {
        
        if(e.target.value.length === 3) {
            setShow("+("+e.target.value+")-");
        }
        else if(e.target.value.length === 6){
            arr.filter((_, index) => {
                if(!isNaN(show.charAt(index)))
                        arr.push(show.charAt(index));
            });
            let number = arr[6];
            number*=10;
            number+=parseInt(arr[7]);
            number*=10;
            number+=parseInt(arr[8]);
            setShow(number);
        }
        else{
            setShow(e.target.value);
        }
    }
    return (
        <div>
            <input type="text" placeholder="Mobile Number" style={{"height":"40px"}} 
            onChange={(e) => handleChange(e)}  maxLength={14} value={show} />
            <span>+(123) - 4567890</span>
        </div>
    )
}

export default App5;