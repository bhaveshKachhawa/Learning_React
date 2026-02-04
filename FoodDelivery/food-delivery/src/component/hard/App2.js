import { useState } from "react";
import CommentBox from "./CommentBox";

const App2 = () => {
    const [comments, setComments] =  useState([
        {text:"Hello world! How are you?",
         replies:[{text:"child",replies:[],id:Date.now()+Math.random(),marginLeft:20}],
         id:Date.now()+Math.random(),
         marginLeft:10   
        }]);
    const [userInput, setUserInput] = useState("");
    const handleClick = () => {
        if(userInput === "") return;
        setComments((curr) => [{text:userInput, replies:[],id:Date.now()+Math.random(), marginLeft:10},...curr]);
        setUserInput("");
    }
    return (
        <div>
            <input type="text" placeholder="Add comment..." value={userInput} onChange={(e) => setUserInput(e.target.value)}/>
            <button onClick={handleClick}>Add</button>
            {comments.map((item, index) => <CommentBox key={item.id} item={item} addReply={(id, replyText) => {
                    const handleReply = (curr) => {
                        return curr.map((data) => {
                            if(data.id === id) {
                                const newReply = {text:replyText, id:Date.now()+Math.random(),replies:[], marginLeft:data.marginLeft+10}
                                return {...data, replies:[newReply,...data.replies]}
                            }
                            else {
                                return {...data, replies:handleReply(data.replies)}
                            }
                        });
                    }
                    setComments(handleReply(comments));
            }} handleDelete={(id) => {
                const handleDelete = (curr) => {
                    return curr.filter((item, index) => {
                        if(id !== item.id) return item;
                    }).map((data, index) => {return {...data, replies:handleDelete(data.replies)}});
                }
                setComments(handleDelete(comments));
            }}/>)}
        </div>
    );
}

export default App2;