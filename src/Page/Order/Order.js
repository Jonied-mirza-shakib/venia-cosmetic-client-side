import { signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, useNavigate } from 'react-router-dom';
import auth from '../../firebase.init';
import './Order.css'

const Order = () => {
    const [order, setOrder] = useState([]);
    const [user, loading] = useAuthState(auth);
    const navigate = useNavigate();
    useEffect(() => {
        fetch(`https://venia-cosmetic-sever-side-production.up.railway.app/order?email=${user?.email}`, {
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
    }, [user?.email, navigate])



    const handleClick = id => {
        fetch(`https://venia-cosmetic-sever-side-production.up.railway.app/order/${id}`, {
            method: 'DELETE', // or 'PUT'
        })
        .then(res=> res.json())
        .then(res=> {
            console.log(res)
            if(res.deletedCount){
                const previewOrder = order.filter(orders=> orders._id !== id)
                setOrder(previewOrder)
            }
        })
    }

    return (
        <div className='order'>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Number</th>
                            <th>Quantity</th>
                            <th>Total</th>
                            <th>Payment</th>
                            <th>Delete</th>
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
                                        {(orders.total && !orders.paid) && <Link to={`/payment/${orders._id}`}><button type="button" className='btn btn-xs'>Pay</button></Link>}
                                        {
                                            (orders.total && orders.paid) && <>
                                                <span className='text-success'>Paid</span>
                                                <br />
                                                <span className='text-success'>{orders.transactionId}</span>
                                            </>
                                        }
                                    </td>
                                    <td><button onClick={() => handleClick(orders._id)} type="button" className='btn btn-outline btn-primary'>DELETE</button></td>
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