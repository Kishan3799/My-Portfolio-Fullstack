import React from 'react'
import './SideBar.css'
import { NavLink, useNavigate } from 'react-router-dom'
import axios from 'axios'



const Sidebar = ({setAuth}) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/admin_user/logout`, {}, { withCredentials: true });
      setAuth(false)
      alert("Logout successfully");
      navigate("/")

    } catch (error) {
      alert("Failed to logout. Please try again.");
    }
  };

  return (
    <div className="sidebar">
      <h2 className="sidebar-title">KishAndroid</h2>
      <ul className="sidebar-list">
        <li className="sidebar-item">
          <NavLink to="/adminDashboard">Dashboard</NavLink>
        </li>
        <li className="sidebar-item">
          <NavLink to="/adminBlog">Create Blog</NavLink>
        </li>
        <li className="sidebar-item">
          <NavLink to="/adminAbout">Create About</NavLink>
        </li>
        <li className="sidebar-item">
          <NavLink to="/adminProject">Add Project</NavLink>
        </li>
        <li className="sidebar-item">
          <button onClick={handleLogout} className="sidebar-logout-btn">Logout</button>
        </li>
      </ul>
    </div>
  )
}

export default Sidebar
