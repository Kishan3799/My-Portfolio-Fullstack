import React, { useState } from 'react'
import './AdminDashboard.css'
import ContactTable from '../../component/ContactTable';
import ProjectTable from '../../component/ProjectTable';
import BlogTable from '../../component/BlogTable';


const AdminDashboard = () => {
 


  return (
    <div className='dashboard'>
      <h1 className='heading'>Dashboard</h1>

      <div className="contact_table_card">
        <h3>Contact</h3>
        <ContactTable />
      </div>
      <div className="project-table-card">
        <h3>Project</h3>
        <ProjectTable/>
      </div>
      <div className="blog-table-card">
        <h3>Blog</h3>
        <BlogTable/>
      </div>
     
    </div>
  );
}

export default AdminDashboard
