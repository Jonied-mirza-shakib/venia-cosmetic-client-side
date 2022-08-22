import React from 'react';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import './SingleProduct.css'

const SingleProduct = ({products}) => {
    const navigate=useNavigate();
    const handleCart=id=>{
        console.log(id)
        navigate(`/productsDetails/${id}`)
    }
    return (
        <div class="card card-compact w-max-w h-auto bg-base-100 shadow-xl" style={{backgroundColor:'#F9F9F9'}}>
        <figure><img className='w-full' src={products.img} alt="Shoes" /></figure>
        <div class="card-body">
          <h2 className='product-name'>{products.name}</h2>
          <div className='grid lg:grid-cols-2 gap-4 justify-between mt-3'>
          <h5 className='product-price mt-2'>${products.price}</h5>
            <button type="button" onClick={()=>handleCart(products._id)} className='btn'><AiOutlineShoppingCart style={{fontSize:'20px'}}/></button>
          </div>
        </div>
      </div>
    );
};

export default SingleProduct;