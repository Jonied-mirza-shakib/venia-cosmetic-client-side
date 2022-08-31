import React, { useEffect, useState } from 'react';
import './Blog.css'
import SingleBlog from './SingleBlog';

const Blog = () => {
    const [blog,setBlog]=useState([]);
    useEffect(()=>{
        fetch('https://venia-cosmetic-sever-side-jonied-mirza-shakib.vercel.app/blog')
        .then(res=>res.json())
        .then(data=>setBlog(data))
    },[])
    return (
        <div className='blog-bc'>
            <div className='blog-width'>
                <h1>from our blog.</h1>
                <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                    {
                        blog.slice(0,4).map(blogs=> <SingleBlog
                        key={blogs._id}
                        blogs={blogs}
                        ></SingleBlog>)
                    }
                </div>
            </div>
        </div>
    );
};

export default Blog;