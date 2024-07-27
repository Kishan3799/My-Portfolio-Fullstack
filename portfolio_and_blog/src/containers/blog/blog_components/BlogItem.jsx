import React from "react";
import { useNavigate } from "react-router-dom";
import { dateFormatter } from "../../../utils/DateFormater";

const BlogItem = ({props}) => {
  // console.log(props)

  const navigate = useNavigate();

  const handleShowBlog = (blog) => {
    navigate("/blogpost", {state: {blogData:blog}})
  }

  return (
    <article className="app__blog-post-card">
      <picture className="app__blog-post-image">
        <img src={props.blog_cover_image} alt={props.blog_title}  />
      </picture>

      <div className="app__blog-post_content">
        <h2 className="app__blog-post-title">{props.blog_title}</h2>
        <h3 className="app__blog-post-author">
          {props.blog_auther.name} and {dateFormatter(props.createdAt)}
        </h3>
        <p className="app__blog-post-summary">
          {props.blog_short_summary}
        </p>
        <div style={{margin:"1rem 0rem"}}>
            <button onClick={()=>handleShowBlog(props)} className="app__button-read-more">Read More</button>
        </div>
      </div>
    </article>
  );
};

export default BlogItem;
