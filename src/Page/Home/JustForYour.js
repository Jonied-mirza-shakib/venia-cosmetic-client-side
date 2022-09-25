import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './JustForYour.css'
import { AiOutlineShoppingCart } from 'react-icons/ai';

const JustForYour = () => {
    const navigate=useNavigate()
    const [product, setProduct] = useState([]);
    useEffect(() => {
        fetch('https://warm-eyrie-71382.herokuapp.com/products',{
            method: 'GET',
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => setProduct(data))
    }, [])
    const handleCart=id=>{
        navigate(`/productsDetails/${id}`)
    }
    const handleShop=()=>{
        navigate('/products')
    }
    return (
        <div className='JustForYour-bg'>
            <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mt-10'>
            <div className='just-for-you-first-section'>
                <button onClick={handleShop} type="button" className='btn btn-secondary'>SHOP NOW</button>
                </div>
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
            </div>
        </div>
    );
};

export default JustForYour;