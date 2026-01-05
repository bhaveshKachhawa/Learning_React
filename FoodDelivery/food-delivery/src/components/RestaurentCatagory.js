import {useState} from 'react';
import CatagoryItems from './CatagoryItems';


const RestaurentCatagory = (props) => {
    const {data, show, setShowIndex} = props;

    const displayItem = () => {
        setShowIndex();
    }

    return (
        <div className="catagory">
            <div className="accordianHeader" onClick={displayItem}>
                <span>{data.title} ({data.items.length})</span>
                <span>⬇️</span>
            </div>
        {show?<CatagoryItems itemsList={data}/>:null}
        </div>
    )
}

export default RestaurentCatagory;