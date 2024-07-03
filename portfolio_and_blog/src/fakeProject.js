
import { images } from "./constants";
export const fakeProjects = [
    {
      id: 1,
      title: 'E-commerce Website',
      description: 'Developed a fully functional e-commerce website with user authentication, product catalog, and secure checkout.',
      technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Firebase'],
      image: images.projectImage,
      githubRepo: 'https://github.com/yourusername/project1',
    },
    {
      id: 2,
      title: 'Task Management App',
      description: 'Built a task management app with features for creating, editing, and deleting tasks. Implemented user authentication.',
      technologies: ['React', 'Redux', 'Firebase'],
      image: images.projectImage,
      githubRepo: 'https://github.com/yourusername/project2',
    },
    {
      id: 3,
      title: 'Weather App',
      description: 'Developed a weather app that provides real-time weather information based on user location or search query.',
      technologies: ['React', 'Node.js', 'Express', 'OpenWeatherMap API'],
      image: images.projectImage,
      githubRepo: 'https://github.com/yourusername/project3',
    },
  ];