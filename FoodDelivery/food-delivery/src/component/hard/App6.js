import {useEffect, useState} from 'react';
import Button from './Button';
const App6 = () => {
    const [img, setImg] = useState(null);
    const [page, setPage] = useState(1);
    const fetchData = async() => {
        const response = await fetch(`https://pixabay.com/api/?key=54772168-f3f6545b9f5ee515ebf8a0435&q=cars&page=${page}&per_page=5`);
        const data = await response.json();
        setImg(data.hits);
    }
    useEffect(() => {
        fetchData();
    }, [page]);
    return (
        <div>
            <div style={{"border":"2px solid red","height":"200px","display":"flex","backgroundColor":"red"}}>
                {img && img.map((data, index) => {
                    if (!data.userImageURL) return null;
                    return <img src={data.userImageURL} key={index}/>
                })}
            </div>
            <Button page={page} setPage={(value) => {
                setPage(value);
            }}/>
        </div>
    );
}

export default App6;