import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import './Order.css'

const Order = () => {
    const [order, setOrder] = useState([]);
    const [user, loading] = useAuthState(auth);
    useEffect(() => {
        fetch(`https://warm-eyrie-71382.herokuapp.com/order?email=${user?.email}`)
            .then(res => res.json())
            .then(data => setOrder(data))
    }, [user?.email])
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
                        </tr>
                    </thead>
                    <tbody>
                        {
                            order.map((orders,index) =>
                                <tr key={orders._id}>
                                    <th>{index+1}</th>
                                    <td>{orders.name}</td>
                                    <td>{orders.email}</td>
                                    <td>{orders.number}</td>
                                    <td>{orders.quantity}</td>
                                    <td>{orders.total}</td>
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