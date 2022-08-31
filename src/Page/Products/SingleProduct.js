import React from 'react';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import './SingleProduct.css'

const SingleProduct = ({ products, index }) => {
  const navigate = useNavigate();
  const handleCart = id => {
    console.log(id)
    navigate(`/productsDetails/${id}`)
  }
  return (
    <div key={products._id} class="card w-max-w bg-base-100 shadow-xl">
      <figure>
      <img src={products.img} alt=""/>
      </figure>
  <div class="card-body">
    <h2 class="card-title">{products.name}</h2>
    <p className='text-secondary text-xl font-bold'>$ {products.price}</p>
    <button type="button" onClick={()=>handleCart(products._id)} className='btn btn-primary'><AiOutlineShoppingCart style={{fontSize:'20px'}}/></button>
  </div>
</div>
  );
};

export default SingleProduct;