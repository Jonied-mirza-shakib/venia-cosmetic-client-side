import React from 'react';
import { useParams } from 'react-router-dom';
import './UpdateBlog.css'
import { toast } from 'react-toastify';

const UpdateBlog = () => {
    const { id } = useParams();
    const handleUpdate = event => {
        event.preventDefault();
        const name = event.target.name.value;
        const img = event.target.imageUrl.value;
        const description = event.target.description.value;
        const updateBlog = { name, img, description }
        console.log(updateBlog)
        fetch(`https://venia-cosmetic-sever-side-jonied-mirza-shakib.vercel.app/blog/${id}`, {
            method: 'PUT', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updateBlog),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Success:', data);
               if(data.modifiedCount>0){
                toast('Blog Updated successfully')
               }else{
                toast.error('Blog Updated Filed')
               }
            })
            event.target.reset()
    }
    return (
        <div>
            <h1 className='text-3xl text-center text-blue-700 uppercase font-bold mt-5'>Update Blog</h1>
            <div>
                <form onSubmit={handleUpdate} className='update-form'>
                    <div>
                        <label for="name">Name</label>
                        <input type="text" name="name" placeholder='Name' />
                    </div>
                    <div>
                        <label for="image">Image</label>
                        <input type="text" name="imageUrl" placeholder='Image url' />
                    </div>
                    <div>
                        <label for="description">Description</label>
                        <textarea rows="10" name='description' placeholder='Description'></textarea>
                    </div>
                    <input type="submit" value="UPDATE" className='btn btn-accent text-xl text-white mt-5' />
                </form>
            </div>
        </div>
    );
};

export default UpdateBlog;