import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ManageProducts = () => {
    const [product, setProduct] = useState([]);
    const navigate=useNavigate();
    useEffect(() => {
        fetch('http://localhost:5000/products')
            .then(res => res.json())
            .then(data => setProduct(data))
    }, [])
    const handleUpdate=id=>{
        navigate(`/dashboard/updateProduct/${id}`)
    }
    return (
        <div>
            <h1 className='text-2xl text-center text-blue-700 uppercase font-bold mb-5 mt-5'>Manage Product</h1>
            <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10'>
                {
                    product.map(products =>
                        <div class="card card-compact w-max-w h-auto bg-base-100 shadow-xl" style={{ backgroundColor: '#F9F9F9' }}>
                            <figure><img className='w-full' src={products.img} alt="Shoes" /></figure>
                            <div class="card-body">
                                <h2 className='product-name'>{products.name}</h2>
                                <div className='grid lg:grid-cols-2 gap-4 justify-between mt-3'>
                                    <h5 className='product-price mt-2'>${products.price}</h5>
                                </div>
                                <div className='grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4'>
                                    <button onClick={()=>handleUpdate(products._id)} type="button" className='btn btn-success btn-xl text-gray-50 w-full'>UPDATE</button>
                                    <button type="button" className='btn btn-success btn-xl text-gray-50 w-full'>DELETE</button>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default ManageProducts;