import { MENU_IMG_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addItem, removeItem, emptyCart } from "../redux/cart";
import {useState} from 'react';
import {useSelector} from 'react-redux';

const CatagoryItems = (props) => {
    const {items} = props.itemsList;
    const cartData = useSelector((store) => store.cart.items);
    const dispatch = useDispatch();

    const addedToCart = (item) => {
        dispatch(addItem(item));
    }

    const removeFromCart = (item) => {
        dispatch(removeItem(item));
    }

    return (
        items?.map((item) => {
            return (
                <div className="accordianData" key={item.id}>
                    <div>
                        <h4>{item.name}</h4>
                        <h5>{item.price/100} Rs.</h5>
                        <span style={{color:"rgb(41, 40, 40)"}}>{item.description}</span>
                    </div>
                    <div>
                        <img src={item.image} className="itemImage"/>   
                        {cartData.indexOf(item) === -1?
                        <button className="outerButton" onClick={() => addedToCart(item)}>ADD+</button>:
                        <span className="outerButton">
                            <button className="insideButton" onClick={() => removeFromCart(item)}>-</button>
                            <span>{cartData.filter((value) => value===item).length}</span>
                            <button className="insideButton" onClick={() => addedToCart(item)}>+</button> 
                        </span>}
                    </div>
                </div>
            )
        })
    )
}

export default CatagoryItems;