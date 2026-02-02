import { useState } from "react";

const App2 = () => {
    const [show, setShow] = useState({
        data1:[
             { name: "USA", index: 0 },
             { name: "UAE", index: 1 },
              { name: "india", index: 2 },
             { name: "Australia", index: 3 },
             { name: "Canada", index: 4 }
        ],
        data2:[],
        temp1:[],
        temp2:[]
    });
    const handleClick = (number) => {
            setShow((curr) => {
                const hold1 = number === 1? ((curr.temp1.length != 0)? curr.temp1:[]):"";
                const hold2 = number === 2 ?((curr.temp2.length != 0)? curr.temp2:[]):"";
                return {
                    ...curr,
                    data1:number === 1?[]:[...curr.data1,...curr.data2].sort((a, b) => a.index-b.index),
                    data2:number === 1?[...curr.data2,...curr.data1].sort((a, b) => a.index-b.index):[],
                    temp2:number === 1?[...curr.temp2, ...hold1]:[],
                    temp1:number === 2?[...curr.temp1, ...hold2]:[],
                }
            });
    }

    const handleClick2 = (number) => {
        setShow((curr) => {
            number === 1?curr.temp1.map((data, index) => {
                curr.data1.splice(curr.data1.indexOf(data),1)}):curr.temp2.map((data, index) => {
                curr.data2.splice(curr.data2.indexOf(data),1);
            });
            return {
                ...curr,
                data2:number === 1?[...curr.data2,...curr.temp1].sort((a, b) => a.index-b.index):curr.data2,
                temp1:number === 1?[]:curr.temp1,
                temp2:number === 2?[]:curr.temp2,
                data1:number === 1?curr.data1:[...curr.data1,...curr.temp2].sort((a, b) => a.index-b.index)
            }   
        });
    }

    const handleChange = (event, item, number) => {
        setShow((curr) => {
        if(event.target.checked) {
            // console.log(show.temp2);
            return number === 1?{
                ...curr,
                temp1:[...curr.temp1, item]
            }:{...curr, temp2:[...curr.temp2, item]}
        }
        else {
            return number === 1?{
                ...curr,
                temp1:curr.temp1.filter((data, index) => data !== item)
            }:{...curr,temp2:curr.temp2.filter((data, index) => data !== item)}}
        });
    }

    return (
        <div style={{"display":"flex"}}>
            <div style={{"display":"flex","flexDirection":"column","border":"2px solid black","width":"150px","height":"250px"}}>
                {show.data1.map((item, index) => {return <div style={{"display":"flex"}} key={index}><input type="checkbox" onChange={(e) => handleChange(e, item, 1)} checked={show.temp1.indexOf(item) !== -1?true:false}/> <label>{item.name}</label></div>} )}
            </div>
            <div style={{"display":"flex","flexDirection":"column","border":"2px solid black"}}>
            <button onClick={() => handleClick(1)} disabled={show.data1.length === 0?true:false}>&gt;&gt;</button>
            <button onClick={() => handleClick2(1)} disabled={show.temp1.length === 0?true:false}>&gt;</button>
            <button onClick={() => handleClick2(2)} disabled={show.temp2.length === 0?true:false}>&lt;</button>
            <button onClick={() => handleClick(2)} disabled={show.data2.length === 0?true:false}>&lt;&lt;</button>
            </div>
            <div style={{"display":"flex","flexDirection":"column","border":"2px solid black","width":"150px","height":"250px"}}>
                {show.data2.map((item, index) => {return <div style={{"display":"flex"}} key={index}><input type="checkbox" onChange={(e) => handleChange(e, item, 2)} checked={show.temp2.indexOf(item) !== -1?true:false}/> <label>{item.name}</label></div>} )}
            </div>
        </div>
    );
}

export default App2;