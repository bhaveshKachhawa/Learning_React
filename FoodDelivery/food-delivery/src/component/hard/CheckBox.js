const CheckBox = ({item, handleData}) => {
    return (
        <div style={{"marginLeft":"40"}}>
        <div>
            <input type="checkbox" checked={item.checked} onChange={() => handleData(item.id)}/> {item.name}
        </div>
        {item.child?item.child.map((child, index) => {
            return <CheckBox item={child} key={child.id} handleData={handleData}/>
        }):<></>}
        </div>
    );
}

export default CheckBox;