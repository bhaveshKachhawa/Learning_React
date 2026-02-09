import { useState, useEffect } from "react";

const DragDrop = () => {
    const [items, setItems] = useState([]);
    const [dragIndex, setDragIndex] = useState(null);

    useEffect(() => {
        const saved = localStorage.getItem("last_stage");
        if (saved) {
            setItems(JSON.parse(saved));
        } else {
            setItems([
                { id: 101, text: "Box A" },
                { id: 102, text: "Box B" },
                { id: 103, text: "Box C" },
                { id: 104, text: "Box D" },
                { id: 105, text: "Box E" }
            ]);
        }
    }, []);

    const onDragStart = (index) => {
        setDragIndex(index);
    };

    const onDrop = (dropIndex) => {
        const updatedList = [...items];
        const temp = updatedList[dragIndex];
        updatedList[dragIndex] = updatedList[dropIndex];
        updatedList[dropIndex] = temp;

        setItems(updatedList);
        setDragIndex(null);
    };

    const handleSave = () => {
        localStorage.setItem("last_stage", JSON.stringify(items));
        alert("Stage Saved!");
    };

    return (
        <div style={{ padding: "40px" }}>
            <h2>Swap Items (Drag one onto another)</h2>
            {items.map((item, index) => (
                <div
                    key={item.id}
                    draggable
                    onDragStart={() => onDragStart(index)}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => onDrop(index)}
                    style={{
                        padding: "20px",
                        margin: "10px",
                        backgroundColor: "lightblue",
                        border: "2px solid blue",
                        cursor: "move",
                        display: "flex",
                        justifyContent: "space-between"
                    }}
                >
                    <span>{item.text}</span>
                    <b>Current Index: {index}</b>
                </div>
            ))}

            <button 
                onClick={handleSave} 
                style={{ marginTop: "20px", padding: "10px 30px", cursor: "pointer" }}
            >
                Save Stage
            </button>
        </div>
    );
};

export default DragDrop;