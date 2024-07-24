import React, { useState,useEffect } from "react";
import "./AdminAbout.css";
import axios from "axios";
import { toast } from "react-toastify";

const AdminAbout = () => {
  const [image, setImage] = useState(null);
  const [bio, setBio] = useState("");

  const [currentId, setCurrentId] = useState("")
  const [previewImg, setPreviewImg] = useState(null)
  const [previewBio, setPreviewBio] = useState("")

  
 
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if(file){
      setImage(file)
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Handle the form submission logic here
    const formData = new FormData();
    formData.append('profileImage', image);
    formData.append('aboutDescription', bio);

    const createAboutPromis = axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/about/add_about`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      withCredentials: true
    });

    toast.promise(
      createAboutPromis,
      {
        pending:"Uploading in...",
        success:"Upload successfully",
        error: {
          render({data}){
            return data.response?.data.message || "Something went wrong";
          }
        }
      }
    );

    try {
      const response = await createAboutPromis
      console.log(response)
    } catch (error) {
      console.log(error || "Something went wrong")
    }
  };

  useEffect(() => {
    const setAboutDescription = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/about/get_about_detail`, {
          withCredentials: true,
        });
        setCurrentId(response.data.data._id)
        setPreviewImg(response.data.data.profileImage);
        setPreviewBio((response.data.data.about_description))
      } catch (error) {
        console.log(error);
      }
    };

    setAboutDescription();
  }, []);


  const handleDeleteAboutDetail = async (id) => {
    const deleteAboutPromise = axios.delete(`${import.meta.env.VITE_BASE_URL}/api/v1/about/delete-about-detail/${id}`, {withCredentials:true})

    toast.promise(
      deleteAboutPromise,
      {
        pending:"Deleting in...",
        success:"Delete successfully",
        error:{
          render({data}){
            return data.response?.data?.message || "About detail deletion is failed"
          }
        }
      }
    );


    try {
      await deleteAboutPromise
    } catch (error) {
      console.log("About detail deletion is failed",error)
    }
  }

  return (
    <section className="app_admin_about ">
     <h1 className="heading">Upload Profile</h1>
         <div className="about_form_container">
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
     

      <div className="about_detail_card">
          <img src={previewImg} alt="Profile" />
          <p>{previewBio}</p>
          <div>
            <button className="delete_button" onClick={()=> handleDeleteAboutDetail(currentId)}>Delete</button>
          </div>
      </div>
    </section>
  );
};


export default AdminAbout;
