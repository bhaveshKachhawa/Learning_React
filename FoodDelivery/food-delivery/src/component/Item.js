import {useState, useRef} from 'react';

const Item = ({item, updateItem, removeItem}) => {
    const [edit, setEdit] = useState(false);
    const newValue = useRef();
    const editList = () => {
        setEdit(!edit);
    }

    const saveItem = () => {
        setEdit(!edit);
        updateItem(newValue.current.value);
    }

    return (
        <div>
            {edit?<>
                <input type='text' defaultValue={item} ref={newValue}/>
                <button onClick={() => saveItem()}>Save</button>
                <button onClick={() => {setEdit(!edit); removeItem();}}>🗑️</button>
            </>:
            <>
            <h4>{item}</h4>
            <button onClick={() => editList()}>✏️</button>
            <button onClick={() => removeItem()}>🗑️</button>
            </>}
        </div>
    );
}

export default Item;