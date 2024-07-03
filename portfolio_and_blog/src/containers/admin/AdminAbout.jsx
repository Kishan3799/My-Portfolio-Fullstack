import React, { useState } from "react";
import "./AdminAbout.css";
import axios from "axios";

const AdminAbout = () => {
  const [image, setImage] = useState(null);
  const [bio, setBio] = useState("");

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if(file){
      setImage(file)
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle the form submission logic here
    const formData = new FormData();
    formData.append('profileImage', image);
    formData.append('aboutDescription', bio);
    try {
      const response = axios.post("/api/v1/about/add_about", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
      });
      console.log("Bio is added Successfully:", response.data)
      
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <section className="app_admin_about container">
      <div className="about_form_container">
        <h1 className="heading">Upload Profile</h1>
        <form onSubmit={handleSubmit}>
          <div className="about_form-group">
            <label htmlFor="image" className="label">
              Choose Image
            </label>
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={handleImageUpload}
              className="file-input"
            />
            <label htmlFor="image" className="upload-btn">
              Select Image
            </label>
          </div>
          {image && (
            <div className="preview-container">
              <img src={URL.createObjectURL(image)} alt="Preview" className="preview-image" />
            </div>
          )}
          <div className="form-group">
            <label htmlFor="bio" className="label">
              Enter Bio
            </label>
            <textarea
              id="bio"
              cols="40"
              rows="10"
              autoComplete="off"
              role="textbox"
              aria-autocomplete="list"
              aria-haspopup="true"
              className="about_bio_textarea"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <button type="submit" className="submit-btn">
              Upload
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};


export default AdminAbout;
