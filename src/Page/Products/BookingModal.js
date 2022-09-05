import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import './BookingModal.css'
import { toast } from 'react-toastify';
import { deleteShoppingCart, removeFromDb } from '../../utilities/fakedb';

const BookingModal = ({orderTotal, quantity }) => {
    const [user, loading] = useAuthState(auth);
    const handleOrder = event => {
        event.preventDefault()
        const name = event.target.name.value;
        const email = event.target.email.value;
        const number = event.target.number.value;
        const quantity = event.target.quantity.value;
        const total = event.target.total.value;
        const data = { name, email, number, quantity, total };
        fetch('https://warm-eyrie-71382.herokuapp.com/order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Success:', data);
                if (data.insertedId) {
                    toast("Your order is successful")
                    deleteShoppingCart()
                }
                
            })
    }

    return (
        <div>
            <label for="my-modal-3" class="btn modal-button" onClick={() => handleOrder(orderTotal)}>Continue Order</label>
            <input type="checkbox" id="my-modal-3" class="modal-toggle" />
            <div class="modal">
                <div class="modal-box relative">
                    <label for="my-modal-3" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <form onSubmit={handleOrder}>
                        <div>
                            <label for="name">NAME</label>
                            <input type="text" name="name" placeholder='Your Name' />
                        </div>
                        <div>
                            <label for="email">EMAIL</label>
                            <input type="email" name="email" value={user?.email} readOnly />
                        </div>
                        <div>
                            <label for="number">NUMBER</label>
                            <input type="text" name="number" placeholder='Your Number' />
                        </div>
                        <div>
                            <label for="quantity">QUANTITY</label>
                            <input type="text" name="quantity" value={quantity} readOnly />
                        </div>
                        <div>
                            <label for="number">TOTAL</label>
                            <input type="text" name="total" value={orderTotal} readOnly />
                        </div>
                        <input type="submit" className='btn btn-success mt-10 w-full text-white text-xl' value="ORDER" />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BookingModal;