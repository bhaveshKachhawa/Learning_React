import { useState } from "react";
import ReadData from "./Root";

const App3 = () => {
    const [root, setRoot] = useState({
        id: "root-top",
        name: "folder Root",
        icon: "folder",
        data: []
    });

    const handleAction = (id, action, newName = "") => {
        const updateTree = (curr) => {
            if (action === "DELETE") {
                return curr
                    .filter((item) => item.id !== id)
                    .map((item) => ({ 
                        ...item, 
                        data: item.data ? updateTree(item.data) : undefined 
                    }));
            }
            return curr.map((item) => {
                if (item.id === id) {
                    if (action === "EDIT") return { ...item, name: newName, isNew: false };
                    
                    if (action === "ADD_FILE" || action === "ADD_FOLDER") {
                        const newItem = {
                            id: Date.now() + Math.random(),
                            name: "",
                            icon: action === "ADD_FOLDER" ? "folder" : "file",
                            isNew: true,
                            data: action === "ADD_FOLDER" ? [] : undefined
                        };
                        return { ...item, data: [newItem, ...item.data] };
                    }
                }
                return item.data ? { ...item, data: updateTree(item.data) } : item;
            });
        };

        if (id === root.id && (action === "ADD_FILE" || action === "ADD_FOLDER")) {
            const newItem = {
                id: Date.now() + Math.random(),
                name: "",
                icon: action === "ADD_FOLDER" ? "folder" : "file",
                isNew: true,
                data: action === "ADD_FOLDER" ? [] : undefined
            };
            setRoot({ ...root, data: [newItem, ...root.data] });
        } else {
            setRoot({ ...root, data: updateTree(root.data) });
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <ReadData item={root} handleAction={handleAction} isRoot={true} />
        </div>
    );
};

export default App3;