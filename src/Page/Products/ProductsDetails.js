import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { BsArrowRightCircle } from 'react-icons/bs';
import './ProductsDetails.css'
import { addToDb, deleteShoppingCart, getStoredCart, removeFromDb } from '../../utilities/fakedb';
import BookingModal from './BookingModal';

const ProductsDetails = () => {
    const { id } = useParams();
    const [products, setProduct] = useState([]);
    const [cart, setCart] = useState([]);
    const [orderComplete,setOrderComplete]=useState(null)
    const navigate = useNavigate()
    useEffect(() => {
        fetch('https://venia-cosmetic-sever-side.onrender.com/products')
            .then(res => res.json())
            .then(data => setProduct(data))
    }, [])

    const singleProduct=products?.find(product=>product._id===id)

    useEffect( () =>{
        const storedCart = getStoredCart();
        console.log(storedCart)
        const savedCart = [];
        for(const id in storedCart){
            const addedProduct = products?.find(product=>product._id===id);
            if(addedProduct){
                const quantity = storedCart[id];
                addedProduct.quantity = quantity;
                savedCart.push(addedProduct);
            }
        }
        setCart(savedCart);
    }, [products])



    const handleProduct = () => {
        navigate('/products')
    }
    // products total increase price
    const handleIncrease = selectProduct => {
        let newCart = []
        const exist = cart.find(products => products._id === selectProduct._id);
        if (!exist) {
            selectProduct.quantity = 1;
            newCart = [...cart, selectProduct]
        } else {
            const rest = cart.filter(products => products._id !== selectProduct._id)
            exist.quantity = exist.quantity + 1;
            newCart = [...rest, exist]
        }
        setCart(newCart)
        addToDb(selectProduct._id)
    }

    let total = 0;
    let quantity = 0;

    for (const products of cart) {
        quantity = quantity + products.quantity;
        total = total + products.price * products.quantity;
    }
    let text = parseFloat((total * 5 / 100).toFixed(2))
    let orderTotal = parseInt(text + total)
    //product total increase price 
    const handleDecrease = selectProduct => {
        let newCart = []
        const exist = cart.find(products => products._id === selectProduct._id);
        if (!exist) {
            selectProduct.quantity = 1;
            newCart = [...cart, selectProduct]
        } else {
            const rest = cart.filter(products => products._id !== selectProduct._id)
            exist.quantity = exist.quantity - 1;
            newCart = [...rest, exist]
        }
        setCart(newCart)
        removeFromDb(selectProduct._id)
    }


    return (
        <div>
            <div className='productsDetails-bg'>
                <h1>PRODUCTS DETAILS</h1>
                <div className='productsDetails-product'>
                    <span><button type="button" onClick={handleProduct}>PRODUCTS</button></span>
                    <span><BsArrowRightCircle /></span>
                    <span>Products Details</span>
                </div>
            </div>
            <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4' style={{ width: '95%', margin: 'auto', marginTop: '40px' }}>
                <div>
                    <div class="card card-compact sm:w-full w-9/12 h-auto bg-base-100 shadow-xl" style={{ backgroundColor: '#F9F9F9' }}>
                        <figure><img className='w-7/12' src={singleProduct?.img} alt="Shoes" /></figure>
                        <div class="card-body text-center">
                            <h2 className='product-name'>{singleProduct?.name}</h2>
                            <h5 className='product-price mt-2'>${singleProduct?.price}</h5>
                            <div className='order-button'>
                                {quantity>0?<button type="button" className='btn first-btn' onClick={() => handleDecrease(singleProduct)}>-</button>:<button disabled type="button" className='btn first-btn' onClick={() => handleDecrease(singleProduct)}>-</button>
                                }
                                <button type="button" className='btn' onClick={() => handleIncrease(singleProduct)}>+</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div class="card w-max-w bg-base-100 shadow-xl order-bg">
                        <div class="card-body">
                            <div className='order-list'>
                                <h4>QUANTITY: {quantity}</h4>
                                <h4>TOTAL: ${total}</h4>
                                <h4>SHIPPING: ${text}</h4>
                                <h4>ORDER TOTAL: ${orderTotal}</h4>
                            </div>
                            <div className='order-button'>
                            <BookingModal 
                            orderTotal={orderTotal}
                            quantity={quantity}
                            setOrderComplete={setOrderComplete}
                            ></BookingModal>
                          
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductsDetails;