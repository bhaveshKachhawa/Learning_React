const Chip = ({item, setData}) => {
    return (
        <div style={{
            "backgroundColor":"lightgray",
            "padding":"5px"
        }}>
            <span>{item}</span>
            <button style={{"border":"none","backgroundColor":"lightgray","cursor":"pointer"}} onClick={setData}>❌</button>
        </div>
    );
}

export default Chip;