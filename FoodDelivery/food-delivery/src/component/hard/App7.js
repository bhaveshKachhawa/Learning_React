import { useEffect, useRef, useState } from "react";

const App7 = () => {
    const [img, setImg] = useState({
        data:null,
        index:0
    });
    const interval = useRef(null);
        useEffect(() => {fetchData();
        startInterval();
        return () =>{clearInterval(interval.current);}
    }, []);
    const fetchData = async() => {
        const response = await fetch(`https://pixabay.com/api/?key=54772168-f3f6545b9f5ee515ebf8a0435&q=cars&page=1&per_page=20`);
        const data = await response.json();
        setImg((curr) => {
            return {...curr,
            data:data.hits}
        });
    }
    const nextBtn = () => {
 setImg((curr) => {
                return {
                    ...curr,
                    index:curr.index >= 19?0:curr.index+1
                }
            })
    }
    const startInterval =() => {
        interval.current = setInterval(nextBtn, 3000);
    };
    return (
        <div style={{"border":"10px solid red","display":"flex"}} onMouseEnter={() => {
            clearInterval(interval.current);
        }} onMouseLeave={() => {startInterval()}}>
            <button onClick={() =>  setImg((curr) => {
                return {
                    ...curr,
                    index:curr.index === 0?0:curr.index-1
                }
            })}>Pre</button>
            {(img.data !== null)?(!img.data[img.index].userImageURL)?"Image not found":<img src={img.data[img.index].userImageURL}/>:null}
            <button onClick={nextBtn}>Next</button>
        </div>
    );
}

export default App7;