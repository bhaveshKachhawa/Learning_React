import RestaurentCard from './RestaurentCard';
import {useState,useEffect} from 'react';
import Shimmer from './Shimmer';
import {Link} from 'react-router-dom';
import useRestaurentData from '../utils/useRestaurentData';
import useTopRatedRes from '../utils/useTopRatedRes';
import useSearchData from '../utils/useSearchData';

const Body = () => {
  const [searchValue, setSearchValue] = useState("");
    const allRestaurents = () => {
      setFilterData(restaurent);
    }

const {restaurent, filterData, setFilterData} = useRestaurentData();
const {topRatedRes} = useTopRatedRes(setFilterData, restaurent);
const {searchData} = useSearchData({setFilterData, restaurent,setSearchValue, searchValue});

  return restaurent.length === 0 ? <Shimmer />:(
    <div className="body">
        <div className="btn">
          <button className="btn-filter" onClick={allRestaurents}>All restaurants</button>
          <button className="btn-filter" onClick={topRatedRes}>Top rated restaurant</button>
          <input type="text" className="search" placeholder="Search" value={searchValue} onChange={(e) => {
            setSearchValue(e.target.value);
          } }></input>
          <button onClick={searchData}>search</button>
        </div>
        <div className="res-container">
          {filterData.map((restaurant, index) => {
            return (<Link key={index} to={"restaurent/"+ restaurant.info.name}><RestaurentCard resData={restaurant}/></Link>);
          })}
        </div>
    </div>
  );
}

export default Body;