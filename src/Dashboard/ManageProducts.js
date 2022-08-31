import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ManageProducts = () => {
    const [product, setProduct] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        fetch('https://venia-cosmetic-sever-side-jonied-mirza-shakib.vercel.app/products',{
            method: 'GET',
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => setProduct(data))
    }, [])
    const handleUpdate = id => {
        navigate(`/dashboard/updateProduct/${id}`)
    }
    const handleDelete = id => {
        const proceed = window.confirm('Are you sure You want to delete now');
        if (proceed) {
            fetch(`https://venia-cosmetic-sever-side-jonied-mirza-shakib.vercel.app/products/${id}`, {
                method: 'DELETE',
            })
            .then(res=>res.json())
            .then(data=>{
                if(data.deletedCount>0){
                    const remaining=product.filter(products=>products._id!==id);
                    setProduct(remaining)
                    toast('Your products deleted successfully')
                }
            })
        }
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
                                    <button onClick={() => handleUpdate(products._id)} type="button" className='btn btn-success btn-xl text-gray-50 w-full'>UPDATE</button>
                                    <button type="button" className='btn btn-success btn-xl text-gray-50 w-full' onClick={() => handleDelete(products._id)}>DELETE</button>
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