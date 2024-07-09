import React, { useEffect, useState } from "react";
import { images } from "../../constants";
import "./About.css";
import { SiKotlin } from "react-icons/si";
import { FaJava } from "react-icons/fa";
import { IoLogoJavascript } from "react-icons/io5";
import { FaHtml5 } from "react-icons/fa";
import { FaCss3Alt } from "react-icons/fa";
import { FaReact } from "react-icons/fa";
import { FaNodeJs } from "react-icons/fa";
import { SiMongodb } from "react-icons/si";
import { SiAndroidstudio } from "react-icons/si";
import { TbBrandVscode } from "react-icons/tb";
import { IoLogoFirebase } from "react-icons/io5";
import { FaGitAlt } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import axios from "axios";

const About = () => {
  const [image, setImage] = useState(null);
  const [bio, setBio] = useState("");

  useEffect(() => {
    const setAboutDescription = async () => {
      try {
        const response = await axios.get("/api/v1/about/get_about_detail", {
          withCredentials: true,
        });
        console.log();
        setImage(response.data.data.profileImage);
        setBio(response.data.data.about_description);
      } catch (error) {
        console.log(error);
      }
    };

    setAboutDescription();
  }, []);

  return (
    <section className="container">
      <div className="app__about-section">
        <div className="app__about-profile-picture">
          <img src={image} alt="Kishan Verma" className="profile-picture" />
        </div>

        <div className="app__about-content">
          <h1>About Me.</h1>
          <p>{bio}</p>
        </div>
      </div>

    </section>
  );
};

export default About;
