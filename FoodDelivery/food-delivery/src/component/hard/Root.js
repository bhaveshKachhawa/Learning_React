import { useState } from "react";

const ReadData = ({ item, handleAction, isRoot }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [isEditing, setIsEditing] = useState(item.isNew || false);
    const [tempName, setTempName] = useState(item.name);

    const onSave = () => {
        if (tempName.trim() === "") {
            handleAction(item.id, "DELETE");
        } else {
            handleAction(item.id, "EDIT", tempName);
            setIsEditing(false);
        }
    };

    return (
        <div style={{ marginLeft: 20 }}>
            <div 
                onMouseEnter={() => setIsHovered(true)} 
                onMouseLeave={() => setIsHovered(false)}
                style={{ display: "flex", gap: "10px", alignItems: "center", minHeight: "35px" }}
            >
                {isEditing ? (
                    <>
                        {item.icon === "folder" ? "📁" : "📄"}
                        <input 
                            autoFocus 
                            value={tempName} 
                            onChange={(e) => setTempName(e.target.value)} 
                            onBlur={onSave}
                            onKeyDown={(e) => e.key === "Enter" && onSave()}
                        />
                    </>
                ) : (
                    <h3 onClick={() => setIsOpen(!isOpen)} style={{ cursor: "pointer", margin: 0 }}>
                        {item.icon === "folder" ? (isOpen ? "📂" : "📁") : "📄"} {item.name}
                    </h3>
                )}

                {isHovered && !isEditing && (
                    <div style={{ display: "flex", gap: "5px" }}>
                        {!isRoot && (
                            <>
                                <button onClick={() => setIsEditing(true)}>E</button>
                                <button onClick={() => handleAction(item.id, "DELETE")}>Remove</button>
                            </>
                        )}
                        {item.icon === "folder" && (
                            <>
                                <button onClick={() => { handleAction(item.id, "ADD_FILE"); setIsOpen(true); }}>File</button>
                                <button onClick={() => { handleAction(item.id, "ADD_FOLDER"); setIsOpen(true); }}>Folder</button>
                            </>
                        )}
                    </div>
                )}
            </div>

            {isOpen && item.data && item.data.map((child) => (
                <ReadData 
                    key={child.id} 
                    item={child} 
                    handleAction={handleAction} 
                    isRoot={false} 
                />
            ))}
        </div>
    );
};

export default ReadData;