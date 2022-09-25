import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ManageBlog = () => {
    const [blogs, setBlog] = useState([]);
    const navigate=useNavigate()
    useEffect(() => {
        fetch('https://warm-eyrie-71382.herokuapp.com/blog')
            .then(res => res.json())
            .then(data => setBlog(data))
    }, [])
    const handleUpdate = id => {
        navigate(`/dashboard/updateBlog/${id}`)
    }
    const handleDelete=id=>{
        const proceed=window.confirm('Are you sure you want to delete now');
        if(proceed){
            fetch(`https://warm-eyrie-71382.herokuapp.com/blog/${id}`,{
                method:'DELETE'
            })
            .then(res=>res.json())
            .then(data=>{
                if(data.deletedCount>0){
                    const remaining=blogs.filter(blog=>blog._id!==id);
                    setBlog(remaining);
                    toast('Blog deleted successfully');
                }
            })
        }
    }
    return (
        <div>
            <h1 className='text-3xl text-center text-blue-700 uppercase font-bold mt-5'>Manage Blog</h1>
            <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mb-10'>
                {
                    blogs.map(blogs =>
                        <div class="card card-compact w-max-w h-auto bg-base-100 shadow-xl" style={{ backgroundColor: '#F9F9F9' }}>
                            <div style={{padding:'20px'}}>
                                <h1 className='text-2xl mb-5 text-center'>{blogs.name}</h1>
                                <img src={blogs.img} alt="" />
                                <p className='mt-5'>{blogs.description}</p>
                            </div>
                            <div className='grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4'>
                                    <button onClick={()=>handleUpdate(blogs._id)} type="button" className='btn btn-success btn-xl text-gray-50 w-full'>UPDATE</button>
                                    <button type="button" className='btn btn-success btn-xl text-gray-50 w-full' onClick={()=>handleDelete(blogs._id)}>DELETE</button>
                                </div>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default ManageBlog;