import RestaurentCard from './RestaurentCard';
import {useState,useEffect} from 'react';
import Shimmer from './Shimmer';
import {Link} from 'react-router-dom';

const Body = () => {
  const [restaurent, setRestaurant] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const topRatedRes = () => {
  const filterData = restaurent.filter((restaurant) => restaurant.info.avgRating > 4.2);
  setFilterData(filterData);
}

const fetchData = async() => {
  const jsonData = await fetch('https://www.swiggy.com/dapi/restaurants/list/v5?lat=24.607913&lng=73.7330753&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING');
  const data = await jsonData.json();
  setRestaurant(data?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
  setFilterData(data?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
}

  useEffect(() => { fetchData(); }, []);

  const searchData = () => {
    const filterRes = restaurent.filter((value) => value.info.name.toLowerCase().includes(searchValue.toLowerCase()));
    setFilterData(filterRes);
    setSearchValue("");
  }
  
  return !restaurent || restaurent.length === 0 ? <Shimmer />:(
    <div className="body">
        <div className="btn">
          <button className="btn-filter" onClick={topRatedRes}>Top rated restaurant</button>
          <input type="text" className="search" placeholder="Search" value={searchValue} onChange={(e) => {
            setSearchValue(e.target.value);
          } }></input>
          <button onClick={searchData}>search</button>
        </div>
        <div className="res-container">
          {filterData.map((restaurant, index) => {
            return (<Link key={index} to={"restaurent/"+ restaurant.info.id}><RestaurentCard resData={restaurant}/></Link>);
          })}
        </div>
    </div>
  );
}

export default Body;