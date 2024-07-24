import React, { useEffect, useState } from "react";
import "./Project.css";
import ProjectDetailsAside from "../../component/ProjectDetailsAside";
import axios from "axios";

const Project = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/projects/all_projects`,{withCredentials:true});
        console.log(response.data.data);
        if (response.data && Array.isArray(response.data.data)) {
          setProjects(response.data.data);
          setFilteredProjects(response.data.data);
        } else {
          console.error("Unexpected response structure:", response);
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);

  const handleProjectClick = (project) => {
    setSelectedProject(project);
    setIsOverlayVisible(true);
  };

  const handleCloseOverlay = () => {
    setSelectedProject(null);
    setIsOverlayVisible(false);
  };

  const handleTagFilter = (tag) => {
    if (tag === 'All') {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter((project) => project.tag === tag));
    }
  };

  return (
    <section className="app__project container">
      <h2 className="app__project_title">Projects</h2>

      <div className="app__project-filters">
        {["Apps", "Web", "All"].map((item, index) => (
          <div key={index} className="app__project-filters-item" onClick={() => handleTagFilter(item)}>
            {item}
          </div>
        ))}
      </div>

      <div className="app__project-portfolio">
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project, index) => (
            <article
              key={index}
              onClick={() => handleProjectClick(project)}
              className="app__project-card"
            >
              <picture className="app__project-image">
                <img
                  src={project.project_image[0]}
                  loading="lazy"
                  alt="Project-image"
                />
              </picture>

              <div className="app__project-content">
                <h2 className="project-title">{project.title}</h2>
                <p className="project-description">{project.description}</p>

                <div className="app__project-technology">
                  {project.techStack &&
                    project.techStack.map((item, index) => (
                      <div key={index} className="app__project-tech-item">
                        {item}
                      </div>
                    ))}
                </div>
              </div>
            </article>
          ))
        ) : (
          <p>No projects available</p>
        )}

        {/* Render the aside section if a project is selected */}
        {isOverlayVisible && (
          <div className="overlay" onClick={handleCloseOverlay}>
            <ProjectDetailsAside
              selectedProject={selectedProject}
              onClose={() => setSelectedProject(null)}
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default Project;
