import React from 'react'
import './SideBar.css'
import { NavLink, useNavigate } from 'react-router-dom'
import axios from 'axios'
import {toast} from 'react-toastify'



const Sidebar = ({setAuth}) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const loggoutPromise = axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/admin_user/logout`, {}, { withCredentials: true });

    toast.promise(
      loggoutPromise,
      {
        pending:"Logging out...",
        success:"User loggout successfully",
        error: {
          render({data}){
            return data.response?.data?.message || "Loggout failed"
          }
        }
      }
    )

    try {
      await loggoutPromise
      setAuth(false)
      navigate("/")
    } catch (error) {
      console.log("Failed to logout. Please try again.", error);
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
