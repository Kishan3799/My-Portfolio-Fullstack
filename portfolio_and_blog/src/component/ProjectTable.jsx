import React, { useEffect, useState } from 'react';
import './ProjectTable.css';
import axios from 'axios';

const ProjectTable = () => {
    const [projects, setProjects] = useState([]);

    useEffect(()=>{
        const fetchProjects = async ()=> {
            try {
                const response = await axios.get('/api/v1/projects/all_projects');
                console.log(response.data.data)
                setProjects(response.data.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchProjects();
    },[])

    const handleDeletion = async (projectId) => {
        try {
            await axios.delete(`/api/v1/projects/delete_project/${projectId}`);
            setProjects(projects.filter((project)=> project._id !== projectId))
            alert('Project delete successfully');
        } catch (error) {
            console.log(error)
            alert("Failed to delete project");
        }
    }

  return (
    <div className="project-table-container">
      <table className="project-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
            {projects.map((project, index)=>(
            <tr key={index}>
            <td>
              <img src={project.project_image[0]} loading="lazy" alt="Project 1" className="project-image" />
            </td>
            <td>{project.title}</td>
            <td>
              <div className="action-buttons">
                <button className="delete-button" onClick={()=> handleDeletion(project._id)}>Delete</button>
              </div>
            </td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectTable;
