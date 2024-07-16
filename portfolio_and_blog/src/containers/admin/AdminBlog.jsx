import React, { useRef, useState } from "react";
import "./AdminBlog.css";
import JoditEditor from "jodit-react";
import axios from "axios";

const AdminBlog = () => {
  const [blogImage, setBlogImage] = useState(null);
  const [blogTitle, setBlogTitle] = useState("");
  const [blogShortSummary, setBlogShortSummary] = useState("");
  const [blogContent, setBlogContent] = useState("");

  const editor = useRef(null);

  // Function to handle image upload
  const handleBlogImageUpload = (e) => {
    const image = e.target.files[0];
    if (image) {
      setBlogImage(image);
    }
  };

  const handleSubmitForm = async (e) => {

    e.preventDefault();
    const formData = new FormData();
    formData.append('blogTitle',blogTitle)
    formData.append('blogShortSummary', blogShortSummary)
    formData.append('blogContent', blogContent)
    formData.append('blog_cover_image', blogImage)

    try {
      const respnse = await axios.post('/api/v1/blogs/create_blog', formData, {
        headers : { 
          'Content-Type': 'multipart/form-data'
        }
      })
      alert("Blog is created successfully")
      console.log("Blog is created successfully", respnse);
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div className="app_admin_blog ">
      <h1 className="blogHeading">Upload Blog</h1>
      <div className="blog_form_container">
        <form className="form_group" onSubmit={handleSubmitForm}>
          <label htmlFor="blogTitle" className="blogLabel">
            Blog Title
          </label>
          <input
            type="text"
            name="blogTitle"
            id="blogTitle"
            className="text_input"
            value={blogTitle}
            onChange={(e)=> setBlogTitle(e.target.value)}
          />

          <label htmlFor="blogShortSummary" className="blogLabel">
            Blog Short Summary
          </label>
          <input
            type="text"
            name="blogShortSummary"
            id="blogShortSummary"
            className="text_input"
            value={blogShortSummary}
            onChange={(e)=> setBlogShortSummary(e.target.value)}
          />

          <label htmlFor="blogCoverImage" className="blogLabel">
            Blog Cover Image
          </label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleBlogImageUpload}
            className="file_input"
          />
          <label htmlFor="image" className="upload_blog_btn">
            Select Image
          </label>
          {blogImage && (
            <div className="preview_container">
              <img
                src={URL.createObjectURL(blogImage)}
                alt="Preview"
                className="preview_image"
              />
            </div>
          )}

          <label htmlFor="blogContent" className="blogLabel">
            Blog Content
          </label>
          <JoditEditor
            ref={editor}
            value={blogContent}
            onChange={(newContent) => setBlogContent(newContent)}
            className="text_editor"
          />

          <button type="submit" className="submit_blog_btn">
            Upload
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminBlog;
