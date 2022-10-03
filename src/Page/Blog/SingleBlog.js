import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SingleBlog.css'

const SingleBlog = ({ blogs }) => {
    const navigate=useNavigate()
    const handleBlog=id=>{
        navigate(`/blogDetails/${id}`)
    }
    return (
        <div className="card card-compact w-max-w h-auto bg-base-100 shadow-xl" style={{backgroundColor:'#F9F9F9'}}>
        <figure><img className='w-full' src={blogs.img} alt="Shoes" /></figure>
        <div className="card-body">
          <h2 className='blog-name'>{blogs.name}</h2>
          <p className='mt-2 blog-description'>{blogs.description.slice(0,200)}</p>
          <div>
          <button className="btn btn-active btn-link" onClick={()=>handleBlog(blogs._id)}>READ MORE</button>
          </div>
        </div>
      </div>
    );
};

export default SingleBlog;