import React, { useEffect, useState } from "react";
import "./BlogTable.css";
import axios from "axios";

const BlogTable = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get('/api/v1/blogs/all_blogs');
        console.log(response.data.data[0].blog_cover_image.split('/').pop().split('.')[0]);
        setBlogs(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBlog();
  }, []);

  const handleDeleteBlog = async(blogId) => {
    try {
        await axios.delete(`/api/v1/blogs/delete-blog/${blogId}`)
        setBlogs(blogs.filter((blog)=>blog._id !== blogId))
        alert('Blog delete successfully');
    } catch (error) {
        console.log(error)
        alert('Failed to delete blog');
    }
  }

  return (
    <div className="blog-table-container">
      <table className="blog-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {blogs.length > 0 ? (blogs.map((blog, index) => (
            <tr key={index}>
              <td>
                <img className="blog-image" src={blog.blog_cover_image} loading="lazy" alt={blog.blog_cover_image} />
              </td>
              <td>{blog.blog_title}</td>
              <td>
                <div className="action-buttons">
                  <button className="delete-button" onClick={()=> handleDeleteBlog(blog._id)}>Delete</button>
                </div>
              </td>
            </tr>
          ))) : <p>No Blogs available</p>}
        </tbody>
      </table>
    </div>
  );
};

export default BlogTable;
