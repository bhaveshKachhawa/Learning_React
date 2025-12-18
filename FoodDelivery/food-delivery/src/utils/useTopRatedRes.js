
const useTopRatedRes = (setFilterData, restaurent) => {
        const topRatedRes = () => {
      const filterData = restaurent.filter((restaurant) => restaurant.info.avgRating > 4.2);
      setFilterData(filterData);
    }


    return {topRatedRes};
}

export default useTopRatedRes;