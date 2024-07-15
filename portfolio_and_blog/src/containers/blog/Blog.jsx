import React, { useEffect, useState } from 'react'
import BlogItem from './blog_components/BlogItem'
import "./Blog.css"
import axios from 'axios'

const Blog = () => {

  const [blogs, setBlogs] = useState([])

  useEffect(()=> {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/blogs/all_blogs`);
        console.log(response.data.data)
        if (response.data && Array.isArray(response.data.data)) {
          setBlogs(response.data.data);
        } else {
          console.error('Unexpected response structure:', response);
        }
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    }
    
    fetchBlogs();
    
  },[]);

  return (
    <section className="app__blog container">
        <h1 className="app__blog_titile">My Coding Blogs</h1>
        {blogs.length > 0 ? ( blogs.map((blogItem)=>(
          <BlogItem key={blogItem.blog_id} id={blogItem.blog_id} props={blogItem}/>
        ))) : <p className='blog_not_fonund'>No Blogs Available</p> }
    </section>
  )
} 

export default Blog
