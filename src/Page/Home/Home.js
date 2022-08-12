import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css'

const Home = () => {
    const navigate=useNavigate()
    const handleProduct=()=>{
        navigate('/products')
    }
    return (
        <div className='home-bg'>
           <div className='home-allTitle'>
            <h2>OUT NOW</h2>
            <h3>NEW BEAUTY TREND</h3>
            <h4>Discover our collection for this new hot season.</h4>
            <button onClick={handleProduct} type="button" className='btn btn-outline btn-secondary'>SHOP NOW</button>
           </div>
        </div>
    );
};

export default Home;