import { cloudPath } from "../utils/constants";

const RestaurentCard = (props) => {

  const {resData} = props;
  const {name, cuisines, avgRating, cloudinaryImageId} = resData.info;

  return (
    <div className='res-card'>
        <img className='img-logo' src={cloudPath + cloudinaryImageId} alt='opps image not found' />
        <h3>{name}</h3>
        <h4>{cuisines.join(", ")}</h4>
        <h4>{avgRating}</h4>
        <h4>{resData.info.sla.deliveryTime} min</h4>
    </div>
  );
}

// const labeledRestaurentCard = (RestaurentCard) => {
//   return () => {
//     return (
//       <label></label>
//     );
//   }
// }

export default RestaurentCard;