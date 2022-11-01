import React, { useEffect, useState } from 'react';
import './Products.css'
import { BsArrowRightCircle } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import SingleProduct from './SingleProduct';
import Loading from '../../Loading/Loading';

const Products = () => {
    const navigate=useNavigate();
    const [product,setProduct]=useState([]);
    const [loadings, setLoadings] = useState(true);
    useEffect(()=>{
        fetch('http://localhost:5000/products')
        .then(res=>res.json())
        .then(data=>{
            setProduct(data)
            setLoadings(false)
        })
    },[])
    if(loadings){
        return <Loading></Loading>
    }
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
                    product.map((products,index)=> <SingleProduct key={products._id} index={index} products={products}></SingleProduct>)
                }
            </div>
           </div>
        </div>
    );
};

export default Products;