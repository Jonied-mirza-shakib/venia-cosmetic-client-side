import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import auth from '../../firebase.init';
import Loading from '../../Loading/Loading';
import './Payment.css'
import { loadStripe } from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe('pk_test_51L4fLCD15eCVhrzNkkD1sfSX6fDlCTxWEEHGvfPTnbV6eKH0iQ1Gqq5wkIlZNSHDSDmEb8ncfMRzfsIK7qyKFYKB0074WtiDi1');

const Payment = () => {
    const { id } = useParams();
    const [user, loading] = useAuthState(auth);
    const { data: orders, isLoading, refetch } = useQuery(['order', id], () => fetch(`http://localhost:5000/order/${id}`, {
        method: 'GET',
        headers: {
            authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then(res => res.json()));
    if (isLoading) {
        return <Loading></Loading>
    }
    return (
        <div className='payment'>
            <div className='cards'>
                <div className="card w-96 bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title text-success">Hello,{user?.email}</h2>
                        <p className='text-xl text-primary font-bold'>Please Pay for ${orders?.total}</p>
                    </div>
                </div>
            </div>
            <div className='cards mt-10' style={{width:'100%'}}>
                <div className="card w-96 max-w-lg bg-base-100 shadow-xl">
                    <div className="card-body">
                        <Elements stripe={stripePromise}>
                            <CheckoutForm orders={orders}/>
                        </Elements>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Payment;