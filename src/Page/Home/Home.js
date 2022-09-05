import React, { useEffect, useState } from 'react';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import Blog from '../Blog/Blog';
import './Home.css'
import JustForYour from './JustForYour';

const Home = () => {
    const navigate = useNavigate()
    const [product, setProduct] = useState([]);
    useEffect(() => {
        fetch('https://warm-eyrie-71382.herokuapp.com/products')
            .then(res => res.json())
            .then(data => setProduct(data))
    }, [])
    const handleProduct = () => {
        navigate('/products')
    }
    const navigateToProduct = () => {
        navigate('/products')
    }
    const navigateToProducts = () => {
        navigate('/products')
    }
    const handleCart = id => {
        navigate(`/productsDetails/${id}`)
    }
    const handleShop=()=>{
        navigate('/products')
    }
    return (
        <div>
            <div className='home-bg'>
                <div className='home-allTitle'>
                    <h2>OUT NOW</h2>
                    <h3>NEW BEAUTY TREND</h3>
                    <h4>Discover our collection for this new hot season.</h4>
                    <button onClick={handleProduct} type="button" className='btn btn-outline btn-secondary'>SHOP NOW</button>
                </div>
            </div>
            <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 home-bg-second-section'>
                <div className='home-bg-third-section'>
                    <h1>Skin Care Products</h1>
                    <h4>DAILY ESSENTIALS</h4>
                    <button onClick={navigateToProducts} type="button" className='btn btn-outline btn-secondary'>Explore All</button>
                </div>
                <div className='home-bg-four-section'>
                    <h1>Lipstick Collection</h1>
                    <h4>DAILY ESSENTIALS</h4>
                    <button onClick={navigateToProduct} type="button" className='btn btn-outline btn-secondary'>Explore All</button>
                </div>
            </div>
            <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mt-10 home-bg-five-section'>
                <div>
                    <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 lg:mt-20'>
                    {
                        product.splice(0, 2).map(products =>
                            <div class="card card-compact w-max-w h-auto bg-base-100 shadow-xl" style={{ backgroundColor: '#F9F9F9' }}>
                                <figure><img className='w-full' src={products.img} alt="Shoes" /></figure>
                                <div class="card-body">
                                    <h2 className='product-name'>{products.name}</h2>
                                    <div className='grid lg:grid-cols-2 gap-4 justify-between mt-3'>
                                        <h5 className='product-price mt-2'>${products.price}</h5>
                                        <button type="button" onClick={() => handleCart(products._id)} className='btn'><AiOutlineShoppingCart style={{fontSize:'20px'}}/></button>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                    </div>
                </div>
                <div className='home-bg-six-section'>
                <button onClick={handleShop} type="button" className='btn btn-outline btn-secondary'>SHOP NOW</button>
                </div>
            </div>
          <div>
          <JustForYour></JustForYour>
            <Blog></Blog>
          </div>
        </div>
    );
};

export default Home;