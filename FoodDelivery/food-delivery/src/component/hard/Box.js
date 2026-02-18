const Box = ({obj, updateData}) => {
    // console.log(obj);
    const {arr,type} = obj;
    // console.log(arr);
    return (
        <div>
        <h2>{type}</h2>
    <div style={{"width":"200px","height":"300px","border":"2px solid black"}}>
        {(!arr)?<></>:(arr.map((item, index) => {
            return <div key={index}>
            {type !== "Ready to go"?<button style={{"marginRight":"10px"}} onClick={() => updateData(item,"SUB")}>Previous</button>:<></>}    
            <span>{item.value}</span>
            {type !== "Finished"?<button style={{"marginLeft":"10px"}} onClick={() => updateData(item, "ADD")}>Next</button>:<></>}
            </div>
        }))}
    </div>
    </div>
);
}
//no shortcut
export default Box;