import { useRef, useState } from "react";

const CommentBox = ({item, addReply, handleDelete}) => {
    const [reply, setReply] = useState(true);
    const replyText = useRef(null);
    const handleClick = (id) => {
        if(!replyText.current.value) return;
        addReply(id, replyText.current.value);
        setReply(!reply);
    }
    const handleDeleteUpdate = (id) => {
            handleDelete(id);
    }

    return (
        <>
        <div style={{
            "marginLeft":item.marginLeft,
            "width":"90%",
            "height":"100px",
            "borderLeft":"5px solid blue",
            "backgroundColor":"lightgray"
        }}>
            <h3>{item.text}</h3>
            {reply?<><button onClick={() => setReply(!reply)}>Reply</button><button onClick={() => handleDeleteUpdate(item.id)}>Delete</button></>:<>
                <input type="text" placeholder="Reply..." ref={replyText}/>
                <button onClick={() => handleClick(item.id, true)}>Add</button><button onClick={() => setReply(!reply)}>Cancel</button>
            </>}
        </div>
        {item.replies.map((data, index) => <CommentBox key={data.id} item={data} addReply={addReply} handleDelete={handleDelete}/>)}
        </>
    );
}

export default CommentBox;