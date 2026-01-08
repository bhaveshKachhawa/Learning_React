import CatagoryItems from "./CatagoryItems"
import {useSelector, useDispatch} from 'react-redux';
import { emptyCart } from "../redux/cart";

const Cart = () => {
    let cartData = useSelector((store) => store.cart.items);
    const dispatch = useDispatch();
    let filteredCartData = [];
    filteredCartData = cartData.filter((value) => {
        if(filteredCartData.reduce((acc, data) => {
            if(data.id === value.id) {
                acc = 1;
                return acc;
            }
            return acc;
        }, 0) === 0) {
        filteredCartData.push(value);
        return true;}
    });

    const removeCart = () => {
        dispatch(emptyCart());
    }

    return (cartData.length === 0)?<center><h2>Opps! Your cart is empty.</h2></center>:(
        <div style={{display:"flex", flexDirection:"Column",alignItems:"center",marginTop:"20px"}}>
            <button onClick={removeCart}>Empty Cart</button>
            <div className="cartData">
                <CatagoryItems itemsList={{items:filteredCartData}}/>
            </div>
        </div>
    )
}

export default Cart;