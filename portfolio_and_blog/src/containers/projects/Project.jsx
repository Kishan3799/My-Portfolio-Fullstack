import React, { useEffect, useState, Suspense, useCallback } from "react";
import "./Project.css";
import axios from "axios";
import { FETCH_STATUS } from "../../utils/fetchStatus";

// Lazy load components
const ProjectDetailsAside = React.lazy(() => import("../../component/ProjectDetailsAside"));
const Loader = React.lazy(() => import("../../component/Loader"));

const Project = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const [status, setStatus] = useState(FETCH_STATUS.IDLE);

  const fetchProjects = useCallback(async () => {
    try {
      setStatus(FETCH_STATUS.LOADING);
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/projects/all_projects`, {
        withCredentials: true,
      });
      const projectData = response.data.data;

      if (Array.isArray(projectData)) {
        setProjects(projectData);
        setFilteredProjects(projectData);
        setStatus(FETCH_STATUS.SUCCESS);
      } else {
        console.error("Unexpected response structure:", response);
        setStatus(FETCH_STATUS.ERROR);
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
      setStatus(FETCH_STATUS.ERROR);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const isLoading = status === FETCH_STATUS.LOADING;
  const isSuccess = status === FETCH_STATUS.SUCCESS;

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
    <Suspense fallback={<div>Loading...</div>}>
      {isLoading ? (
        <Loader />
      ) : (
        <section className="app__project container">
          <h2 className="app__project_title">Projects</h2>

          <div className="app__project-filters">
            {["Apps", "Web", "All"].map((item, index) => (
              <div
                key={index}
                className="app__project-filters-item"
                onClick={() => handleTagFilter(item)}
              >
                {item}
              </div>
            ))}
          </div>

          <div className="app__project-portfolio">
            {isSuccess && (filteredProjects.length > 0 ? (
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
                    <p className="project-description">{project.description.slice(0,80)}...</p>

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
            ))}

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
      )}
    </Suspense>
  );
};

export default React.memo(Project);
