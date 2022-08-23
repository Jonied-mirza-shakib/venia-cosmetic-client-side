import React, { useEffect, useState } from 'react';
import './Products.css'
import { BsArrowRightCircle } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import SingleProduct from './SingleProduct';

const Products = () => {
    const navigate=useNavigate();
    const [product,setProduct]=useState([]);
    useEffect(()=>{
        fetch('https://warm-eyrie-71382.herokuapp.com/products',{
            method: 'GET',
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
        .then(res=>res.json())
        .then(data=>setProduct(data))
    },[])
    const handaleHome=()=>{
        navigate('/')
    }
    return (
        <div>
            <div className='products-bg'>
                <h1>PRODUCTS</h1>
                <div className='product-home'>
                <span><button type="button" onClick={handaleHome}>HOME</button></span>
                <span><BsArrowRightCircle/></span>
                <span>Products</span>
                </div>
            </div>
           <div className='product'>
           <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
                {
                    product.map(products=> <SingleProduct key={products._id} products={products}></SingleProduct>)
                }
            </div>
           </div>
        </div>
    );
};

export default Products;