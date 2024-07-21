import React, { useState } from "react";
import "./AdminProject.css";
import axios from "axios";

const AdminProject = () => {
  const [techStack, setTechStack] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [liveLink, setLiveLInk] = useState("");
  const [gitLink, setGitLInk] = useState("");
  const [tag, setTag] = useState("")
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);


  const handleProjectImageUpload = (e) => {
    const imageFile = e.target.files[0];
    if (imageFile) {
      setImage(imageFile);
    }
  };

  const handleProjectVideoUpload = (e) => {
    const videoFile = e.target.files[0];
    if (videoFile) {
      setVideo(videoFile);
    }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleInputKeyDown = (e) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      setTechStack([...techStack, inputValue.trim()]);
      setInputValue("");
    }
  };

  const handleTagRemove = (tagToRemove) => {
    setTechStack(techStack.filter((tag) => tag !== tagToRemove));
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    
    formData.append('title', title);
    formData.append('description',desc);
    formData.append('tag', tag);
    formData.append('live_link', liveLink);
    formData.append('github_link', gitLink);
    formData.append('project_image', image);
    formData.append('project_video', video);

    techStack.forEach((tech, index) => {
      formData.append(`techStack[${index}]`, tech);
    });

    try {

        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/projects/create_project`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
        })
        alert("Project is added successfully")
        console.log("Project is Added Successfully", response.data);
        setDesc("")
        setGitLInk("")
        setTag("")
        setTitle("")
        setLiveLInk("")
        setTechStack([])
        setImage(null)
        setVideo(null)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="app_admin_project">
       <h1 className="upload_title">Upload Project</h1>
      <div className="form_container">
        <form className="form_group" onSubmit={handleOnSubmit}>
          <label htmlFor="projectTitle">Project Title</label>
          <input
            type="text"
            name="projectTitle"
            id="projectTitle"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            autoComplete="off"
          />
          <label htmlFor="projectDescription">Project Description</label>
          <input
            type="text"
            name="projectDescription"
            id="projectDescription"
            required
            autoComplete="off"
            value={desc}
            onChange={(e)=> setDesc(e.target.value)}
          />
          <label htmlFor="techStack">Tech Stack</label>
          <div className="tags-input-container">
            {techStack.map((tag, index) => (
              <div key={index} className="tag">
                {tag}
                <button type="button" onClick={() => handleTagRemove(tag)}>
                  &times;
                </button>
              </div>
            ))}
            <input
              type="text"
              placeholder="Enter techStack..."
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleInputKeyDown}
            />
          </div>
          <label htmlFor="tag">Tag</label>
          <select value={tag} onChange={(e)=>setTag(e.target.value)}>
            <option className="0">Select</option>
            <option className="options" value="Apps" >App</option>
            <option className="options" value="Webs" >Web</option>
          </select>
          <label htmlFor="liveLink">Live Link</label>
          <input 
          type="text" 
          name="liveLink" 
          id="liveLink" 
          autoComplete="off" 
          value={liveLink}
          onChange={(e)=> setLiveLInk(e.target.value)}/>
          <label htmlFor="gitHubLink">GitHub</label>
          <input
            type="text"
            name="gitHubLink"
            id="gitHubLink"
            autoComplete="off"
            value={gitLink}
            onChange={(e) => setGitLInk(e.target.value)}
          />
          <label htmlFor="image">Project Image</label>
          <input 
          type="file" 
          name="image" 
          accept="image/*" 
          id="image" 
          onChange={handleProjectImageUpload}/>

          <label htmlFor="video">Project Video</label>
          <input 
          type="file" 
          name="video" 
          accept="video/*" 
          id="video"
          onChange={handleProjectVideoUpload} />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default AdminProject;
