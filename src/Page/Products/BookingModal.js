import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import './BookingModal.css'
import { toast } from 'react-toastify';
import { deleteShoppingCart, removeFromDb } from '../../utilities/fakedb';
import { useForm } from 'react-hook-form';

const BookingModal = ({ orderTotal, quantity }) => {
    const [user, loading] = useAuthState(auth);
    const { register, formState: { errors }, handleSubmit,reset } = useForm();

    const onSubmit = (data) => {
        const name = data.name;
        const email = data.email;
        const number = data.number;
        const quantity = parseInt(data.quantity);
        const total = parseInt(data.total);
        const orderData = { name, email, number, quantity, total };
        console.log(orderData)
        fetch('https://venia-cosmetic-sever-side-production-0705.up.railway.app/order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderData),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Success:', data);
                if (data.insertedId) {
                    toast("Your order is successful")
                }
                reset()
                deleteShoppingCart()
            })
    };

    return (
        <div>
            <label for="my-modal-3" className="btn modal-button">Continue Order</label>
            <input type="checkbox" id="my-modal-3" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label for="my-modal-3" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div style={{ marginBottom: '10px' }}>
                            <label for="name">NAME</label>
                            <input type="text" name="name" className='w-full' style={{ border: '1px solid black', padding: '10px' }} {...register("name", { required: "Name is required" })} placeholder='Your Name' />
                            <p>{errors.name?.message}</p>
                        </div>
                        <div style={{ marginBottom: '10px' }}>
                            <label for="email">EMAIL</label>
                            <input type="email" name="email" value={user?.email} readOnly className='w-full' style={{ border: '1px solid black', padding: '10px' }} {...register("email", { required: "email is required" })} />
                            <p>{errors.email?.message}</p>
                        </div>
                        <div style={{ marginBottom: '10px' }}>
                            <label for="number">NUMBER</label>
                            <input type="text" name="number" placeholder='Your Number' className='w-full' style={{ border: '1px solid black', padding: '10px' }} {...register("number", { required: "number is required" })} />
                            <p>{errors.number?.message}</p>
                        </div>
                        <div style={{ marginBottom: '10px' }}>
                            <label for="quantity">QUANTITY</label>
                            <input type="text" value={quantity} readOnly className='w-full' style={{ border: '1px solid black', padding: '10px' }} {...register("quantity", { required: "quantity is required" })} />
                            <p>{errors.quantity?.message}</p>
                        </div>
                        <div style={{ marginBottom: '10px' }}>
                            <label for="number">TOTAL</label>
                            <input type="text" value={orderTotal} readOnly className='w-full' style={{ border: '1px solid black', padding: '10px' }} {...register("total", { required: "total is required" })} />
                            <p>{errors.total?.message}</p>
                        </div>
                        <input style={{ fontSize: '20px' }} className='w-full text-center cursor-pointer font-bold bg-accent text-white' type="submit" value='ORDER NOW' />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BookingModal;