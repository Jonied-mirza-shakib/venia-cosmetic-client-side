import React from 'react';
import { useQuery } from 'react-query'
import Loading from '../Loading/Loading';
import { toast } from 'react-toastify';

const Users = () => {
    const { data: users, isLoading, refetch } = useQuery('users', () => fetch('https://venia-cosmetic-sever-side.onrender.com/user', {
        method: 'GET',
        headers: {
            authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then(res => res.json()));
    if (isLoading) {
        return <Loading></Loading>
    }

    const makeAdmin = email => {
        fetch(`https://venia-cosmetic-sever-side.onrender.com/user/admin/${email}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Success:', data);
                if (data.modifiedCount > 0) {
                    toast('successfully Made an admin')
                    refetch()
                } else {
                    toast.error('Filed to Made an admin')
                    refetch()
                }
            })
    }

    return (
        <div>
            <h1 className='text-2xl text-center text-blue-700 uppercase font-bold mb-5 mt-5'>All User</h1>
            <div class="overflow-x-auto">
                <table class="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Email</th>
                            <th>Admin</th>
                            <th>Remove</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users?.map((user, index) =>
                                <tr key={user._id}>
                                    <th>{index + 1}</th>
                                    <td>{user.email}</td>
                                    <td>{user.role !== 'admin' && <button onClick={() => makeAdmin(user.email)} type="button" className='btn btn-secondary'>Make Admin</button>}</td>
                                    <td> <button type="button" className='btn btn-secondary'>Remove User</button> </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Users;