import React from 'react';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import './SingleProduct.css'

const SingleProduct = ({ products,index }) => {
  const navigate = useNavigate();
  const handleCart = id => {
    console.log(id)
    navigate(`/productsDetails/${id}`)
  }
  return (
    <tr key={products._id}>
        <th>{index + 1}</th>
        <td>{products.name}</td>
        <td><img className='w-40' src={products.img} alt=""/></td>
        <td className='text-secondary text-xl font-bold'>$ {products.price}</td>
        <td><button type="button" onClick={()=>handleCart(products._id)} className='btn btn-primary'><AiOutlineShoppingCart style={{fontSize:'20px'}}/></button></td>
      </tr>
  );
};

export default SingleProduct;