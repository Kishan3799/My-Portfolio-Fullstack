import React, { useEffect, useState } from "react";
import BlogItem from "./blog_components/BlogItem";
import "./Blog.css";
import axios from "axios";
import { FETCH_STATUS } from "../../utils/fetchStatus";
import Loader from "../../component/Loader";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);

  const [status, setStatus] = useState(FETCH_STATUS.IDLE);

  const fetchBlogs = async () => {
    try {
      setStatus(FETCH_STATUS.LOADING);
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/v1/blogs/all_blogs`,
        { withCredentials: true }
      );
      // console.log(response.data.data)

      const blogData = response.data.data;
      if (response.data && Array.isArray(blogData)) {
        setBlogs(blogData);
        setStatus(FETCH_STATUS.SUCCESS);
      } else {
        console.error("Unexpected response structure:", response);
        setStatus(FETCH_STATUS.ERROR);
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
      setStatus(FETCH_STATUS.ERROR);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const isLoading = status === FETCH_STATUS.LOADING;
  const isSuccess = status === FETCH_STATUS.SUCCESS;
  const isError = status === FETCH_STATUS.ERROR;

  if(isLoading) return <Loader/>

  return (
    <section className="app__blog container">
      <h1 className="app__blog_titile">My Coding Blogs</h1>
      {isSuccess &&
        (blogs.length > 0 ? (
          blogs.map((blogItem) => (
            <BlogItem
              key={blogItem.blog_id}
              id={blogItem.blog_id}
              props={blogItem}
            />
          ))
        ) : (
          <p className="blog_not_fonund">No Blogs Available</p>
        ))}
    </section>
  );
};

export default Blog;
