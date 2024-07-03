import React, { useEffect, useState } from 'react'
import BlogItem from './blog_components/BlogItem'
import fakeBlogs from '../../fakeBlog'
import "./Blog.css"
import axios from 'axios'

const Blog = () => {

  const [blogs, setBlogs] = useState([])

  useEffect(()=> {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get("/api/v1/blogs/all_blogs");
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
        {blogs.map((blogItem)=>(
          <BlogItem key={blogItem.blog_id} id={blogItem.blog_id} props={blogItem}/>
        ))}
    </section>
  )
} 

export default Blog
