import RestaurentCard from './RestaurentCard';
import jsonString from '../utils/mockData';

const Body = () => {
  return (
    <div className="body">
        <div className="search">search</div>
        <div className="res-container">
          {jsonString.map((restaurant, index) => {
            return (<RestaurentCard key={index} resData={restaurant} />);
          })}
        </div>
    </div>
  );
}

export default Body;