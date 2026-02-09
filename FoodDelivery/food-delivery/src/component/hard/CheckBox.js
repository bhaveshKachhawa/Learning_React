import { useState } from "react";

const CheckBox = ({item, handleData, saveData, deleteData}) => {
    const [show, setShow] = useState(false);
    const [newValue, setNewValue] = useState(item.name);
    return (
        <div style={{"marginLeft":"40"}}>
        <div>
            <input type="checkbox" checked={item.checked} onChange={() => handleData(item.id)}/>{show?"":item.name}
            {show?<><input type="text" value={newValue} onChange={(e) => setNewValue(e.target.value)}/><button onClick={() => {setShow(false);saveData(item.id, newValue)}}>Save</button></>:<></>}
            <button onClick={()=>{
                setShow(true);
            }}>Edit</button>
            <button onClick={() => deleteData(item.id)}>Delete</button>
        </div>
        {item.child?item.child.map((child, index) => {
            return <CheckBox item={child} key={child.id} handleData={handleData} saveData={saveData} deleteData={deleteData}/>
        }):<></>}
        </div>
    );
}

export default CheckBox;