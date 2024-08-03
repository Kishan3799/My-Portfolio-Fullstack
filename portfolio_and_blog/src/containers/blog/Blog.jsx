import React, { Suspense, useEffect, useState, useCallback } from "react";
import BlogItem from "./blog_components/BlogItem";
import "./Blog.css";
import axios from "axios";
import { FETCH_STATUS } from "../../utils/fetchStatus";

// Lazy load the Loader component
const Loader = React.lazy(() => import('../../component/Loader'));

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [status, setStatus] = useState(FETCH_STATUS.IDLE);

  const fetchBlogs = useCallback(async () => {
    try {
      setStatus(FETCH_STATUS.LOADING);
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/v1/blogs/all_blogs`,
        { withCredentials: true }
      );
      const blogData = response?.data?.data;
      if (Array.isArray(blogData)) {
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
  }, []);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  const isLoading = status === FETCH_STATUS.LOADING;
  const isSuccess = status === FETCH_STATUS.SUCCESS;
  const isError = status === FETCH_STATUS.ERROR;

  return (
    <Suspense fallback={<div>Loading...</div>}>
      {isLoading ? (
        <Loader />
      ) : (
        <section className="app__blog container">
          <h1 className="app__blog_titile">My Coding Blogs</h1>
          {isSuccess && blogs.length > 0 && (
            blogs.map((blogItem) => (
              <BlogItem
                key={blogItem.blog_id}
                id={blogItem.blog_id}
                props={blogItem}
              />
            ))
          )}
          {isSuccess && blogs.length === 0 && (
            <p className="blog_not_fonund">No Blogs Available</p>
          )}
          {isError && (
            <p className="blog_not_fonund">Error loading blogs, please try again later.</p>
          )}
        </section>
      )}
    </Suspense>
  );
};

export default React.memo(Blog);
