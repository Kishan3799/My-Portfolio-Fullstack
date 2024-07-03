import React from "react";
import "./ProjectDetailsAside.css";
import { IoCloseSharp } from "react-icons/io5";

const ProjectDetailsAside = ({ selectedProject, onClose }) => {
  return (
    <aside className="project-details-aside">
      <button onClick={onClose}>
        <IoCloseSharp />
      </button>
      <img
        src={selectedProject.project_image[0]}
        loading="lazy"
        alt={selectedProject.title}
      />
      <h2>{selectedProject.title}</h2>
      <p>{selectedProject.description}</p>
      <div className="project-links">
        <a
          href={selectedProject.live_link}
          target="_blank"
          rel="noopener noreferrer"
        >
          Live Demo
        </a>
        <a
          href={selectedProject.github_link}
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub Repository
        </a>
      </div>
    </aside>
  );
};

export default ProjectDetailsAside;
