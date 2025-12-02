import RestaurentCard from './RestaurentCard';
import {useState,useEffect} from 'react';
import Shimmer from './Shimmer';

const Body = () => {
  let [restaurent, setRestaurant] = useState([]);

  const topRatedRes = () => {
  const filterData = restaurent.filter((restaurant) => restaurant.info.avgRating > 4.2);
  setRestaurant(filterData);
}

const fetchData = async() => {
  const jsonData = await fetch('https://www.swiggy.com/dapi/restaurants/list/v5?lat=26.26920&lng=73.00900&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING');
  const data = await jsonData.json();
  setRestaurant(data?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
}

  useEffect(() => { fetchData(); }, []);

  
  return restaurent.length == 0 ? <Shimmer />:(
    <div className="body">
        <div className="btn">
          <button className="btn-filter" onClick={topRatedRes}>Top rated restaurant</button>
          <input type="text" className="search" placeholder="Search"></input>
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