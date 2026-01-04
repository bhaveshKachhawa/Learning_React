import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import { MOCK_MENU } from '../utils/constants';
import RestaurentCatagory from './RestaurentCatagory';

const RestaurentMenu = () => {
    const {name} = useParams();
    const [showIndex, setShowIndex] = useState(null);
    return (
        <div className="catagoryList">
            <span style={{margin:"15px 0 15px 0"}}><h3>{name}</h3></span>
            {MOCK_MENU.map((catagory, index) => {
                return (
                    <RestaurentCatagory key={catagory.id} data={catagory} show={index == showIndex?true:false}
                    setShowIndex={()=> {
                        index===showIndex?setShowIndex(null):setShowIndex(index);
                    }
                }/>
                )
            })}
        </div>
    )
}

export default RestaurentMenu;