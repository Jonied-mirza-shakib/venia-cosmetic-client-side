import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import Loading from '../../Loading/Loading';
import './Comments.css'

const Comments = () => {
    const { register, handleSubmit } = useForm();
    const [comment, setComment] = useState([]);
    const [loadings, setLoadings] = useState(true);
    useEffect(() => {
        fetch('https://venia-cosmetic-sever-side.onrender.com/comments')
            .then(res => res.json())
            .then(data => {
                setComment(data)
                setLoadings(false)
            })
    }, [])

    if(loadings){
        return <Loading></Loading>
    }

    // post method
    const onSubmit = data => {
        fetch('https://venia-cosmetic-sever-side.onrender.com/comments', {
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
                    toast("Your comment is successful")
                }
            })
    }
    return (
        <div className='comments'>
            <h1 className='text-2xl font-sans mb-10'>Leave A Comments</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='grid sm:grid-cols-1 lg:grid-cols-2 gap-4'>
                <input {...register("name")} placeholder="Your Name" name='name' className="input input-bordered input-warning w-full max-w-xs" />
                <input {...register("email")} type="email" placeholder="Your Email" name='email' className="input input-bordered input-warning w-full max-w-xs" />
                </div>
                <textarea {...register("message")} rows="10" name='message' placeholder='Your Message'></textarea>
                <br />
                <input type="submit" className='btn btn-outline btn-secondary submit' />
            </form>
            <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10'>
                {
                    comment.map(comments =>
                        <div className="card w-mx-w bg-base-100 shadow-xl">
                            <div className="card-body">
                                <h2 className="card-title">Name: {comments.name}</h2>
                                <p>Email: {comments.email}</p>
                               <p>Message: {comments.message}</p>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>

    );
};

export default Comments;