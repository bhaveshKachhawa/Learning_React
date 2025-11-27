import { cloudPath } from "../utils/constants";

const RestaurentCard = (props) => {

  const {resData} = props;
  const resDataObj = JSON.parse(resData);
  const {name, cuisines, avgRating, cloudinaryImageId} = resDataObj.info;

  return (
    <div className='res-card'>
        <img className='img-logo' src={cloudPath + cloudinaryImageId} alt='opps image not found' />
        <h3>{name}</h3>
        <h4>{cuisines.join(", ")}</h4>
        <h4>{avgRating}</h4>
        <h4>{resDataObj.info.sla.deliveryTime} min</h4>
    </div>
  );
}

export default RestaurentCard;