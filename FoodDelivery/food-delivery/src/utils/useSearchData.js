const useSearchData = ({setFilterData, restaurent,setSearchValue, searchValue}) => {
 const searchData = () => {
    if(searchValue != ""){
      const filterRes = restaurent.filter((value) => value.info.name.toLowerCase().includes(searchValue.toLowerCase()));
      setFilterData(filterRes);
      setSearchValue("");
    }
  }
  return {searchData};
}
export default useSearchData;