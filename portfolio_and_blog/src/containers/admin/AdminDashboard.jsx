import React from 'react'
import './AdminDashboard.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const AdminDashboard = () => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await axios.post("/api/v1/admin_user/logout", {}, { withCredentials: true });

      alert("Logout successfully");
      navigate("/")
      // Add any additional logic for logout, e.g., redirect to login page
    } catch (error) {
      alert("Failed to logout. Please try again.");
    }
  };
  
  

  return (
    <aside className='dashboard'>
      <h1>Welcome to Admin Dashboard</h1>
      {/* <button onClick={handleLogout} type="button">
        Logout
      </button> */}
    </aside>
  );
}

export default AdminDashboard
