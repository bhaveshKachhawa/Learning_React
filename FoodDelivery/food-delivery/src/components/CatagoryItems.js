import { MENU_IMG_URL } from "../utils/constants";

const CatagoryItems = (props) => {
    const {items} = props.itemsList;
    // console.log(items);
    return (
        items.map((item) => {
            return (
                <div className="accordianData" key={item.id}>
                    <div>
                        <h4>{item.name}</h4>
                        <h5>{item.price/100} Rs.</h5>
                        <span style={{color:"rgb(41, 40, 40)"}}>{item.description}</span>
                    </div>
                    <div>
                        <img src={item.image} className="itemImage"/>
                        <button className="addButton">ADD+</button>
                    </div>
                </div>
            )
        })
    )
}

export default CatagoryItems;