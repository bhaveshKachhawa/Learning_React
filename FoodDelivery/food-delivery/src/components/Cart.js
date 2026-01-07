import CatagoryItems from "./CatagoryItems"
import {useSelector} from 'react-redux';

const Cart = () => {
    let cartData = useSelector((store) => store.cart.items);
    console.log(cartData);
    let filteredCartData = [];
    // console.log(filteredCartData);
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
    // console.log(filteredCartData);
    return (
        <div style={{display:"flex", justifyContent:"center"}}>
            <div className="cartData">
                <CatagoryItems itemsList={{items:filteredCartData}}/>
            </div>
        </div>
    )
}

export default Cart;