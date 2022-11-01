import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Comments from '../Comments/Comments';
import './BlogDetails.css'

const BlogDetails = () => {
    const {id}=useParams()
    const [blog,setBlog]=useState([]);
    useEffect(()=>{
        fetch(`https://venia-cosmetic-sever-side-production.up.railway.app/blog/${id}`)
        .then(res=>res.json())
        .then(data=>setBlog(data))
    },[id])
    return (
      <div>
          <div className='blog-details'>
            <h1>{blog.name}</h1>
            <img src={blog.img} alt=""/>
            <p>{blog.description}</p>
        </div>
        <Comments></Comments>
      </div>
    );
};

export default BlogDetails;