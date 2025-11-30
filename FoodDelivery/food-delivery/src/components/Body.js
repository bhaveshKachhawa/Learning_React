import RestaurentCard from './RestaurentCard';
import resData from '../utils/mockData';
import {useState} from 'react';

const Body = () => {
  let [restaurent, setRestaurant] = useState(resData);

  const topRatedRes = () => {
  const filterData = resData.filter((restaurant) => restaurant.info.avgRating > 4.2);
  setRestaurant(filterData);
}
  return (
    <div className="body">
        <div className="btn">
          <button className="btn-filter" onClick={topRatedRes}>Top rated restaurant</button>
        </div>
        <div className="res-container">
          {restaurent.map((restaurant, index) => {
            return (<RestaurentCard key={index} resData={restaurant} />);
          })}
        </div>
    </div>
  );
}

export default Body;