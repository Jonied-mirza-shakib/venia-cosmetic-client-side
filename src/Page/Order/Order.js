import { signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, useNavigate } from 'react-router-dom';
import auth from '../../firebase.init';
import './Order.css'

const Order = () => {
    const [order, setOrder] = useState([]);
    const [user, loading] = useAuthState(auth);
    const navigate=useNavigate();
    useEffect(() => {
        fetch(`https://venia-cosmetic-sever-side-dkuh-jonied-mirza-shakib.vercel.app/order?email=${user?.email}`, {
            method: 'GET',
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => {
                if (res.status === 401 || res.status === 403) {
                    signOut(auth);
                    localStorage.removeItem('accessToken')
                    navigate('/')
                }
                return res.json()
            })
            .then(data => {
                setOrder(data)
            })
    }, [user?.email,navigate])
    return (
        <div className='order'>
            <div class="overflow-x-auto">
                <table class="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Number</th>
                            <th>Quantity</th>
                            <th>Total</th>
                            <th>Payment</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            order.map((orders, index) =>
                                <tr key={orders._id}>
                                    <th>{index + 1}</th>
                                    <td>{orders.name}</td>
                                    <td>{orders.email}</td>
                                    <td>{orders.number}</td>
                                    <td>{orders.quantity}</td>
                                    <td>{orders.total}</td>
                                    <td>
                                        {(orders.total&& !orders.paid)&& <Link to={`/payment/${orders._id}`}><button type="button" className='btn btn-xs'>Pay</button></Link> }
                                        {
                                           (orders.total&& orders.paid)&& <>
                                           <span className='text-success'>Paid</span>
                                           <br/>
                                           <span className='text-success'>{orders.transactionId}</span>
                                           </>
                                        }
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Order;