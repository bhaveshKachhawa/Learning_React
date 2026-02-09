import { useState } from "react";
import CheckBox from "./CheckBox";

const App4 = () => {
    const [data, setData] = useState([
        {
            name:"p1",
            id:Date.now()+Math.random(),
            checked:false,
            child:[{name:"p1-c1",
                 id:Date.now()+Math.random(),
                checked:false,
                child:[{
                    name:"p1-c1-c1",
                     id:Date.now()+Math.random(),
                    checked:false,
                },{
                    name:"p1-c1-c2",
                     id:Date.now()+Math.random(),
                    checked:false,
                    child:[{
                        name:"p1-c1-c2-c2-c1",
                         id:Date.now()+Math.random(),
                        checked:false
                    },{
                        name:"p1-c1-c2-c2-c2",
                         id:Date.now()+Math.random(),
                        checked:false
                    }]
                },{
                    name:"p1-c1-c2-c3",
                     id:Date.now()+Math.random(),
                    checked:false
                }]
            },{name:"p1-c2",
                 id:Date.now()+Math.random(),
                checked:false
            },{name:"p1-c3",
                 id:Date.now()+Math.random(),
                checked:false
            }]
        },{name:"p2",
             id:Date.now()+Math.random(),
            checked:false,
            child:[{name:"p2-c1",
                 id:Date.now()+Math.random(),
                checked:false
            },{name:"p2-c2",
                 id:Date.now()+Math.random(),
                checked:false
            }]
        },{name:"p3",
             id:Date.now()+Math.random(),
            checked:false,
            child:[{name:"p3-c1",
                 id:Date.now()+Math.random(),
                checked:false
            }]
        },{name:"p4",
             id:Date.now()+Math.random(),
            checked:false
        }
    ]);
const handleData = (id) => {

    const toggleAllChildren = (item, status) => {
        return {
            ...item,
            checked: status,
            child: item.child ? item.child.map(c => toggleAllChildren(c, status)) : item.child
        };
    };

    const updateData = (list) => {
        return list.map((item) => {
            if (item.id === id) {
                const newStatus = !item.checked;
                return toggleAllChildren(item, newStatus);
            }

            if (item.child) {
                return { ...item, child: updateData(item.child) };
            }

            return item;
        });
    };

    setData(updateData(data));
};

    return (
        <div style={{"marginLeft":"20"}}>
            {data.map((item, index) => {
                return <CheckBox item={item} key={index} handleData={(id) => handleData(id)}/>
            })}
        </div>
    );
}

export default App4;