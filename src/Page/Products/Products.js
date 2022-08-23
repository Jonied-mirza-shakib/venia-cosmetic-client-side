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
           <div class="overflow-x-auto">
                <table class="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Image</th>
                            <th>Price</th>
                            <th>Cart</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            product.map((products,index)=> <SingleProduct key={products._id} index={index} products={products}></SingleProduct>)
                        }
                    </tbody>
                </table>
            </div>
           <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
                {
                    
                }
            </div>
           </div>
        </div>
    );
};

export default Products;