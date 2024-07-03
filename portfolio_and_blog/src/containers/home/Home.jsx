import React from 'react'
import "./Home.css"
import { FaFileDownload } from "react-icons/fa";

const Home = () => {
  return (
    <section className="app__hero-section container">
      <div className="hero-content">
        <h2>Hi, I'm</h2>
        <h1>Kishan Verma</h1>
        <h2>Android Developer | Web Developer </h2>
        <p>Passionate about creating innovative solutions, designing beautiful UIs, and developing user-friendly applications.</p>
        {/* <button className="cta-button"><FaFileDownload/> Resume</button> */}
      </div>
    </section>
  )
}

export default Home
