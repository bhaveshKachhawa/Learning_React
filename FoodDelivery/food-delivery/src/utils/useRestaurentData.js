import {useEffect, useState} from 'react';

const useRestaurentData = () => {
    const [restaurent, setRestaurant] = useState([]);
    const [filterData, setFilterData] = useState([]);

    const fetchData = async() => {
      const jsonData = await fetch('https://www.swiggy.com/dapi/restaurants/list/v5?lat=24.607913&lng=73.7330753&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING');
      const data = await jsonData.json();
      setRestaurant(data?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
      setFilterData(data?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
    }
    
      useEffect(() => { fetchData(); }, []);

    return {restaurent, filterData, setFilterData};    
}

export default useRestaurentData;